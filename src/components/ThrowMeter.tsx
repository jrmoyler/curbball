import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

interface ThrowMeterProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export const ThrowMeter = ({ value, onChange, disabled }: ThrowMeterProps) => {
  const getPowerColor = (power: number) => {
    if (power >= 60 && power <= 80) return "hsl(var(--game-success))";
    if (power < 40 || power > 90) return "hsl(var(--game-danger))";
    return "hsl(var(--game-warning))";
  };

  const getPowerLabel = (power: number) => {
    if (power >= 60 && power <= 80) return "PERFECT!";
    if (power < 40) return "TOO WEAK";
    if (power > 90) return "TOO STRONG";
    return "GOOD";
  };

  const isInSweetSpot = value >= 60 && value <= 80;

  return (
    <Card className={`p-6 w-96 bg-card/95 backdrop-blur-md border-2 border-primary shadow-lg ${isInSweetSpot ? 'animate-pulse-glow' : ''}`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-foreground uppercase tracking-wider">⚡ Throw Power</span>
          <span
            className="text-sm font-black px-4 py-1.5 rounded-md uppercase tracking-wide transition-all duration-300"
            style={{
              backgroundColor: getPowerColor(value),
              color: "white",
              boxShadow: `0 0 20px ${getPowerColor(value)}40`,
            }}
          >
            {getPowerLabel(value)}
          </span>
        </div>
        
        {/* Visual Power Bar with Zones */}
        <div className="relative h-16 bg-muted/30 rounded-lg overflow-hidden border border-border">
          {/* Zone indicators */}
          <div className="absolute inset-0 flex">
            <div className="w-[40%] bg-destructive/20 border-r border-destructive/30" />
            <div className="w-[20%] bg-accent/20 border-r border-accent/30" />
            <div className="w-[20%] bg-green-500/20 border-r border-green-500/50" />
            <div className="w-[10%] bg-accent/20 border-r border-accent/30" />
            <div className="w-[10%] bg-destructive/20" />
          </div>
          
          {/* Power fill */}
          <div
            className="absolute inset-y-0 left-0 transition-all duration-200 ease-out"
            style={{
              width: `${value}%`,
              background: `linear-gradient(90deg, ${getPowerColor(value)}, ${getPowerColor(value)}dd)`,
              boxShadow: isInSweetSpot ? `0 0 15px ${getPowerColor(value)}` : 'none',
            }}
          />
          
          {/* Sweet spot indicator */}
          <div className="absolute left-[60%] right-[20%] inset-y-0 border-x-2 border-green-500/60 pointer-events-none flex items-center justify-center">
            <span className="text-xs font-bold text-green-400 bg-background/80 px-2 py-0.5 rounded">SWEET SPOT</span>
          </div>
        </div>
        
        {/* Slider */}
        <div className="relative">
          <Slider
            value={[value]}
            onValueChange={(vals) => onChange(vals[0])}
            min={0}
            max={100}
            step={1}
            disabled={disabled}
            className="w-full"
          />
          
          {/* Zone labels */}
          <div className="flex justify-between text-xs text-muted-foreground font-semibold mt-2">
            <span>0</span>
            <span className="text-destructive">40</span>
            <span className="text-green-500 font-bold">60</span>
            <span className="text-green-500 font-bold">80</span>
            <span className="text-destructive">90</span>
            <span>100</span>
          </div>
        </div>
        
        {/* Large numeric display */}
        <div className="text-center">
          <div 
            className={`text-6xl font-black transition-all duration-300 ${isInSweetSpot ? 'scale-110' : ''}`}
            style={{ 
              color: getPowerColor(value),
              textShadow: isInSweetSpot ? `0 0 20px ${getPowerColor(value)}80` : 'none',
            }}
          >
            {value}
          </div>
          <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Power Level</div>
        </div>
      </div>
    </Card>
  );
};
