export const ConfettiEffect = () => {
  const colors = [
    "hsl(var(--primary))",
    "hsl(var(--accent))",
    "hsl(var(--secondary))",
    "hsl(142 76% 36%)",
    "hsl(280 100% 70%)",
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(100)].map((_, i) => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomLeft = Math.random() * 100;
        const randomDelay = Math.random() * 2;
        const randomDuration = 2 + Math.random() * 2;
        const randomRotation = Math.random() * 360;

        return (
          <div
            key={i}
            className="absolute w-3 h-3 animate-confetti-fall"
            style={{
              backgroundColor: randomColor,
              left: `${randomLeft}%`,
              top: "-20px",
              animationDelay: `${randomDelay}s`,
              animationDuration: `${randomDuration}s`,
              transform: `rotate(${randomRotation}deg)`,
              borderRadius: Math.random() > 0.5 ? "50%" : "0",
            }}
          />
        );
      })}
    </div>
  );
};
