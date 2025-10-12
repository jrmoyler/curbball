import { Coins } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CoinDisplayProps {
  coins: number;
}

export const CoinDisplay = ({ coins }: CoinDisplayProps) => {
  return (
    <Card className="px-4 py-2 bg-card/95 backdrop-blur-md border-2 border-yellow-500/50 shadow-lg">
      <div className="flex items-center gap-2">
        <Coins className="w-6 h-6 text-yellow-500" />
        <div className="text-center">
          <div className="text-xs text-muted-foreground font-semibold">COINS</div>
          <div className="text-2xl font-bold text-yellow-500">{coins}</div>
        </div>
      </div>
    </Card>
  );
};
