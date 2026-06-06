import { Cpu, Cloud, Database, Lock } from "lucide-react";

export default function NetworkBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      
      {/* 1. Faded Office Background Insets */}
      {/* Left Office Margin */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1/4 mix-blend-overlay opacity-30"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "left center",
          filter: "grayscale(100%) blur(8px)",
          WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)"
        }}
      />
      {/* Right Office Margin */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-1/4 mix-blend-overlay opacity-30"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1000&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "right center",
          filter: "grayscale(100%) blur(8px)",
          WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)"
        }}
      />

      {/* 2. Central Data Node Stream & Network Constellation */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* SVG Canvas for connecting lines and nodes */}
        <svg 
          className="w-full h-full max-w-[1400px]" 
          viewBox="0 0 1000 600" 
          preserveAspectRatio="xMidYMid slice"
          style={{ filter: "drop-shadow(0 0 8px rgba(0, 229, 255, 0.4))" }}
        >
          {/* Defs for gradients and glow filters */}
          <defs>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="1" />
              <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Network Connection Lines (Soft white/cyan, thin strokes, low opacity) */}
          <g stroke="#ffffff" strokeWidth="1" strokeOpacity="0.25" fill="none">
            {/* Curved paths connecting major nodes */}
            <path d="M200,300 Q350,200 500,250 T800,200" />
            <path d="M200,300 Q300,450 500,250 T750,450" />
            <path d="M500,250 Q600,100 800,200" />
            <path d="M500,250 Q600,400 750,450" />
            
            {/* Additional branch lines */}
            <path d="M350,235 L300,150" />
            <path d="M650,225 L750,120" />
            <path d="M380,360 L250,450" />
            <path d="M620,310 L700,380" />
          </g>

          {/* Particle Nodes at Intersections */}
          <g fill="#00E5FF">
            {/* Core Center Node */}
            <circle cx="500" cy="250" r="4" fill="url(#nodeGlow)" />
            <circle cx="500" cy="250" r="2" fill="#fff" />
            
            {/* Surrounding Nodes */}
            <circle cx="200" cy="300" r="3" fill="url(#nodeGlow)" />
            <circle cx="350" cy="235" r="2" fill="url(#nodeGlow)" />
            <circle cx="800" cy="200" r="3" fill="url(#nodeGlow)" />
            <circle cx="750" cy="450" r="3" fill="url(#nodeGlow)" />
            <circle cx="380" cy="360" r="2" fill="url(#nodeGlow)" />
            <circle cx="620" cy="310" r="2" fill="url(#nodeGlow)" />
          </g>
        </svg>

        {/* 3. High-Tech Graphic Asset & Icon Overlays */}
        {/* We use absolute positioning relative to this central container to align with the SVG nodes */}
        <div className="absolute w-full max-w-[1400px] h-[600px] pointer-events-none">
          
          {/* Top Center/Right: AI Core */}
          <div className="absolute top-[35%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="p-3 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm shadow-[0_0_15px_rgba(0,229,255,0.3)]">
              <Cpu className="w-8 h-8 text-[#00E5FF]" />
            </div>
            <span className="mt-2 text-[10px] font-mono tracking-widest text-white/70">AI_CORE</span>
          </div>

          {/* Mid-Left: Cloud Data Network */}
          <div className="absolute top-[50%] left-[20%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="p-2.5 rounded-lg border border-[#00E5FF]/30 bg-[#00E5FF]/5 backdrop-blur-sm shadow-[0_0_10px_rgba(0,229,255,0.2)]">
              <Cloud className="w-7 h-7 text-white" />
            </div>
            <span className="mt-2 text-[10px] font-mono tracking-widest text-[#00E5FF]/80">SYS_NET</span>
          </div>

          {/* Mid-Right: Cybersecurity Padlock */}
          <div className="absolute top-[33%] left-[80%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="p-2 rounded-md border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_0_8px_rgba(255,255,255,0.2)]">
              <Lock className="w-5 h-5 text-white/90" />
            </div>
            <span className="mt-1.5 text-[9px] font-mono tracking-widest text-white/50">SECURE</span>
          </div>

          {/* Lower Left: Cybersecurity Padlock 2 */}
          <div className="absolute top-[75%] left-[25%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="p-2 rounded-md border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_0_8px_rgba(255,255,255,0.2)]">
              <Lock className="w-5 h-5 text-white/90" />
            </div>
          </div>

          {/* Top-Far Right: Database Array */}
          <div className="absolute top-[20%] left-[75%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="p-2.5 rounded-lg border border-[#00E5FF]/20 bg-[#00E5FF]/5 backdrop-blur-sm shadow-[0_0_12px_rgba(0,229,255,0.15)]">
              <Database className="w-6 h-6 text-white" />
            </div>
            <span className="mt-2 text-[10px] font-mono tracking-widest text-[#00E5FF]/80">DB_SYNC</span>
          </div>

        </div>
      </div>
    </div>
  );
}
