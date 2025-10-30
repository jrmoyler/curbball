import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";
import { fbInstant } from "@/lib/fbInstantManager";
import { useToast } from "@/hooks/use-toast";

interface RewardedAdButtonProps {
  onRewardEarned: (coins: number) => void;
}

export const RewardedAdButton = ({ onRewardEarned }: RewardedAdButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const rewardAmount = 50; // Coins earned per ad

  const handleWatchAd = async () => {
    if (!fbInstant.isFBInstant()) {
      // Fallback for web testing - just give coins
      onRewardEarned(rewardAmount);
      toast({
        title: "Coins Earned!",
        description: `You earned ${rewardAmount} coins! (Demo mode)`,
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await fbInstant.showRewardedVideoAsync();
      
      if (success) {
        onRewardEarned(rewardAmount);
        toast({
          title: "Reward Earned!",
          description: `You earned ${rewardAmount} coins for watching the ad!`,
        });
      } else {
        toast({
          title: "Ad Not Available",
          description: "No ads available right now. Try again later!",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error showing rewarded ad:', error);
      toast({
        title: "Error",
        description: "Failed to load ad. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleWatchAd}
      disabled={isLoading}
      className="gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold shadow-lg"
    >
      <Gift className="w-5 h-5" />
      {isLoading ? "Loading Ad..." : `Watch Ad for ${rewardAmount} Coins`}
    </Button>
  );
};
