import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ShareButtonProps {
  score: number;
  coins: number;
}

export const ShareButton = ({ score, coins }: ShareButtonProps) => {
  const handleShare = async () => {
    const shareData = {
      title: 'Curb Ball',
      text: `I just scored ${score} points and earned ${coins} coins in Curb Ball! Can you beat my score?`,
      url: window.location.href,
    };

    // Check if Web Share API is available
    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
        toast({
          title: "Shared!",
          description: "Your score has been shared",
        });
      } catch (error) {
        // User cancelled or share failed
        if ((error as Error).name !== 'AbortError') {
          console.error('Share failed:', error);
          fallbackShare(shareData.text);
        }
      }
    } else {
      // Fallback for browsers without Web Share API
      fallbackShare(shareData.text);
    }
  };

  const fallbackShare = (text: string) => {
    // Copy to clipboard as fallback
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard!",
        description: "Share your score by pasting it anywhere",
      });
    }).catch(() => {
      toast({
        title: "Share unavailable",
        description: "Could not share at this time",
        variant: "destructive",
      });
    });
  };

  return (
    <Button
      onClick={handleShare}
      variant="outline"
      className="gap-2"
    >
      <Share2 className="h-4 w-4" />
      Share Score
    </Button>
  );
};
