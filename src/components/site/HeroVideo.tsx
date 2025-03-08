import { useLottie } from "lottie-react";
import { useEffect, useState } from "react";

export default function HeroVideo() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Load the coding.json file instead of hero.json
    fetch("/json/hero-2.json")
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
    <div className="w-full mx-auto flex items-center justify-center">
      <div className="relative">
        {View}
      </div>
    </div>
  );
}
