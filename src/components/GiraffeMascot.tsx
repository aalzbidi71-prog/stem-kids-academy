import { useId, useState } from "react";

interface GiraffeMascotProps {
  pose: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10; 
  // 1: Greeting Giraffe (Waving Hello) [from input_file_1.png]
  // 2: Reading a Book Giraffe (Painting/Reading) [from input_file_1.png]
  // 3: Working on a Laptop Giraffe [from input_file_1.png]
  // 4: Running with a Football Giraffe [from input_file_1.png]
  // 5: Scientific Explorer Giraffe [from input_file_1.png]
  // 6: Certificate Giraffe (Smiling, holding certificate) [from input_file_0.png]
  // 7: Greeting Giraffe with Little Boy on Grass [from input_file_0.png]
  // 8: Sad/Reflective Giraffe sitting down [from input_file_0.png]
  // 9: Cute sitting Giraffe reading a colorful book [from input_file_2.png]
  // 10: STEM Platform Master Logo (Giraffe reading + text) [from input_file_3.png]
  className?: string; // width/height for the container
  alt?: string;
}

export default function GiraffeMascot({ pose, className = "w-32 h-32", alt }: GiraffeMascotProps) {
  const containerId = useId();
  const [imageError, setImageError] = useState(false);

  // Map user's poses to their corresponding image sources and sprite configurations:
  // input_file_1.png has 5 giraffes: [Laptop, Running, Waving, Chemistry, Painting]
  // input_file_0.png has 3 giraffes: [Waving with boy, Certificate, Sad sitting]
  // input_file_2.png is 1 giraffe: [Sitting reading with books stack]
  // input_file_3.png is 1 master logo: [STEM reading giraffe + Arabic subtitle logo]

  let imageSrc = "/input_file_1.png"; // Default to the 5-giraffe sprite
  let spriteWidth = "500%";
  let spriteLeft = "0%";

  if (pose >= 1 && pose <= 5) {
    imageSrc = "/input_file_1.png";
    spriteWidth = "500%";
    const offsets = {
      1: "-200%", // Waving Hello (3rd giraffe)
      2: "-400%", // Reading/Painting (5th giraffe)
      3: "0%",    // Laptop (1st giraffe)
      4: "-100%", // Running (2nd giraffe)
      5: "-300%", // Chemistry/Scientific (4th giraffe)
    };
    spriteLeft = offsets[pose as 1 | 2 | 3 | 4 | 5];
  } else if (pose >= 6 && pose <= 8) {
    imageSrc = "/input_file_0.png";
    spriteWidth = "300%";
    const offsets = {
      6: "-100%", // Certificate Giraffe (Middle giraffe)
      7: "0%",    // Waving with Boy (Left giraffe)
      8: "-200%", // Sad sitting Giraffe (Right giraffe)
    };
    spriteLeft = offsets[pose as 6 | 7 | 8];
  } else if (pose === 9) {
    imageSrc = "/input_file_2.png";
    spriteWidth = "100%";
    spriteLeft = "0%";
  } else if (pose === 10) {
    imageSrc = "/input_file_3.png";
    spriteWidth = "100%";
    spriteLeft = "0%";
  }

  const poseNames = {
    1: "زرافة ستيم ترحب وتبتسم بصداقة واهتمام",
    2: "زرافة ستيم تقرأ كتابًا بشغف ومعرفة",
    3: "زرافة ستيم تبرمج بحماس وتدير الكود",
    4: "زرافة ستيم تجري بنشاط مع كرة القدم",
    5: "زرافة ستيم العالمة تقوم بتجارب تفاعلية ذكية",
    6: "زرافة ستيم تحمل بفخر واعتزاز شهادة التميز والنجاح للطفل",
    7: "زرافة ستيم ترحب بالطفل وتتحدث معه بلطف وعين رعاية",
    8: "زرافة ستيم تفكر وتراجع الأوراق بذكاء وتعاطف",
    9: "زرافة ستيم الأنيقة تقرأ كتاباً ملوناً في هدوء",
    10: "شعار منصة ستيم التعليمية الرسمي مع زرافة المعرفة"
  };

  // Render a gorgeous, detailed vector SVG giraffe customized for each pose as a premium backup support
  const renderSvgFallback = () => {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full bg-linear-to-b from-yellow-50 to-amber-100 rounded-2xl p-1.5 shadow-xs select-none">
        {/* Giraffe Soft Ears */}
        <ellipse cx="38" cy="22" rx="4" ry="8" fill="#eab308" transform="rotate(-30 38 22)" />
        <ellipse cx="62" cy="22" rx="4" ry="8" fill="#eab308" transform="rotate(30 62 22)" />
        <ellipse cx="38" cy="22" rx="2" ry="5" fill="#f43f5e" transform="rotate(-30 38 22)" />
        <ellipse cx="62" cy="22" rx="2" ry="5" fill="#f43f5e" transform="rotate(30 62 22)" />

        {/* Small Giraffe Horns */}
        <rect x="42" y="12" width="2" height="10" rx="1" fill="#ca8a04" />
        <circle cx="43" cy="12" r="3" fill="#ca8a04" />
        <rect x="56" y="12" width="2" height="10" rx="1" fill="#ca8a04" />
        <circle cx="57" cy="12" r="3" fill="#ca8a04" />

        {/* Long, Elegant Neck */}
        <path d="M 43,45 L 43,85 L 57,85 L 57,45 Z" fill="#f59e0b" />
        
        {/* Spots on neck */}
        <circle cx="48" cy="54" r="2.5" fill="#ca8a04" />
        <circle cx="52" cy="62" r="3" fill="#ca8a04" />
        <circle cx="47" cy="71" r="2.8" fill="#ca8a04" />
        <circle cx="52" cy="78" r="3" fill="#ca8a04" />

        {/* Head */}
        <rect x="34" y="24" width="32" height="24" rx="12" fill="#eab308" />
        <rect x="36" y="38" width="28" height="14" rx="7" fill="#fef08a" /> {/* Snout */}

        {/* Nose nostrils */}
        <circle cx="45" cy="45" r="1.5" fill="#ca8a04" opacity="0.7" />
        <circle cx="55" cy="45" r="1.5" fill="#ca8a04" opacity="0.7" />

        {/* Huge, Kind Childlike Eyes */}
        <circle cx="42" cy="33" r="4.5" fill="#1e293b" />
        <circle cx="58" cy="33" r="4.5" fill="#1e293b" />
        {/* Catchlight reflections */}
        <circle cx="43.5" cy="31.5" r="1.8" fill="#ffffff" />
        <circle cx="59.5" cy="31.5" r="1.8" fill="#ffffff" />
        <circle cx="41" cy="34" r="0.8" fill="#ffffff" />
        <circle cx="57" cy="34" r="0.8" fill="#ffffff" />

        {/* Cute rosy cheeks */}
        <circle cx="37" cy="38" r="2.5" fill="#f43f5e" opacity="0.6" />
        <circle cx="63" cy="38" r="2.5" fill="#f43f5e" opacity="0.6" />

        {/* Delightful Blue Bowtie */}
        <path d="M 44,83 L 56,86 L 50,89 Z" fill="#2563eb" />
        <path d="M 56,83 L 44,86 L 50,89 Z" fill="#2563eb" />
        <circle cx="50" cy="86" r="3.2" fill="#3b82f6" />

        {/* Friendly smile */}
        <path d="M 44,45 Q 50,51 56,45" fill="none" stroke="#ca8a04" strokeWidth="2.5" strokeLinecap="round" />

        {/* Pose-Specific Decorative Accessories */}
        {(pose === 1 || pose === 7) && ( // Greeting Poses
          <g>
            {/* Sparkles / welcoming stars */}
            <path d="M 16,35 L 18,37 L 20,38 L 18,39 L 16,41 L 14,39 L 12,38 L 14,37 Z" fill="#fbbf24" />
            <path d="M 84,45 L 86,47 L 88,48 L 86,49 L 84,51 L 82,49 L 80,48 L 82,47 Z" fill="#fbbf24" />
            {/* Waving raised hand */}
            <path d="M 43,55 C 30,50 20,38 22,35 C 24,32 32,45 43,51" fill="#f59e0b" stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="21" cy="34" r="2.5" fill="#f59e0b" />
          </g>
        )}

        {(pose === 2 || pose === 9) && ( // Reading Book Poses
          <g>
            {/* Scholarship collar or graduation cap detail */}
            <path d="M 40,24 L 50,18 L 60,24 L 50,30 Z" fill="#1e1b4b" />
            <rect x="49" y="24" width="2" height="10" fill="#fbbf24" />
            {/* Open notebook book at bottom */}
            <path d="M 22,80 Q 50,70 78,80 L 78,96 Q 50,88 22,96 Z" fill="#ffffff" stroke="#e11d48" strokeWidth="1" />
            {/* Book spine/center */}
            <line x1="50" y1="74" x2="50" y2="92" stroke="#e11d48" strokeWidth="1.5" />
            {/* Dynamic text lines inside the book */}
            <line x1="28" y1="81" x2="44" y2="81" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="28" y1="86" x2="42" y2="86" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="28" y1="91" x2="45" y2="91" stroke="#cbd5e1" strokeWidth="1" />
            
            <line x1="56" y1="81" x2="72" y2="81" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="56" y1="86" x2="70" y2="86" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="55" y1="91" x2="71" y2="91" stroke="#cbd5e1" strokeWidth="1" />
            {/* Sparkle of intelligence */}
            <circle cx="22" cy="74" r="2" fill="#fbbf24" />
            <circle cx="78" cy="74" r="2" fill="#fbbf24" />
          </g>
        )}

        {pose === 3 && ( // Pose 3: Working on a Laptop
          <g>
            {/* Sleek laptop in front */}
            <path d="M 22,75 L 78,75 L 84,95 L 16,95 Z" fill="#64748b" stroke="#334155" strokeWidth="1.5" />
            <rect x="30" y="55" width="40" height="24" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
            {/* Laptop screen with color code lines */}
            <rect x="33" y="58" width="34" height="18" fill="#1e293b" />
            <text x="50" y="66" fontSize="5" fontWeight="extrabold" fill="#10b981" textAnchor="middle" fontFamily="monospace">print("STEM")</text>
            <text x="50" y="72" fontSize="4.5" fill="#f43f5e" textAnchor="middle" fontFamily="monospace">{"<> Code </> "}</text>
            {/* Stylized keyboard lights */}
            <circle cx="50" cy="85" r="1" fill="#38bdf8" />
            <circle cx="42" cy="85" r="0.8" fill="#38bdf8" />
            <circle cx="58" cy="85" r="0.8" fill="#38bdf8" />
          </g>
        )}

        {pose === 4 && ( // Pose 4: Running with Football
          <g>
            {/* Cute Sports Headband */}
            <rect x="34" y="27" width="32" height="4.5" fill="#e11d48" rx="1.5" />
            <rect x="46" y="27" width="8" height="4.5" fill="#ffffff" />
            {/* Speed trace lines */}
            <line x1="12" y1="48" x2="24" y2="48" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
            <line x1="8" y1="62" x2="20" y2="62" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            {/* Soccer ball at corner */}
            <circle cx="80" cy="80" r="10" fill="#ffffff" stroke="#1e293b" strokeWidth="1.5" />
            <polygon points="80,75 76,79 78,84 82,84 84,79" fill="#1e293b" />
            <line x1="80" y1="75" x2="80" y2="70" stroke="#1e293b" strokeWidth="1.5" />
            <line x1="76" y1="79" x2="71" y2="77" stroke="#1e293b" strokeWidth="1.5" />
            <line x1="78" y1="84" x2="75" y2="89" stroke="#1e293b" strokeWidth="1.5" />
            <line x1="82" y1="84" x2="85" y2="89" stroke="#1e293b" strokeWidth="1.5" />
            <line x1="84" y1="79" x2="89" y2="77" stroke="#1e293b" strokeWidth="1.5" />
          </g>
        )}

        {pose === 5 && ( // Pose 5: Scientific Explorer
          <g>
            {/* Science protective glasses */}
            <rect x="36" y="29" width="13" height="9" rx="3" fill="none" stroke="#2563eb" strokeWidth="2.5" opacity="0.95" />
            <rect x="51" y="29" width="13" height="9" rx="3" fill="none" stroke="#2563eb" strokeWidth="2.5" opacity="0.95" />
            <line x1="49" y1="33" x2="52" y2="33" stroke="#2563eb" strokeWidth="2" />
            {/* Bubbling Erlenmeyer Flask */}
            <path d="M 68,82 L 82,82 L 86,96 L 64,96 Z" fill="#10b981" stroke="#047857" strokeWidth="1.5" />
            <rect x="73" y="70" width="4" height="13" fill="#ffffff" stroke="#047857" strokeWidth="1.5" />
            {/* Magic bubbles rising */}
            <circle cx="75" cy="64" r="2.5" fill="#34d399" />
            <circle cx="72" cy="57" r="1.8" fill="#6ee7b7" />
            <circle cx="78" cy="58" r="1.3" fill="#a7f3d0" />
            <circle cx="75" cy="51" r="2.2" fill="#10b981" />
          </g>
        )}

        {pose === 6 && ( // Pose 6: Holding Certificate
          <g>
            {/* High quality certificate layout at bottom */}
            <rect x="25" y="60" width="50" height="34" rx="3" fill="#ffffff" stroke="#ca8a04" strokeWidth="2" />
            <rect x="29" y="64" width="42" height="26" fill="none" stroke="#fef08a" strokeWidth="1" />
            <circle cx="50" cy="73" r="3.5" fill="#ca8a04" />
            {/* Award Ribbon */}
            <path d="M 48,75 L 45,86 L 50,81 L 55,86 L 52,75 Z" fill="#f43f5e" />
            <line x1="34" y1="81" x2="42" y2="81" stroke="#cbd5e1" strokeWidth="1.5" />
            <line x1="58" y1="81" x2="66" y2="81" stroke="#cbd5e1" strokeWidth="1.5" />
          </g>
        )}

        {pose === 8 && ( // Sad/Reflective state
          <g>
            {/* Teardrop decoration around the eyes */}
            <ellipse cx="43" cy="37" rx="1.5" ry="3.5" fill="#38bdf8" />
            {/* Inverted / questioning mouth */}
            <path d="M 46,47 Q 50,44 54,47" fill="none" stroke="#ca8a04" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}

        {pose === 10 && ( // Mastery Brand Logo
          <g>
            <text x="50" y="65" fontSize="11" fontWeight="black" fill="#db2777" textAnchor="middle" fontFamily="sans-serif">STEM</text>
            <text x="50" y="80" fontSize="7" fontWeight="bold" fill="#0f172a" textAnchor="middle" fontFamily="sans-serif">منصة ستيم</text>
          </g>
        )}
      </svg>
    );
  };

  if (imageError) {
    return (
      <div id={containerId} className={`inline-block ${className}`}>
        {renderSvgFallback()}
      </div>
    );
  }

  // Render original high-resolution cropped sprite logic safely
  return (
    <div 
      id={containerId}
      className={`relative overflow-hidden aspect-square inline-block rounded-2xl ${className}`}
    >
      <img
        src={imageSrc}
        alt={alt || poseNames[pose]}
        referrerPolicy="no-referrer"
        onError={() => setImageError(true)}
        className="absolute top-0 h-full max-w-none hover:scale-105 transition-transform duration-300"
        style={{
          width: spriteWidth,
          left: spriteLeft,
        }}
      />
    </div>
  );
}
