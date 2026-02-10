
import React, { useState, useRef, useEffect } from 'react';
import { generateAIChat } from '../services/geminiService';
import { ChatMessage, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import WolfGraphic from './WolfGraphic';

interface AIOrbProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  language: Language;
}

const AIOrb: React.FC<AIOrbProps> = ({ isOpen, setIsOpen, language }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const [pos, setPos] = useState({ x: 20, y: window.innerHeight - 100 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      const response = await generateAIChat(userMsg, history);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "Ghalta fel connexion... Smahli!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const onStart = (e: any) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    dragStartPos.current = { x: clientX, y: clientY };
    setIsDragging(true);
    hasMoved.current = false;
  };

  const onMove = (e: any) => {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    // Check if it's a real move or just a tap
    if (Math.abs(clientX - dragStartPos.current.x) > 5 || Math.abs(clientY - dragStartPos.current.y) > 5) {
      hasMoved.current = true;
    }

    setPos({ x: clientX - 28, y: clientY - 28 });
  };

  const onEnd = () => {
    setIsDragging(false);
  };

  const handleOrbClick = (e: React.MouseEvent | React.TouchEvent) => {
    if (!hasMoved.current) {
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onEnd);
      window.addEventListener('touchmove', onMove);
      window.addEventListener('touchend', onEnd);
    } else {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
    }
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [isDragging]);

  const stars = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    duration: `${2 + Math.random() * 4}s`,
    size: `${1 + Math.random() * 2}px`
  }));

  return (
    <>
      <div 
        className="fixed z-50 cursor-pointer touch-none group"
        style={{ left: pos.x, top: pos.y }}
        onMouseDown={onStart}
        onTouchStart={onStart}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleOrbClick}
      >
        <WolfGraphic 
          active={isHovered || isLoading} 
          size={120} 
          className="absolute -top-12 -left-8" 
        />

        <div 
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${isOpen ? 'rotate-90 scale-0' : 'scale-100'}`}
          style={{ 
            background: `linear-gradient(to top right, var(--secondary-theme), var(--primary-theme))`,
            boxShadow: (isHovered || isLoading) ? `0 0 30px var(--glow-theme)` : `0 0 20px var(--glow-theme)`
          }}
        >
          <i className="fa-solid fa-wand-magic-sparkles text-white text-xl"></i>
          {isLoading && (
            <div className="absolute inset-0 rounded-full border-2 border-white animate-ping opacity-20"></div>
          )}
        </div>
      </div>

      <div 
        className={`fixed inset-0 z-40 star-curtain transition-transform duration-700 ease-in-out flex flex-col ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}
      >
        {stars.map(star => (
          <div 
            key={star.id} 
            className="star" 
            style={{ 
              top: star.top, 
              left: star.left, 
              width: star.size, 
              height: star.size, 
              '--duration': star.duration 
            } as any}
          ></div>
        ))}

        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <WolfGraphic active={isOpen} size={500} />
        </div>

        <div className="relative z-10 p-6 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
             <div 
               className="w-10 h-10 rounded-full flex items-center justify-center border"
               style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'var(--primary-theme)' }}
             >
                <i className="fa-solid fa-ghost" style={{ color: 'var(--primary-theme)' }}></i>
             </div>
             <div>
                <h3 className="text-white font-bold">Usra AI</h3>
                <p className="text-xs tracking-widest uppercase opacity-60" style={{ color: 'var(--primary-theme)' }}>Ali Ould Njadi Edition</p>
             </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center px-8 opacity-50">
              <i className="fa-solid fa-moon text-4xl mb-4" style={{ color: 'var(--primary-theme)' }}></i>
              <p className="text-white text-lg">{TRANSLATIONS[language].aiPrompt}</p>
            </div>
          )}
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[80%] p-4 rounded-2xl ${m.role === 'user' ? 'text-white rounded-tr-none shadow-lg' : 'bg-white/10 text-gray-100 rounded-tl-none border border-white/5 backdrop-blur-md'}`}
                style={m.role === 'user' ? { backgroundColor: 'var(--primary-theme)' } : {}}
              >
                {m.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="bg-white/10 p-4 rounded-2xl flex items-center gap-2" style={{ color: 'var(--primary-theme)' }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center border border-current animate-spin">
                    <i className="fa-solid fa-spinner text-[10px]"></i>
                  </div>
                  <span className="text-xs font-mono tracking-widest uppercase">Usra is thinking...</span>
               </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="p-4 bg-black/40 backdrop-blur-xl border-t border-white/10 pb-10">
          <div className="flex gap-2 items-center bg-white/5 p-1 rounded-full border border-white/10 focus-within:border-white/20 transition-all">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Saksini ay haja..."
              className="flex-1 bg-transparent border-none outline-none text-white px-4 py-3 placeholder:text-gray-500"
            />
            <button 
              onClick={handleSend}
              className="w-12 h-12 rounded-full text-white flex items-center justify-center shadow-lg active:scale-90 transition-all"
              style={{ backgroundColor: 'var(--primary-theme)' }}
            >
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIOrb;
