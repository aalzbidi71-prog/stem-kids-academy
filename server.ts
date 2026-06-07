import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize server-side Gemini client
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // Health check API
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date() });
  });

  // RoboPanda AI Assistant endpoint
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { message, history, mode } = req.body;
      if (!message) {
        res.status(400).json({ error: "Message is required" });
        return;
      }

      // Configure system instruction based on interactive learning mode
      let systemInstruction = "أنت موجّه تعليمي ذكي مبهج ومحبوب للأطفال وتدعى 'زرافة ستيم الباسمة ذات ربطة العنق الزرقاء' (STEM Giraffe with blue bowtie). تسكن في منصة ستيم التعليمية للطفل العربي (أكاديمية STEM التفاعلية) لتعليم الرياضيات التطبيقية، الحساب الذهني، اللفظ الإنجليزي الحديث، وصناعة المفاهيم السلوكية والمنطقية والبرمجة للأطفال من سن 5 إلى 15 سنة. تتميز بروح مفعمة بالحب والحيوية ولطيفة ومرحة وصديقة للأطفال (تستخدم أحياناً رموزاً تعبيرية مثل 🦒🦒✨💛🎓). تواصل باللغة المقررة للمستخدم (بالعربية الودية المبسطة بشكل تلقائي، أو بالإنجليزية إذا تواصل بالإنجليزية). اشرح دائماً مستخدماً تشبيهات بصرية مألوفة للطفل مثل الألعاب، الحلويات، قصص الطبيعة الصورية، أو الرسوم، وداعب حماس وشغف الأطفال أو طمئن أولياء أمورهم وثمن فكرهم ونموهم النفسي.";
      
      if (mode === "pathfinder") {
        systemInstruction += "\nتركيزك الحالي: (محدد المسار الأكاديمي). اسأل بلطف عن عمر الطفل واهتمامه الأساسي (مثلاً: حب الأرقام والتمثيل الحسي، كسر حاجز الحديث بالإنجليزية، أو الطلاقة الصوتية والقراءة) ثم اقترح عليه المسار الأمثل بلغة مشوقة:\n- مسار الرياضيات والحساب الذهني: للأعمار من 5 إلى 12 سنة (تأسيس معنوي مذهل للحس العددي والعداد السوروبان وطرق الخيال الرياضي الممتعة)\n- مسار اللغة الإنجليزية للمبتدئين: للأعمار من 6 إلى 12 سنة (بناء مفردات شجاعة والتغلب على مخاوف الحديث بالصوتيات الفعالة وحوارات زووم المباشرة)\n- المسارات المستقبلية (مسار البرمجة وصناعة الألعاب، أو مسار مهارات القرن الـ 21 الفكرية والقيادية).";
      } else if (mode === "challenger") {
        systemInstruction += "\nتركيزك الحالي: (صانع الألغاز والمسابقات والعد الذهني). صمم للأطفال لغزاً رياضياً أو منطقياً أو لغوياً ترفيهياً صغيراً جداً وممتعاً (مثلاً: حساب سريع بتخيل العداد، أو حزورة كلمات مرادفة مبسطة بالإنجليزية). اطلب منهم التفكير واكتب اللغز بوضوح، وعند إجابتهم قم بتحليل إجابتهم ببهجة فائقة وحفزهم.";
      } else if (mode === "explainer") {
        systemInstruction += "\nتركيزك الحالي: (مبسط العلوم التقنية ونظريات الرياضيات واللفظ). إذا سأل الطفل كيف يعمل الحساب الذهني بالأصابع، أو ما هو الفونكس Phonics، أو كيف تتعلم الزرافة القراءة والكود، اشرحها بحكاية بديعة وتشبيهات ملموسة جداً تناسب الأعمار الصغار.";
      }

      // Construct history
      let prompt = "";
      if (history && history.length > 0) {
        prompt += "التاريخ السابق للمحادثة:\n";
        history.forEach((turn: { role: string; text: string }) => {
          const sender = turn.role === "user" ? "المستخدم" : "زرافة ستيم";
          prompt += `${sender}: ${turn.text}\n`;
        });
        prompt += "\n";
      }
      prompt += `المستخدم حالياً: ${message}\nزرافة ستيم:`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.8,
        }
      });

      res.json({ text: response.text });
    } catch (err: any) {
      console.error("Gemini Error server-side:", err);
      res.status(500).json({ error: err?.message || "عذراً بـيـب بـوب! تعثر ذهني الآلي قليلاً للاتصال بالشبكة النجمية." });
    }
  });

  // Vite integration middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
