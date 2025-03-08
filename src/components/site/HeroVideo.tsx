import { useLottie } from "lottie-react";
import { useEffect, useState } from "react";

export default function HeroVideo() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Load the coding.json file instead of hero.json
    fetch("/json/coding.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading Lottie animation:", error));
  }, []);

  const options = {
    animationData,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options);

  if (!animationData) {
    return <div className="w-full h-64 flex items-center justify-center">در حال بارگذاری انیمیشن...</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto flex items-center justify-center">
      <div className="relative">
        {View}
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-600">آموزش برنامه‌نویسی</h2>
          <p className="text-gray-700 mt-2">با ما مسیر برنامه‌نویسی را آسان طی کنید</p>
        </div>
      </div>
    </div>
  );
}
