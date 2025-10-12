import { useEffect, useState } from "react";
import { Coins } from "lucide-react";

interface FloatingCoinsProps {
  amount: number;
  onComplete?: () => void;
}

export const FloatingCoins = ({ amount, onComplete }: FloatingCoinsProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide after animation completes
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30">
      <div className="animate-float-up-fade">
        <div className="flex items-center gap-2 bg-yellow-500/90 text-white px-4 py-2 rounded-full shadow-lg border-2 border-yellow-600">
          <Coins className="w-6 h-6" />
          <span className="text-2xl font-bold">+{amount}</span>
        </div>
      </div>
    </div>
  );
};
