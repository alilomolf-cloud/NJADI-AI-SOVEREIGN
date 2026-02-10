
import React from 'react';

interface WolfGraphicProps {
  active: boolean;
  size?: number;
  className?: string;
}

const WolfGraphic: React.FC<WolfGraphicProps> = ({ active, size = 120, className = "" }) => {
  return (
    <div 
      className={`relative transition-all duration-1000 ease-in-out pointer-events-none ${active ? 'opacity-40 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-12'} ${className}`}
      style={{ width: size, height: size }}
    >
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full drop-shadow-[0_0_15px_var(--glow-theme)]"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Geometric Wolf Head Silhouette */}
        <path 
          d="M50 10L35 30L20 25L30 45L15 65L30 60L50 90L70 60L85 65L70 45L80 25L65 30L50 10Z" 
          fill="currentColor" 
          className="text-white opacity-20"
        />
        <path 
          d="M50 15L38 32L25 28L33 46L20 63L33 58L50 85L67 58L80 63L67 46L75 28L62 32L50 15Z" 
          stroke="var(--primary-theme)" 
          strokeWidth="0.5"
          className="animate-pulse"
        />
        
        {/* Glowing Eyes - Now following primary theme color */}
        <circle cx="42" cy="45" r="1.5" fill="var(--primary-theme)" className={`${active ? 'animate-pulse' : ''}`}>
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="58" cy="45" r="1.5" fill="var(--primary-theme)" className={`${active ? 'animate-pulse' : ''}`}>
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Breathing Aura */}
        <path 
          d="M50 5L30 25L10 20L25 45L5 70L25 65L50 95L75 65L95 70L75 45L90 20L70 25L50 5Z" 
          stroke="var(--primary-theme)" 
          strokeWidth="0.2" 
          opacity="0.3"
        >
          <animate attributeName="stroke-width" values="0.1;0.5;0.1" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.1;0.4;0.1" dur="4s" repeatCount="indefinite" />
        </path>
      </svg>
    </div>
  );
};

export default WolfGraphic;
