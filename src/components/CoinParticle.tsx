import { useEffect, useState } from "react";

interface CoinParticleProps {
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  delay: number;
  onComplete?: () => void;
}

export const CoinParticle = ({ 
  startX, 
  startY, 
  targetX, 
  targetY, 
  delay,
  onComplete 
}: CoinParticleProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsAnimating(true);
    }, delay);

    const completeTimer = setTimeout(() => {
      onComplete?.();
    }, delay + 1000);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(completeTimer);
    };
  }, [delay, onComplete]);

  return (
    <div
      className="absolute w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg pointer-events-none z-30 transition-all duration-1000 ease-out"
      style={{
        left: isAnimating ? `${targetX}px` : `${startX}px`,
        top: isAnimating ? `${targetY}px` : `${startY}px`,
        opacity: isAnimating ? 0 : 1,
        transform: isAnimating ? 'scale(0.3)' : 'scale(1)',
      }}
    >
      <div className="w-full h-full rounded-full border-2 border-yellow-700/30" />
    </div>
  );
};
