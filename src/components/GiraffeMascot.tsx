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

const poseSources: Record<GiraffeMascotProps["pose"], string> = {
  1: "/mascot_pose_1.png",
  2: "/mascot_pose_2.png",
  3: "/mascot_pose_3.png",
  4: "/mascot_pose_4.png",
  5: "/mascot_pose_5.png",
  6: "/mascot_pose_6.png",
  7: "/mascot_pose_7.png",
  8: "/mascot_pose_8.png",
  9: "/mascot_pose_9.png",
  10: "/mascot_pose_10.png",
};

export default function GiraffeMascot({ pose, className = "w-32 h-32", alt }: GiraffeMascotProps) {
  const containerId = useId();
  const [imageError, setImageError] = useState(false);
  const imageSrc = poseSources[pose];

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
        src={imageSrc}
        alt={alt || poseNames[pose]}
        onError={() => setImageError(true)}
        className="h-full w-full select-none object-contain transition-transform duration-300 hover:scale-105"
        draggable={false}
      />
    </div>
  );
}
