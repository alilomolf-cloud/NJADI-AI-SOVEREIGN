
import React, { useEffect, useState } from 'react';

interface SplashProps {
  onFinish: () => void;
}

const Splash: React.FC<SplashProps> = ({ onFinish }) => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(0);
      setTimeout(onFinish, 1000);
    }, 4000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-1000"
      style={{ opacity }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1557008075-0f230d09e88a?auto=format&fit=crop&q=80&w=2000" 
          alt="Wolf"
          className="w-full h-full object-cover scale-110 blur-[2px] opacity-60"
        />
        <div className="fog-layer"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      <div className="relative z-20 text-center px-6">
        <div className="w-32 h-32 mb-8 mx-auto relative">
           <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
           <div className="relative border-4 border-white/20 rounded-full p-2 flex items-center justify-center">
              <span className="text-6xl font-black text-white italic tracking-tighter">F</span>
           </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-widest uppercase mb-2">NJADI™</h1>
        <p className="text-blue-400 font-mono tracking-widest text-sm uppercase opacity-80">Algerian Soul • AI Driven</p>
      </div>

      <div className="absolute bottom-12 left-0 right-0 flex justify-center">
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 animate-[loading_3.5s_ease-in-out_forwards]"></div>
        </div>
      </div>

      <style>{`
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Splash;
