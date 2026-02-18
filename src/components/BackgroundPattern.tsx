const BackgroundPattern = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Soft gradient orbs */}
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      
      {/* Floating shapes */}
      <div className="absolute top-1/4 left-10 w-4 h-4 bg-primary/10 rounded-full animate-pulse" />
      <div className="absolute top-1/3 right-20 w-3 h-3 bg-accent/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-primary/15 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
};

export default BackgroundPattern;
