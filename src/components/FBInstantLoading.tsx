import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

interface FBInstantLoadingProps {
  onComplete: () => void;
}

export const FBInstantLoading = ({ onComplete }: FBInstantLoadingProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-sky-400 to-sky-600 flex items-center justify-center z-50">
      <div className="text-center space-y-6 px-8 max-w-md">
        <h1 className="text-5xl font-bold text-white drop-shadow-lg">
          Curb Ball
        </h1>
        <p className="text-xl text-white/90">
          Challenge
        </p>
        
        <div className="space-y-3 mt-8">
          <Progress value={progress} className="h-3 bg-white/30" />
          <p className="text-white/80 text-sm">
            Loading... {progress}%
          </p>
        </div>

        <div className="text-white/70 text-xs mt-8">
          🎯 Aim carefully and throw the ball across the street!
        </div>
      </div>
    </div>
  );
};
