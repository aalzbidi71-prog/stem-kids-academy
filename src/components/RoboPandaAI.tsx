import { useState, useRef, useEffect, useId } from "react";
import { Language } from "../types";
import { Send, Sparkles, AlertTriangle, RefreshCw, HelpCircle, GraduationCap, Trophy, HelpCircle as HelpIcon, ChevronDown, ChevronUp } from "lucide-react";

interface RoboPandaAIProps {
  lang: Language;
}

interface Message {
  role: "user" | "model";
  text: string;
}

export default function RoboPandaAI({ lang }: RoboPandaAIProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: lang === "ar" 
        ? "بـيـب بـوب! 🐼🤖 أهلاً بك يا بطل المبرمجين أو ولي طاقة المعرفة مبروك وجودك! أنا روبو باندا الذكي مساعدك الذكائي في الموقع.\n\nكيف أستطيع مساعدتك اليوم؟ يمكنك اختياري كموجّه مسار، أو تجريبي في الألغاز المتفاعلة، أو شرح العلوم والكمبيوتر بتبسيط خارق!"
        : "Beep Boop! 🐼🤖 Welcome coding champion or technology seeker! I am RoboPanda, your smart interactive AI concierge.\n\nHow can I spark your curiosity today? Choose a mode below and let's program!"
    }
  ]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"pathfinder" | "challenger" | "explainer">("pathfinder");
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const modeId = useId();

  // Scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Adjust preset welcome instructions on mode change
  const handleModeChange = (newMode: "pathfinder" | "challenger" | "explainer") => {
    setMode(newMode);
    let introText = "";
    if (newMode === "pathfinder") {
      introText = lang === "ar"
        ? "بـيـب بـوب! 🗺️ بصفتي (محدّد المسارات الدراسي الأكاديمي)، أستطيع ترشيح أفضل كورس وباقة لطفلك! من فضلك كم عمر طفلك وهل جرب البرمجة البصرية من قبل؟"
        : "Beep Boop! 🗺️ As your Academy Pathfinder, I will suggest the ultimate coding schedule. Tell me, how old is your child and what interests them?";
    } else if (newMode === "challenger") {
      introText = lang === "ar"
        ? "بـيـب بـوب! 🏆 أهلاً بك بصفحة (ألغاز روبو للذكاء)! أنا جاهز لصياغة لغز منطقي ممتع وسهل جدا مخصص لشحذ ذكائك. هل تحب ألعاب المنصات أو حل شفرات الصناديق السحرية؟"
        : "Beep Boop! 🏆 Welcome to the Robo Quiz Arena! I am ready to craft a whimsical logic riddle tailored just for you. Select 'Make an puzzle' or start!";
    } else {
      introText = lang === "ar"
        ? "بـيـب بـوب! 🎓 أهلاً مبرمجي الشغوف بصفحة (شارح العلوم والتكنولوجيا)! أي مفهوم تكنولوجي تجده صعب في البرمجة أو الكمبيوتر؟ اسألني عنه لأشرحه بقصة طريفة!"
        : "Beep Boop! 🎓 Welcome to the Robo Concept Explainer! What complex technical coding term has got you puzzled? Let me break it down easily!";
    }
    setMessages([
      {
        role: "model",
        text: introText
      }
    ]);
  };

  const handleSend = async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || loading) return;

    setInput("");
    setErrorStatus(null);
    setLoading(true);

    const userMsg: Message = { role: "user", text: messageText };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const history = messages.slice(-5); // Send last 5 turns to stay under bounds & fast
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: messageText,
          history: history,
          mode: mode
        })
      });

      if (!response.ok) {
        throw new Error(lang === "ar" ? "عذراً تعثر اتصال روبو باندا بالشبكة" : "Failed to connect to RoboPanda AI backend server");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages((prev) => [...prev, { role: "model", text: data.text || "" }]);
    } catch (err: any) {
      console.error(err);
      setErrorStatus(err.message || "Error");
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: lang === "ar"
            ? "بـيـب بـوب! تعطل الإرسال البرمجي في معالجي الذكي. يرجى التأكد من تشغيل السيرفر أو تواجد مفتاح Gemini في الإعدادات."
            : "Beep Boop! Code transmit error inside my cybernetic core. Make sure server is online and your Gemini API Key is configured in Settings."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const PROMPT_CHIPS = {
    pathfinder: lang === "ar" 
      ? ["بنت وعمرها 10 سنوات كيف تبدأ؟", "كم تكلفة كورس 6 سنوات؟", "لدي طفل يحب الألعاب أي مسار أنسب؟"]
      : ["Daughter Aged 10, where to start?", "Pricing for a 6-year-old class?", "Boy loves gaming, which path?"],
    challenger: lang === "ar"
      ? ["اصنع لي لغز منطقي لعمر 8 سنوات", "أعطني حزورة برمجية سهلة", "أنا مستعد لتحدي بايثون"]
      : ["Riddle for age 8", "Give me a simple coding puzzle", "I am ready for Python Challenge"],
    explainer: lang === "ar"
      ? ["كيف تشرح 'المتغيرات Variables' ببالون؟", "ما هو مفهوم الحلقات Loops؟", "ايش هو الذكاء الاصطناعي ببساطة؟"]
      : ["Explain Variables using balloons", "What is a coding Loop simply?", "How does AI learn simple patterns?"]
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950 rounded-3xl p-6 shadow-2xl border border-amber-900/30 text-white flex flex-col h-[550px] overflow-hidden">
      
      {/* AI Assistant Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-amber-500 rounded-2xl flex items-center justify-center text-xl shadow-lg relative z-10 animate-pulse">
              🐼
            </div>
            <div className="absolute inset-0 bg-amber-500 blur-lg rounded-2xl opacity-45"></div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full z-20"></span>
          </div>
          <div>
            <h4 className="font-bold text-base flex items-center gap-1.5 text-amber-400">
              <span>{lang === "ar" ? "معسكر روبو باندا التفاعلي الذكي" : "RoboPanda AI Interactive Lab"}</span>
              <Sparkles size={13} className="text-amber-300 fill-amber-300 animate-bounce" />
            </h4>
            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider font-mono">
              {lang === "ar" ? "مدعوم بـ Gemini-3.5-flash الأصلي" : "Powered by authentic Gemini-3.5-flash"}
            </p>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700 max-w-full overflow-x-auto text-[11px] font-bold">
          <button
            onClick={() => handleModeChange("pathfinder")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all shrink-0 ${
              mode === "pathfinder" ? "bg-amber-500 text-slate-950 shadow-md" : "text-gray-300 hover:text-white"
            }`}
          >
            <GraduationCap size={13} />
            {lang === "ar" ? "مستشار للتسجيل" : "Pathfinder"}
          </button>
          <button
            onClick={() => handleModeChange("challenger")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all shrink-0 ${
              mode === "challenger" ? "bg-amber-500 text-slate-950 shadow-md" : "text-gray-300 hover:text-white"
            }`}
          >
            <Trophy size={13} />
            {lang === "ar" ? "ألغاز الذكاء" : "Robo Challenge"}
          </button>
          <button
            onClick={() => handleModeChange("explainer")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all shrink-0 ${
              mode === "explainer" ? "bg-amber-500 text-slate-950 shadow-md" : "text-gray-300 hover:text-white"
            }`}
          >
            <HelpIcon size={13} />
            {lang === "ar" ? "مبسط البرمجة" : "Explainer"}
          </button>
        </div>
      </div>

      {/* Mode context details */}
      <div className="bg-slate-800/40 p-2 border-b border-gray-800 text-[10px] text-amber-200 flex items-center gap-1.5">
        <Sparkles size={11} className="text-amber-400 animate-spin" />
        <span>
          {mode === "pathfinder" && (lang === "ar" ? "الوضع الحالي: إرشاد وتسجيل ألعاب وبرمجة للأعمار بالتفصيل." : "Current Focus: Academic consulting, age matching, and plan enrollment guidelines.")}
          {mode === "challenger" && (lang === "ar" ? "الوضع الحالي: ألغاز تفاعلية واختبار تفكير منطقي للطفل." : "Current Focus: Logic structures, quiz challenge, and instant logic matching.")}
          {mode === "explainer" && (lang === "ar" ? "الوضع الحالي: تبسيط مصطلحات التكنولوجيا مثل المتغيرات والدوال وميكافيا." : "Current Focus: Story analogies, computer science breakdowns in absolute simple terms.")}
        </span>
      </div>

      {/* Messages Workspace */}
      <div
        id={modeId}
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-sm scroll-smooth min-h-[150px]"
      >
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed whitespace-pre-wrap text-xs shadow-md ${
                m.role === "user"
                  ? "bg-amber-500 text-slate-950 rounded-br-none font-medium"
                  : "bg-slate-800 text-gray-200 border border-slate-700 rounded-bl-none"
              }`}
            >
              {/* If model, prepend panda icon inside message block */}
              {m.role === "model" && (
                <span className="text-xs font-bold text-amber-400 block mb-1">
                  🐼 {lang === "ar" ? "روبو باندا الآلي" : "RoboPanda"}
                </span>
              )}
              {m.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 text-gray-400 border border-slate-700 rounded-2xl rounded-bl-none px-4 py-3 text-xs flex items-center gap-2">
              <span className="animate-spin text-amber-400">⏳</span>
              <span>{lang === "ar" ? "روبيت الباندا يفكر برمجياً..." : "RoboPanda is compiling a smart answer..."}</span>
            </div>
          </div>
        )}

        {errorStatus && (
          <div className="p-3 bg-red-950/40 border border-red-900 rounded-xl text-xs text-red-200 flex items-center gap-2">
            <AlertTriangle size={15} className="text-red-400 shrink-0" />
            <p className="font-medium">
              {lang === "ar" 
                ? `مشكلة تواصل: ${errorStatus}`
                : `Transmission Offline: ${errorStatus}`}
            </p>
          </div>
        )}
      </div>

      {/* Prompt Chips Suggestions */}
      <div className="px-4 py-2 border-t border-gray-800 flex gap-2 overflow-x-auto select-none shrink-0 no-scrollbar">
        {PROMPT_CHIPS[mode].map((chip, index) => (
          <button
            key={index}
            onClick={() => handleSend(chip)}
            disabled={loading}
            className="shrink-0 bg-slate-800 hover:bg-slate-700/80 active:bg-slate-900 text-gray-300 text-[10px] font-semibold py-1.5 px-3 rounded-full border border-slate-700 hover:border-amber-500/50 transition-all disabled:opacity-50"
          >
            💡 {chip}
          </button>
        ))}
      </div>

      {/* Input controls */}
      <div className="p-4 border-t border-gray-800 flex items-center gap-2 shrink-0 bg-slate-950/50">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          disabled={loading}
          placeholder={
            lang === "ar"
              ? "اسأل الباندا! مثلاً: كم الكود الأنسب لطفلي؟"
              : "Ask RoboPanda... e.g., Let's make a game riddle!"
          }
          className="flex-1 bg-slate-800/80 border border-slate-700 hover:border-slate-600 focus:border-amber-500 text-white rounded-xl py-2 px-3 text-xs focus:outline-none placeholder-gray-500 disabled:opacity-50"
        />

        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || loading}
          className="bg-amber-500 hover:bg-amber-600 active:scale-95 disabled:opacity-50 text-slate-950 p-2.5 rounded-xl transition-all shadow-md shrink-0 focus:outline-none"
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  );
}
