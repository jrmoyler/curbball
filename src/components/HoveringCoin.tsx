import { Coins } from "lucide-react";

interface HoveringCoinProps {
  position: number; // 0-100 percentage
  value: number;
  collected?: boolean;
}

export const HoveringCoin = ({ position, value, collected }: HoveringCoinProps) => {
  return (
    <div
      className={`absolute top-8 transition-all duration-300 ${
        collected ? 'opacity-0 scale-150' : 'opacity-100 scale-100'
      }`}
      style={{
        left: `${position}%`,
        transform: 'translateX(-50%)',
      }}
    >
      <div className="relative animate-bounce">
        <div className="absolute inset-0 bg-yellow-400 rounded-full blur-md opacity-50" />
        <div className="relative w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full border-3 border-yellow-700 shadow-lg flex items-center justify-center">
          <Coins className="w-6 h-6 text-yellow-900" />
          {value > 5 && (
            <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
              {value}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
