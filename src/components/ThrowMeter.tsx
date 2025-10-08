import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

interface ThrowMeterProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export const ThrowMeter = ({ value, onChange, disabled }: ThrowMeterProps) => {
  const getPowerColor = (power: number) => {
    if (power >= 60 && power <= 80) return "hsl(142 76% 36%)"; // Sweet spot - green
    if (power < 40 || power > 90) return "hsl(0 84% 60%)"; // Too weak/strong - red
    return "hsl(45 100% 54%)"; // OK - yellow
  };

  const getPowerLabel = (power: number) => {
    if (power >= 60 && power <= 80) return "PERFECT!";
    if (power < 40) return "TOO WEAK";
    if (power > 90) return "TOO STRONG";
    return "GOOD";
  };

  return (
    <Card className="p-4 w-80 bg-card/90 backdrop-blur-sm border-2 border-primary">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-foreground">THROW POWER</span>
          <span
            className="text-lg font-bold px-3 py-1 rounded"
            style={{
              backgroundColor: getPowerColor(value),
              color: "white",
            }}
          >
            {getPowerLabel(value)}
          </span>
        </div>
        
        <Slider
          value={[value]}
          onValueChange={(vals) => onChange(vals[0])}
          min={0}
          max={100}
          step={1}
          disabled={disabled}
          className="w-full"
        />
        
        <div className="flex justify-between text-xs text-muted-foreground font-semibold">
          <span>0</span>
          <span className="text-accent">60-80 SWEET SPOT</span>
          <span>100</span>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold" style={{ color: getPowerColor(value) }}>
            {value}
          </div>
        </div>
      </div>
    </Card>
  );
};
