import React, { useState, useRef, useEffect, useId } from "react";
import { StudentProject, Language } from "../types";
import { Play, RotateCcw, ThumbsUp, Code, Sparkles, Trophy, Cpu, Gamepad2, Layers } from "lucide-react";

interface StudentProjectSandboxProps {
  project: StudentProject;
  lang: Language;
  onLike: (id: string) => void;
  liked: boolean;
}

export default function StudentProjectSandbox({ project, lang, onLike, liked }: StudentProjectSandboxProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewMode, setViewMode] = useState<"visual" | "code">("visual");

  // Game 1: Jump Game State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameLoopRef = useRef<number | null>(null);

  // Game entities
  const pandaYRef = useRef(140); // Ground is 140 on a 200px height canvas
  const pandaVelocityRef = useRef(0);
  const obstacleXRef = useRef(400);
  const obstacleSpeedRef = useRef(3);

  // Speech helper state for English Dictionary project 3
  const [activeWord, setActiveWord] = useState<"giraffe" | "laptop" | "none">("none");
  const [speakingTextAr, setSpeakingTextAr] = useState("قم باختيار بطاقة ناطقة لتستمع للنطق بالانجليزية والمخارج السليمة");
  const [speakingTextEn, setSpeakingTextEn] = useState("Choose an interactive word card below to trigger high-quality audio pronunciation");

  // Code challenge helper state for Math game project 2
  const [userGuess, setUserGuess] = useState("");
  const [mathNum1, setMathNum1] = useState(12);
  const [mathNum2, setMathNum2] = useState(15);
  const [mathScore, setMathScore] = useState(0);
  const [mathFeedback, setMathFeedback] = useState("");

  // Financial Planner calculator inputs for Project 4
  const [currentSavings, setCurrentSavings] = useState(25);
  const [targetToyPrice, setTargetToyPrice] = useState(100);
  const [dailyAllowance, setDailyAllowance] = useState(5);

  const canvasId = useId();

  // Reset sandbox state when project changes
  useEffect(() => {
    setIsPlaying(false);
    setGameOver(false);
    setScore(0);
    setViewMode("visual");
    setActiveWord("none");
    setUserGuess("");
    setMathScore(0);
    setMathFeedback("");
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }
  }, [project.id]);

  // Jump canvas render loop
  const startJumpGame = () => {
    setGameOver(false);
    setScore(0);
    setIsPlaying(true);
    pandaYRef.current = 135;
    pandaVelocityRef.current = 0;
    obstacleXRef.current = 400;
    obstacleSpeedRef.current = 3.5;
  };

  const executeJump = () => {
    if (pandaYRef.current >= 135 && !gameOver) {
      pandaVelocityRef.current = -11; // Upward force
    }
  };

  useEffect(() => {
    if (project.id !== "proj_1" || !isPlaying || gameOver) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        executeJump();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project.id, isPlaying, gameOver]);

  // Jump canvas animation tick
  useEffect(() => {
    if (project.id !== "proj_1" || !isPlaying) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let localGameOver = false;

    const tick = () => {
      if (localGameOver) return;

      // Physics update
      pandaVelocityRef.current += 0.6; // Gravity
      pandaYRef.current += pandaVelocityRef.current;

      // Ground limit
      if (pandaYRef.current >= 135) {
        pandaYRef.current = 135;
        pandaVelocityRef.current = 0;
      }

      // Move obstacle
      obstacleXRef.current -= obstacleSpeedRef.current;
      if (obstacleXRef.current < -30) {
        obstacleXRef.current = 400;
        obstacleSpeedRef.current += 0.15; // Speed up
        setScore((prev) => prev + 1);
      }

      // Check collision
      const px = 50;
      const py = pandaYRef.current;
      const pSize = 30;
      const obX = obstacleXRef.current;
      const obY = 145;
      const obW = 20;
      const obH = 20;

      if (
        px < obX + obW &&
        px + pSize > obX &&
        py < obY + obH &&
        py + pSize > obY
      ) {
        localGameOver = true;
        setGameOver(true);
        setIsPlaying(false);
        return;
      }

      // Draw background
      ctx.fillStyle = "#fffbeb"; // Yellow pastel background
      ctx.fillRect(0, 0, 400, 200);

      // Draw Horizon Ground
      ctx.strokeStyle = "#fbbf24";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 165);
      ctx.lineTo(400, 165);
      ctx.stroke();

      // Grass details on floor
      ctx.fillStyle = "#10b981";
      for (let i = 0; i < 400; i += 80) {
        ctx.fillRect(i + ((Date.now() / 20) % 80), 165, 8, 3);
      }

      // Draw Obstacle (A red numbers bug obstacle)
      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      ctx.arc(obX + 10, obY + 10, 8, 0, Math.PI * 2);
      ctx.fill();
      // Draw spokes
      ctx.strokeStyle = "#b91c1c";
      ctx.lineWidth = 3;
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
        ctx.beginPath();
        ctx.moveTo(obX + 10 + Math.cos(angle) * 7, obY + 10 + Math.sin(angle) * 7);
        ctx.lineTo(obX + 10 + Math.cos(angle) * 12, obY + 10 + Math.sin(angle) * 12);
        ctx.stroke();
      }

      // Draw Mascot/Hero
      const pxDraw = px;
      const pyDraw = py;

      // Simple yellow/orange giraffe shape representation for the customized theme!
      ctx.fillStyle = "#f59e0b"; // Amber neck/head
      ctx.fillRect(pxDraw + 10, pyDraw + 5, 10, 20); // neck
      ctx.fillRect(pxDraw + 10, pyDraw, 15, 8); // head
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(pxDraw + 20, pyDraw + 2, 3, 3); // eye
      ctx.fillStyle = "#000000";
      ctx.fillRect(pxDraw + 21, pyDraw + 3, 1, 1); // pupil

      // Blue bowtie (essential to visual identity!)
      ctx.fillStyle = "#3b82f6";
      ctx.beginPath();
      ctx.moveTo(pxDraw + 6, pyDraw + 15);
      ctx.lineTo(pxDraw + 14, pyDraw + 18);
      ctx.lineTo(pxDraw + 6, pyDraw + 21);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(pxDraw + 24, pyDraw + 15);
      ctx.lineTo(pxDraw + 16, pyDraw + 18);
      ctx.lineTo(pxDraw + 24, pyDraw + 21);
      ctx.fill();

      gameLoopRef.current = requestAnimationFrame(tick);
    };

    gameLoopRef.current = requestAnimationFrame(tick);
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [project.id, isPlaying]);

  const handleWordSelect = (word: "giraffe" | "laptop") => {
    setActiveWord(word);
    if (word === "giraffe") {
      setSpeakingTextAr("The giraffe with a blue bowtie is reading a book! 🦒\n(نطق سليم وصحيح تماماً بنسبة 99%)");
      setSpeakingTextEn("The giraffe with a blue bowtie is reading a book! 🦒\n(Crystal-clear native speaking audio feed)");
    } else if (word === "laptop") {
      setSpeakingTextAr("I love coding and learning math on my laptop! 💻\n(الأحرف واللفظ الصوتي مثالي)");
      setSpeakingTextEn("I love coding and learning math on my laptop! 💻\n(Correct emphasis on math and coding vowels)");
    }
  };

  // Math challenge validation
  const checkMathGuess = (e: React.FormEvent) => {
    e.preventDefault();
    const correctVal = mathNum1 + mathNum2;
    if (parseInt(userGuess) === correctVal) {
      setMathScore((s) => s + 10);
      setMathFeedback(lang === "ar" ? "إجابة صحيحة وممتازة! أحسنت وبوركت 🌟" : "Correct & Excellent! Super calculation! 🌟");
      setUserGuess("");
      // Generate next
      setMathNum1(Math.floor(Math.random() * 30) + 10);
      setMathNum2(Math.floor(Math.random() * 30) + 10);
    } else {
      setMathFeedback(lang === "ar" ? "أوشكت على الوصول! جرب المحاولة الذكية مرة أخرى 💛" : "Almost there! Try another thoughtful approach 💛");
    }
  };

  // Savings helper output
  const dailyTotalToSave = () => {
    const remaining = targetToyPrice - currentSavings;
    if (remaining <= 0) return 0;
    return Math.ceil(remaining / dailyAllowance);
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-pink-50 flex flex-col md:flex-row h-full">
      {/* Visual Workspace */}
      <div className="flex-1 p-6 flex flex-col justify-between bg-zinc-50 border-r border-gray-150">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono px-3 py-1 bg-yellow-100/60 text-yellow-800 rounded-full font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              {lang === "ar" ? "مختبر الطالب التفاعلي" : "Student Interactive Lab"}
            </span>

            {/* Toggle View Mode */}
            <div className="flex bg-gray-200 p-0.5 rounded-xl text-xs font-medium">
              <button
                type="button"
                onClick={() => setViewMode("visual")}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === "visual" ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <Layers size={13} />
                {lang === "ar" ? "المحاكي المرئي" : "Visual Run"}
              </button>
              <button
                type="button"
                onClick={() => setViewMode("code")}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === "code" ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <Code size={13} />
                {lang === "ar" ? "كود المشروع" : "Source Code"}
              </button>
            </div>
          </div>

          <h4 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2 font-sans">
            <span>{lang === "ar" ? project.titleAr : project.titleEn}</span>
            <span className="text-xs bg-amber-500/10 px-2 py-0.5 rounded font-normal text-amber-600">
              {lang === "ar" ? `بواسطة المبدع: ${project.creatorAr}` : `By ${project.creatorEn}`}
            </span>
          </h4>
          <p className="text-xs text-gray-500 leading-relaxed mb-4">
            {lang === "ar" ? project.descriptionAr : project.descriptionEn}
          </p>
        </div>

        {/* Dynamic Sandbox Display depending on View Mode */}
        <div className="flex-1 flex flex-col justify-center min-h-[220px]">
          {viewMode === "code" ? (
            <div className="bg-slate-900 rounded-2xl p-4 font-mono text-xs text-emerald-400 overflow-x-auto relative">
              <div className="absolute top-2 right-3 text-[10px] text-gray-500 font-sans">
                {lang === "ar" ? "الأوراق والشفرة البرمجية" : "Interactive Script"}
              </div>
              <pre className="leading-relaxed select-all">{project.codeSnippet}</pre>
            </div>
          ) : (
            <>
              {/* Project 1: Mental Math Speed run Sandbox */}
              {project.id === "proj_1" && (
                <div className="flex flex-col items-center">
                  <div className="relative border-4 border-yellow-200 rounded-2xl overflow-hidden bg-gray-100 shadow-inner">
                    <canvas
                      id={canvasId}
                      ref={canvasRef}
                      width={400}
                      height={200}
                      onClick={executeJump}
                      className="cursor-pointer max-w-full"
                    />

                    {!isPlaying && !gameOver && (
                      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-center items-center text-white p-4 text-center">
                        <Gamepad2 size={36} className="text-amber-400 animate-bounce mb-2" />
                        <h5 className="font-bold text-sm mb-1">
                          {lang === "ar" ? "ساعد زرافة ستيم في تخطي حواجز الأخطاء!" : "Help STEM Giraffe leap over arithmetic bugs!"}
                        </h5>
                        <p className="text-[10px] text-gray-200 mb-3 max-w-[280px]">
                          {lang === "ar" ? "اضغط لبدء اللعبة وانقر على اللوحة الورقية للقفز بحرص وسرعة!" : "Tap to launch. Touch screens to hop over compiler obstacles."}
                        </p>
                        <button
                          type="button"
                          onClick={startJumpGame}
                          className="bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 shadow transition-transform cursor-pointer"
                        >
                          <Play size={12} fill="currentColor" />
                          {lang === "ar" ? "بدء المحاكاة" : "Launch Game"}
                        </button>
                      </div>
                    )}

                    {isPlaying && (
                      <div className="absolute top-2 right-3 bg-slate-900/80 text-white font-mono text-xs px-2 py-1 rounded-lg">
                        {lang === "ar" ? `النقاط: ${score}` : `Score: ${score}`}
                      </div>
                    )}

                    {gameOver && (
                      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col justify-center items-center text-white p-4 text-center">
                        <Trophy size={32} className="text-yellow-400 mb-1" />
                        <h5 className="font-bold text-sm text-red-400 mb-1">
                          {lang === "ar" ? "انتهى المسار الإعدادي بسلام مدهش!" : "Encountered arithmetic barrier!"}
                        </h5>
                        <p className="text-xs text-gray-200 mb-3 font-mono">
                          {lang === "ar" ? `مجموع نقاطك الرائعة: ${score}` : `Score: ${score} points compiled`}
                        </p>
                        <button
                          type="button"
                          onClick={startJumpGame}
                          className="bg-emerald-500 hover:bg-emerald-600 font-bold text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 transition-transform cursor-pointer"
                        >
                          <RotateCcw size={12} />
                          {lang === "ar" ? "حساب آخر" : "Try Again"}
                        </button>
                      </div>
                    )}
                  </div>
                  {isPlaying && (
                    <button
                      type="button"
                      onClick={executeJump}
                      className="mt-3 md:hidden w-full max-w-[150px] bg-amber-500 text-slate-950 font-bold py-2 rounded-xl text-xs active:bg-amber-600 cursor-pointer"
                    >
                      {lang === "ar" ? "قفز ⬆️" : "Jump ⬆️"}
                    </button>
                  )}
                </div>
              )}

              {/* Project 2: Interactive Voice Picture Dictionary */}
              {project.id === "proj_3" && (
                <div className="space-y-4">
                  <div className="border border-yellow-200 rounded-2xl bg-slate-900 p-4 relative min-h-[140px] flex flex-col justify-between overflow-hidden">
                    <div className="absolute top-2 right-3 flex items-center gap-1 text-[10px]">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-gray-400 font-mono">MICRO_SPEAKER_SIM</span>
                    </div>

                    <div className="flex-1 flex flex-col justify-center items-center py-4">
                      {activeWord === "none" ? (
                        <div className="text-center text-gray-400">
                          <Cpu size={28} className="mx-auto mb-2 text-yellow-400 animate-pulse" />
                          <p className="text-xs max-w-[250px]">
                            {lang === "ar"
                              ? "بانتظار ضغط الطفل على الأزرار اللفظية التفاعلية بالأسفل..."
                              : "Choose any of the spoken word triggers below to observe Phonics"}
                          </p>
                        </div>
                      ) : (
                        <div className="text-center">
                          {activeWord === "giraffe" && <span className="text-4xl block animate-bounce">🦒</span>}
                          {activeWord === "laptop" && <span className="text-4xl block animate-bounce">💻</span>}
                        </div>
                      )}
                    </div>

                    <div className="bg-black/80 p-2.5 rounded-lg border border-gray-800 text-center">
                      <span className="text-[10px] block text-gray-400 uppercase font-mono tracking-wider">
                        {lang === "ar" ? "اللفظ النطقي الانجليزي" : "Phonetic Pronunciation Audio Wave"}
                      </span>
                      <p className="text-xs font-bold text-yellow-300 whitespace-pre-line">
                        {lang === "ar" ? speakingTextAr : speakingTextEn}
                      </p>
                    </div>
                  </div>

                  {/* Buttons to click and speak */}
                  <div className="flex justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleWordSelect("giraffe")}
                      className={`flex-1 py-1.5 px-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        activeWord === "giraffe"
                          ? "bg-amber-100 border-amber-300 text-amber-800 font-bold"
                          : "bg-white hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <span>🦒</span> {lang === "ar" ? "كلمة زرافة" : "Giraffe 🦒"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleWordSelect("laptop")}
                      className={`flex-1 py-1.5 px-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        activeWord === "laptop"
                          ? "bg-amber-100 border-amber-300 text-amber-800 font-bold"
                          : "bg-white hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <span>💻</span> {lang === "ar" ? "كلمة حاسوب" : "Laptop 💻"}
                    </button>
                  </div>
                </div>
              )}

              {/* Project 3: Jump to Odd Numbers Math Simulator */}
              {project.id === "proj_2" && (
                <div className="space-y-4 bg-yellow-50/60 p-4 rounded-xl border border-yellow-100">
                  <div className="text-center">
                    <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block mb-1">
                      {lang === "ar" ? "مسائل الحساب الذهني التراكمية" : "Mental Math Challenge Simulator"}
                    </span>
                    <h5 className="text-2xl font-black text-slate-900 font-mono">
                      {mathNum1} + {mathNum2} = ?
                    </h5>
                  </div>

                  <form onSubmit={checkMathGuess} className="flex gap-2 justify-center">
                    <input
                      type="number"
                      value={userGuess}
                      onChange={(e) => setUserGuess(e.target.value)}
                      placeholder={lang === "ar" ? "أدخل النتيجة الذكية..." : "Solve value..."}
                      className="border border-gray-300 rounded-xl px-3 py-2 text-center font-mono font-bold text-gray-900 bg-white max-w-[150px]"
                    />
                    <button
                      type="submit"
                      className="bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs cursor-pointer"
                    >
                      {lang === "ar" ? "تحقق" : "Solve"}
                    </button>
                  </form>

                  {mathFeedback && (
                    <p className="text-xs text-center font-bold text-amber-650 animate-bounce">
                      {mathFeedback}
                    </p>
                  )}

                  <div className="flex justify-between items-center text-[10px] font-mono font-bold text-gray-500 pt-2 border-t border-gray-150">
                    <span>{lang === "ar" ? "النتائج التراكمية للطفل:" : "Cumulative Performance Score:"}</span>
                    <span className="text-emerald-600">🏆 {mathScore} {lang === "ar" ? "نقطة تفوق سنوية" : "points"}</span>
                  </div>
                </div>
              )}

              {/* Project 4: Financial Savings Calculator */}
              {project.id === "proj_4" && (
                <div className="space-y-4 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
                  <h5 className="text-xs font-bold text-emerald-800 text-center mb-2 flex items-center justify-center gap-1">
                    <Sparkles size={12} className="text-emerald-605" />
                    {lang === "ar" ? "تعديل معنويات الادخار الحكيم" : "Edit values to calculate child savings cycle"}
                  </h5>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label htmlFor="toy-price-proj4" className="block text-[10px] text-gray-500 mb-0.5">
                        {lang === "ar" ? "سعر اللعبة المستهدفة (ريال):" : "Target Toy Cost (SAR):"}
                      </label>
                      <input
                        id="toy-price-proj4"
                        type="number"
                        value={targetToyPrice}
                        onChange={(e) => setTargetToyPrice(Math.max(1, parseInt(e.target.value) || 0))}
                        className="w-full bg-white border border-gray-300 rounded-lg p-1.5 font-mono text-center text-gray-900"
                      />
                    </div>
                    <div>
                      <label htmlFor="current-savings-proj4" className="block text-[10px] text-gray-500 mb-0.5">
                        {lang === "ar" ? "المدخر حالياً:" : "Current Money Saved:"}
                      </label>
                      <input
                        id="current-savings-proj4"
                        type="number"
                        value={currentSavings}
                        onChange={(e) => setCurrentSavings(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full bg-white border border-gray-300 rounded-lg p-1.5 font-mono text-center text-gray-900"
                      />
                    </div>
                  </div>

                  <div className="text-xs">
                    <label htmlFor="daily-allowance-proj4" className="block text-[10px] text-gray-500 mb-0.5">
                      {lang === "ar" ? "الادخار اليومي الذكي (ريال):" : "Value saved daily from allowance:"}
                    </label>
                    <input
                      id="daily-allowance-proj4"
                      type="number"
                      value={dailyAllowance}
                      onChange={(e) => setDailyAllowance(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-white border border-gray-300 rounded-lg p-1.5 font-mono text-center text-gray-900"
                    />
                  </div>

                  <div className="bg-emerald-500 text-white rounded-xl p-3 text-center shadow-md">
                    {currentSavings >= targetToyPrice ? (
                      <div>
                        <span className="text-sm font-bold block">🎉 {lang === "ar" ? "تم تحقيق هدف الادخار!" : "Goal Achieved!"}</span>
                        <span className="text-[10px] text-emerald-150">{lang === "ar" ? "أحسنتم مبروك" : "Congratulations!"}</span>
                      </div>
                    ) : (
                      <div>
                        <span className="text-2xl font-black">{dailyTotalToSave()}</span>
                        <span className="text-xs block font-bold">
                          {lang === "ar" ? "أيام متبقية لتحقيق لعبة النجاح البرية!" : "Days of saving remains to target!"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Project details card */}
      <div className="w-full md:w-72 p-6 flex flex-col justify-between">
        <div className="space-y-4">
          <div>
            <span className="text-[10px] font-mono border border-gray-200 uppercase px-2 py-0.5 rounded text-gray-400 font-bold">
              {lang === "ar" ? "رائد الغد المبتكر" : "Young Innovator"}
            </span>
            <h5 className="text-base font-bold text-gray-900 mt-1 font-sans">
              {lang === "ar" ? project.creatorAr : project.creatorEn}
            </h5>
            <span className="text-xs text-gray-500 font-semibold block mt-0.5">
              {lang === "ar" ? `${project.age} سنوات` : `${project.age} Years old`}
            </span>
          </div>

          <div>
            <h6 className="text-xs text-gray-400 mb-1 font-bold uppercase font-mono">
              {lang === "ar" ? "البرنامج المدروس" : "Target Pathway"}
            </h6>
            <span
              className={`text-xs px-3 py-1.5 rounded-xl font-bold inline-block border ${
                project.pathId === "math"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : "bg-amber-50 border-amber-200 text-amber-700"
              }`}
            >
              {project.pathId === "math" && (lang === "ar" ? "⭐ الحساب الذهني" : "Applied Math")}
              {project.pathId === "english" && (lang === "ar" ? "🗣️ اللغة الإنجليزية" : "English Phonics")}
            </span>
          </div>

          <div className="space-y-1.5">
            <h6 className="text-xs text-gray-400 font-bold uppercase font-mono">
              {lang === "ar" ? "الأوراق والمفاهيم" : "Scientific Concepts"}
            </h6>
            <div className="flex flex-wrap gap-1">
              {(lang === "ar" ? project.tagsAr : project.tagsEn).map((tag, idx) => (
                <span key={idx} className="bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-lg text-xs text-gray-600 font-medium font-sans">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onLike(project.id)}
            className={`flex items-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold transition-all shadow cursor-pointer ${
              liked
                ? "bg-yellow-400 text-slate-950"
                : "bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 active:scale-95"
            }`}
          >
            <ThumbsUp size={14} fill={liked ? "currentColor" : "none"} />
            <span>
              {liked ? (lang === "ar" ? "تم تشجيعه!" : "Encouraged!") : (lang === "ar" ? "تشجيع الطالب" : "Encourage")}
            </span>
          </button>

          <span className="font-mono text-xs text-gray-400 bg-gray-50 px-2.5 py-1.5 rounded-lg border font-bold">
            ❤️ {project.likes + (liked ? 1 : 0)}
          </span>
        </div>
      </div>
    </div>
  );
}
