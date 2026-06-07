import { useId, useState } from "react";

interface GiraffeMascotProps {
  pose: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  className?: string;
  alt?: string;
}

const poseNames: Record<GiraffeMascotProps["pose"], string> = {
  1: "زرافة ستيم ترحب بالأطفال بابتسامة ودودة",
  2: "زرافة ستيم تقرأ وتتعلم بشغف",
  3: "زرافة ستيم تبرمج على الحاسوب",
  4: "زرافة ستيم نشيطة في تحديات الحركة",
  5: "زرافة ستيم العالمة في المختبر",
  6: "زرافة ستيم تحمل شهادة النجاح والإنجاز",
  7: "زرافة ستيم ترحب بالطفل على العشب",
  8: "زرافة ستيم تفكر وتراجع الأوراق",
  9: "زرافة ستيم تقرأ كتابًا ملونًا",
  10: "شعار منصة ستيم التعليمية",
};

function getSpriteConfig(pose: GiraffeMascotProps["pose"]) {
  if (pose >= 1 && pose <= 5) {
    const offsets = {
      1: "-200%",
      2: "-400%",
      3: "0%",
      4: "-100%",
      5: "-300%",
    } as const;

    return {
      src: "/input_file_1.png",
      width: "500%",
      left: offsets[pose as 1 | 2 | 3 | 4 | 5],
    };
  }

  if (pose >= 6 && pose <= 8) {
    const offsets = {
      6: "-100%",
      7: "0%",
      8: "-200%",
    } as const;

    return {
      src: "/input_file_0.png",
      width: "300%",
      left: offsets[pose as 6 | 7 | 8],
    };
  }

  if (pose === 10) {
    return {
      src: "/input_file_3.png",
      width: "100%",
      left: "0%",
    };
  }

  return {
    src: "/input_file_2.png",
    width: "100%",
    left: "0%",
  };
}

export default function GiraffeMascot({ pose, className = "w-32 h-32", alt }: GiraffeMascotProps) {
  const containerId = useId();
  const [imageError, setImageError] = useState(false);
  const sprite = getSpriteConfig(pose);

  if (imageError) {
    return (
      <div
        id={containerId}
        className={`inline-grid place-items-center rounded-2xl bg-amber-50 text-amber-700 ${className}`}
        role="img"
        aria-label={alt || poseNames[pose]}
      >
        <span className="text-4xl font-black font-english">STEM</span>
      </div>
    );
  }

  return (
    <div
      id={containerId}
      className={`relative inline-block overflow-hidden rounded-2xl ${className}`}
    >
      <img
        src={sprite.src}
        alt={alt || poseNames[pose]}
        onError={() => setImageError(true)}
        className="absolute top-0 h-full max-w-none select-none transition-transform duration-300 hover:scale-105"
        style={{
          width: sprite.width,
          left: sprite.left,
        }}
        draggable={false}
      />
    </div>
  );
}
