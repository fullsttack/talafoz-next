import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Import Lottie dynamically with SSR disabled
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

// Define more specific interfaces for Lottie animation data
interface LottieAsset {
  id: string;
  w: number;
  h: number;
  p: string;
  u: string;
  [key: string]: unknown;
}

interface LottieLayer {
  ddd: number;
  ind: number;
  ty: number;
  nm: string;
  sr: number;
  ks: Record<string, unknown>;
  ao: number;
  shapes?: unknown[];
  [key: string]: unknown;
}

interface LottieAnimationData {
  v: string;
  fr: number;
  ip: number;
  op: number;
  w: number;
  h: number;
  nm: string;
  ddd: number;
  assets: LottieAsset[];
  layers: LottieLayer[];
  [key: string]: unknown;
}

export default function HeroJson1() {
  const [animationData, setAnimationData] = useState<LottieAnimationData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimation = async () => {
      try {
        const response = await fetch('/json/hero-1.json');
        if (!response.ok) {
          throw new Error('Failed to load animation data');
        }
        const data = await response.json();
        setAnimationData(data);
        setLoading(false);
      } catch (err) {
        setError('Error loading animation data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchAnimation();
  }, []);

  if (loading) {
    return <div>Loading animation...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="hero-animation-container">
      {animationData && (
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          style={{ width: '100%', height: '400px' }}
        />
      )}
    </div>
  );
}