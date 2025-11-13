import { useState, useEffect } from "react";
import { GameCanvas, Difficulty } from "@/components/GameCanvas";
import { DifficultySelection } from "@/components/DifficultySelection";
import { FBInstantLoading } from "@/components/FBInstantLoading";
import { BackdropShop, Backdrop } from "@/components/BackdropShop";
import { fbInstant } from "@/lib/fbInstantManager";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [showShop, setShowShop] = useState(false);
  const [currentCoins, setCurrentCoins] = useState(0);
  const [ownedBackdrops, setOwnedBackdrops] = useState<string[]>(["default"]);
  const [currentBackdrop, setCurrentBackdrop] = useState("default");

  useEffect(() => {
    const initializeFBInstant = async () => {
      try {
        // Initialize FBInstant SDK
        await fbInstant.initializeAsync();
        
        // Simulate loading progress
        const progressInterval = setInterval(() => {
          setLoadingProgress((prev) => {
            const next = prev + 10;
            fbInstant.setLoadingProgress(next);
            
            if (next >= 100) {
              clearInterval(progressInterval);
            }
            return next;
          });
        }, 100);

        // Wait for loading to complete
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        // Start the game
        await fbInstant.startGameAsync();
        
        // Load backdrop data
        const data = await fbInstant.getPlayerDataAsync([
          'ownedBackdrops', 
          'currentBackdrop',
          'coins_easy',
          'coins_medium', 
          'coins_hard'
        ]);
        if (data.ownedBackdrops) {
          setOwnedBackdrops(data.ownedBackdrops);
        }
        if (data.currentBackdrop) {
          setCurrentBackdrop(data.currentBackdrop);
        }
        // Load coins from all difficulties (use easy as default)
        const totalCoins = (data.coins_easy || 0) + (data.coins_medium || 0) + (data.coins_hard || 0);
        setCurrentCoins(totalCoins);
        
        setIsLoading(false);
      } catch (error) {
        console.error('FBInstant initialization error:', error);
        // Continue to game even if FBInstant fails (web fallback)
        // Load from localStorage
        const savedBackdrops = localStorage.getItem('ownedBackdrops');
        const savedCurrent = localStorage.getItem('currentBackdrop');
        const coinsEasy = parseInt(localStorage.getItem('game-coins-easy') || '0');
        const coinsMedium = parseInt(localStorage.getItem('game-coins-medium') || '0');
        const coinsHard = parseInt(localStorage.getItem('game-coins-hard') || '0');
        
        if (savedBackdrops) setOwnedBackdrops(JSON.parse(savedBackdrops));
        if (savedCurrent) setCurrentBackdrop(savedCurrent);
        setCurrentCoins(coinsEasy + coinsMedium + coinsHard);
        setIsLoading(false);
      }
    };

    initializeFBInstant();
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <FBInstantLoading onComplete={handleLoadingComplete} />;
  }

  const handlePurchaseWithCoins = (backdrop: Backdrop) => {
    const newOwned = [...ownedBackdrops, backdrop.id];
    setOwnedBackdrops(newOwned);
    setCurrentCoins(prev => prev - backdrop.coinPrice);
    setCurrentBackdrop(backdrop.id);
    
    // Save to storage
    localStorage.setItem('ownedBackdrops', JSON.stringify(newOwned));
    localStorage.setItem('currentBackdrop', backdrop.id);
    if (fbInstant.isFBInstant()) {
      fbInstant.setPlayerDataAsync({ ownedBackdrops: newOwned, currentBackdrop: backdrop.id });
    }
  };

  const handlePurchaseWithMoney = (backdrop: Backdrop) => {
    const newOwned = [...ownedBackdrops, backdrop.id];
    setOwnedBackdrops(newOwned);
    setCurrentBackdrop(backdrop.id);
    
    // Save to storage
    localStorage.setItem('ownedBackdrops', JSON.stringify(newOwned));
    localStorage.setItem('currentBackdrop', backdrop.id);
    if (fbInstant.isFBInstant()) {
      fbInstant.setPlayerDataAsync({ ownedBackdrops: newOwned, currentBackdrop: backdrop.id });
    }
  };

  const handleSelectBackdrop = (backdropId: string) => {
    setCurrentBackdrop(backdropId);
    localStorage.setItem('currentBackdrop', backdropId);
    if (fbInstant.isFBInstant()) {
      fbInstant.setPlayerDataAsync({ currentBackdrop: backdropId });
    }
  };

  if (!difficulty) {
    return (
      <>
        <DifficultySelection 
          onSelectDifficulty={setDifficulty} 
          onOpenShop={() => setShowShop(true)}
        />
        {showShop && (
          <BackdropShop
            onClose={() => setShowShop(false)}
            currentCoins={currentCoins}
            onPurchaseWithCoins={handlePurchaseWithCoins}
            onPurchaseWithMoney={handlePurchaseWithMoney}
            ownedBackdrops={ownedBackdrops}
            onSelectBackdrop={handleSelectBackdrop}
            currentBackdrop={currentBackdrop}
          />
        )}
      </>
    );
  }

  const handleBackToDifficulty = () => {
    setDifficulty(null);
  };

  const handleCoinsUpdate = (newCoins: number) => {
    setCurrentCoins(newCoins);
  };

  return (
    <div className="w-full h-screen bg-background">
      <GameCanvas 
        difficulty={difficulty} 
        onBackToDifficulty={handleBackToDifficulty}
        backdropImage={currentBackdrop}
        onCoinsChange={handleCoinsUpdate}
      />
    </div>
  );
};

export default Index;
