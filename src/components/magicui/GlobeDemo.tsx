import { Globe } from "./globe";
import { useEffect, useState } from "react";

// Concepts that rotate through the display
const programmingConcepts = [
  { name: "توسعه وب", icon: "🌐" },
  { name: "هوش مصنوعی", icon: "🧠" },
  { name: "علوم داده", icon: "📊" },
  { name: "برنامه نویسی موبایل", icon: "📱" },
  { name: "امنیت سایبری", icon: "🔒" },
];

export function GlobeDemo() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Rotate through programming concepts
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % programmingConcepts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex w-full h-full items-center justify-center overflow-hidden rounded-lg">
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10 pointer-events-none" />
      
      {/* Professional grid overlay effect */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <div className="w-full h-full grid grid-cols-12 grid-rows-12">
          {Array(144).fill(0).map((_, i) => (
            <div key={i} className="border border-white/10"></div>
          ))}
        </div>
      </div>
      
      {/* The globe component */}
      <div className="absolute inset-0">
        <Globe />
      </div>
      
      {/* Main title - clean and professional */}
      <div className="absolute top-4 z-20 w-full text-center">
        <h2 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
          آموزش حرفه‌ای برنامه‌نویسی
        </h2>
        <p className="text-[11px] text-white/80 mt-1">
          از مبتدی تا پیشرفته، در هر زمان و مکان
        </p>
      </div>
      
      {/* Skill paths that appear professionally */}
      <div className="absolute bottom-16 z-20 w-full">
        <div className="flex justify-center">
          <div className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
            <p className="text-xs text-white/90 text-center">
              {programmingConcepts[activeIndex].icon} {programmingConcepts[activeIndex].name}
            </p>
          </div>
        </div>
      </div>
      
      {/* Statistics - professional touch */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-4 text-center">
        <div className="px-2">
          <p className="text-xs font-semibold text-cyan-400">+200</p>
          <p className="text-[10px] text-white/60">دوره‌ها</p>
        </div>
        <div className="w-px h-8 bg-white/20"></div>
        <div className="px-2">
          <p className="text-xs font-semibold text-cyan-400">+50k</p>
          <p className="text-[10px] text-white/60">دانشجویان</p>
        </div>
        <div className="w-px h-8 bg-white/20"></div>
        <div className="px-2">
          <p className="text-xs font-semibold text-cyan-400">+30</p>
          <p className="text-[10px] text-white/60">اساتید</p>
        </div>
      </div>
    </div>
  );
}
