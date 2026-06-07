import { useState, useRef, useEffect, useId } from "react";
import { Language } from "../types";
import { Send, Sparkles, AlertTriangle, HelpCircle, GraduationCap, Trophy, HelpCircle as HelpIcon, Compass, BookOpen, Clock } from "lucide-react";
import GiraffeMascot from "./GiraffeMascot";

interface StemMascotAIProps {
  lang: Language;
}

interface Message {
  role: "user" | "model";
  text: string;
}

export default function StemMascotAI({ lang }: StemMascotAIProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: lang === "ar" 
        ? "مرحباً يا أصدقائي العباقرة! أنا زرافة ستيم الباسمة ذات ربطة العنق الزرقاء، صديقتكم المريحة ومحاورتكم الذكية في المنصة.\n\nكيف أستطيع إلهام عقلكم الشغوف اليوم؟ يمكنكم اختياري كمرشد مسار، أو تحدي ذكائكم في الألغاز الرياضية واللغوية الحية، أو شرح أي علم غامض بطرق قريبة وودية وممتعة جداً!"
        : "Hello, smart friends! I am the smiling STEM Giraffe with the blue bowtie, your friendly academic support & AI companion.\n\nHow can I spark your curiosity today? Choose an interactive learning mode below and let's explore!"
    }
  ]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"pathfinder" | "challenger" | "explainer">("pathfinder");
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const modeId = useId();

  // Scroll to bottom helper
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
        ? "مرحباً! بصفتي (مرشد المسارات)، أستطيع ترشيح البرنامج والصف أكثر ملائمة لطفلك! من فضلك كم عمر البطل الصغير وما هي مهارته المفضلة؟"
        : "Hello! As your Academy Pathfinder, I will suggest the ultimate study schedule for your child. Tell me, how old is your child?";
    } else if (newMode === "challenger") {
      introText = lang === "ar"
        ? "أهلاً بك بساحة (تحديات زرافة ستيم)! أنا مستعدة لصياغة لغز حساب ذهني أو كلمات إنجليزية سهل ومبهج ومحبب للأعمار الصغيرة. هل أنت مستعد للبدء؟"
        : "Welcome to the STEM Quiz Arena! I am ready to craft a whimsical math or spelling riddle. Are you ready to start?";
    } else {
      introText = lang === "ar"
        ? "أهلاً بك في ساحة (مبسط العلوم)! أي مفهوم في الحساب أو الكلمات أو الفونكس تجده محيراً؟ اسألني لأبسطه لك بقصة طريفة!"
        : "Welcome to the Concept Explainer tool! What math, phonetic, or language term has got you puzzled? Let me break it down easily!";
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
      const history = messages.slice(-5); // Send last 5 turns
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
        throw new Error(lang === "ar" ? "عذراً، تعثر اتصال زرافة ستيم بالشبكة الذكية" : "Failed to connect to STEM Giraffe AI server");
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
            ? "حلقات التواصل تعسرت قليلاً في معالجي الذكي. يرجى التأكد من تشغيل السيرفر أو تواجد مفتاح Gemini في لوحة سر العميل."
            : "Message transmission offline. Make sure the server is responsive and your Gemini API Key is configured in the Settings panel."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Dynamic mascot pose calculation to make the brand advisor feel alive and conversational
  const getDynamicMascotPose = (): 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 => {
    if (errorStatus) return 8; // Sad / offline giraffe
    if (loading) return 3;     // Programming / thinking on laptop
    if (mode === "pathfinder") return 1; // Greeting hello
    if (mode === "challenger") return 4; // Running with football / active energy
    return 5; // Chemistry / scientific explorer
  };

  const PROMPT_CHIPS = {
    pathfinder: lang === "ar" 
      ? ["بنت وعمرها 8 سنوات كيف تبدأ؟", "ما هو سعر باقة 3 أشهر؟", "ابني يحب الأرقام أي مسار يفضله؟"]
      : ["Daughter Aged 8, where to start?", "Pricing for a 3-month class?", "Boy loves math, which pathway?"],
    challenger: lang === "ar"
      ? ["اصنع لي لغز حسابي لعمر 7 سنوات", "أعطني حزورة كلمات بالإنجليزية", "جاهز لتحدي الجمع والتخيل"]
      : ["Math riddle for age 7", "Give me an English spelling puzzle", "I am ready for the mental calculation challenge"],
    explainer: lang === "ar"
      ? ["كيف تشرح 'العداد السوروبان' بقطع الشوكولاتة؟", "ما هو مفهوم الفونكس Phonics الحسي؟", "لماذا نستخدم الحساب الذهني في الحياة؟"]
      : ["Explain Soroban using chocolates", "What is Phonics phonetics?", "Why do we learn mental arithmetic?"]
  };

  return (
    <div id="ai-chat-assistant" className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-pink-950 rounded-3xl p-6 shadow-2xl border border-pink-900/30 text-white flex flex-col h-[550px] overflow-hidden">
      
      {/* AI Assistant Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-indigo-950/40">
        <div className="flex items-center gap-3">
          <div className="relative">
            {/* Displaying mascot head from sprites or using cute custom vector */}
            <div className="w-11 h-11 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg relative z-10 overflow-hidden border-2 border-indigo-900">
              <GiraffeMascot pose={getDynamicMascotPose()} className="w-11 h-11" />
            </div>
            <div className="absolute inset-0 bg-yellow-400 blur-lg rounded-2xl opacity-45"></div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full z-20"></span>
          </div>
          <div>
            <h4 className="font-bold text-base flex items-center gap-1.5 text-yellow-400 font-sans">
              <span>{lang === "ar" ? "مساعد زرافة ستيم الذكي" : "STEM Giraffe Smart Advisor"}</span>
              <Sparkles size={13} className="text-yellow-300 fill-yellow-300 animate-bounce" />
            </h4>
            <p className="text-[10px] text-gray-300 font-bold uppercase tracking-wider font-mono">
              {lang === "ar" ? "مدعوم بنماذج Gemini الذكية الفعالة" : "Powered by advanced server-side Gemini AI"}
            </p>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700 max-w-full overflow-x-auto text-[11px] font-bold">
          <button
            type="button"
            onClick={() => handleModeChange("pathfinder")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all shrink-0 cursor-pointer ${
              mode === "pathfinder" ? "bg-yellow-400 text-slate-950 shadow-md" : "text-gray-300 hover:text-white"
            }`}
          >
            <GraduationCap size={13} />
            {lang === "ar" ? "مستشار المسار" : "Pathfinder"}
          </button>
          <button
            type="button"
            onClick={() => handleModeChange("challenger")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all shrink-0 cursor-pointer ${
              mode === "challenger" ? "bg-yellow-400 text-slate-950 shadow-md" : "text-gray-300 hover:text-white"
            }`}
          >
            <Trophy size={13} />
            {lang === "ar" ? "ألغاز ستيم" : "Logic Challenge"}
          </button>
          <button
            type="button"
            onClick={() => handleModeChange("explainer")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all shrink-0 cursor-pointer ${
              mode === "explainer" ? "bg-yellow-400 text-slate-950 shadow-md" : "text-gray-300 hover:text-white"
            }`}
          >
            <HelpIcon size={13} />
            {lang === "ar" ? "مبسط العلوم" : "Explainer"}
          </button>
        </div>
      </div>

      {/* Mode context details */}
      <div className="bg-slate-800/40 p-2 border-b border-gray-800 text-[10px] text-yellow-100 flex items-center gap-1.5">
        <Sparkles size={11} className="text-yellow-400 animate-spin" />
        <span className="font-sans">
          {mode === "pathfinder" && (lang === "ar" ? "الوضع النشط: إرشاد وتسجيل ومطابقة الكورسات المناسبة لطفلك بالتفصيل." : "Current Focus: Academic consulting, age guidelines and study path suggestions.")}
          {mode === "challenger" && (lang === "ar" ? "الوضع النشط: ألغاز ذهنية مبهجة وتحديات تفكير وتحفيز ذكي للطفل." : "Current Focus: Quick math questions, English noun spelling exercises and playful feedback.")}
          {mode === "explainer" && (lang === "ar" ? "الوضع النشط: قصص وحكايات ملموسة لتبسيط العمليات الحسابية والفظيات." : "Current Focus: Playful child-ready analogies simplifying complex terms step-by-step.")}
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
                  ? "bg-yellow-400 text-slate-950 rounded-br-none font-bold"
                  : "bg-indigo-900/60 text-indigo-50 border border-indigo-800/40 rounded-bl-none"
              }`}
            >
              {/* If model, prepend mascot icon inside message block */}
              {m.role === "model" && (
                <span className="text-xs font-black text-yellow-300 block mb-1">
                  ✦ {lang === "ar" ? "مساعد ستيم الباسم" : "STEM Giraffe Advisor"}
                </span>
              )}
              {m.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-indigo-900/40 text-indigo-200 border border-indigo-800/30 rounded-2xl rounded-bl-none px-4 py-3 text-xs flex items-center gap-2">
              <Clock size={13} className="animate-spin text-yellow-400 shrink-0" />
              <span>{lang === "ar" ? "صديقتكم الزرافة تفكر بحكمة ومحبة..." : "STEM Giraffe is formulating a playful answer..."}</span>
            </div>
          </div>
        )}

        {errorStatus && (
          <div className="p-3 bg-red-950/40 border border-red-900 rounded-xl text-xs text-red-200 flex items-center gap-2 font-sans">
            <AlertTriangle size={15} className="text-red-400 shrink-0" />
            <p className="font-medium">
              {lang === "ar" 
                ? `تأخر الاتصال: ${errorStatus}`
                : `Transmission delay: ${errorStatus}`}
            </p>
          </div>
        )}
      </div>

      {/* Prompt Chips Suggestions */}
      <div className="px-4 py-2 border-t border-indigo-950/40 flex gap-2 overflow-x-auto select-none shrink-0 no-scrollbar">
        {PROMPT_CHIPS[mode].map((chip, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleSend(chip)}
            disabled={loading}
            className="shrink-0 bg-indigo-900/80 hover:bg-indigo-800/80 active:bg-indigo-950 text-gray-200 text-[10px] font-bold py-1.5 px-3 rounded-full border border-indigo-850 hover:border-yellow-400/50 transition-all disabled:opacity-50 cursor-pointer"
          >
            💡 {chip}
          </button>
        ))}
      </div>

      {/* Input controls */}
      <div className="p-4 border-t border-indigo-950/40 flex items-center gap-2 shrink-0 bg-indigo-950/40">
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
              ? "تحدث مع زرافة ستيم اللطيفة... مثلاً: كيف يبدأ طفلي؟"
              : "Chat with STEM Giraffe... e.g., Let's solve a mental math puzzle!"
          }
          className="flex-1 bg-indigo-900/50 border border-indigo-800 focus:border-yellow-400 text-white rounded-xl py-2 px-3 text-xs focus:outline-none placeholder-gray-400 disabled:opacity-50"
        />

        <button
          type="button"
          onClick={() => handleSend()}
          disabled={!input.trim() || loading}
          className="bg-yellow-400 hover:bg-yellow-500 active:scale-95 disabled:opacity-50 text-slate-950 p-2.5 rounded-xl transition-all shadow-md shrink-0 focus:outline-none cursor-pointer"
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  );
}
