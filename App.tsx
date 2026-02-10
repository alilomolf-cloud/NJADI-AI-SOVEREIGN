
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Splash from './components/Splash';
import AIOrb from './components/AIOrb';
import { Language, ThemeMode, ThemePalette } from './types';
import { TRANSLATIONS, MOCK_USER_AGENTS, THEME_PALETTES } from './constants';
import { playGreeting } from './services/geminiService';

const App: React.FC = () => {
  const [isSplashActive, setIsSplashActive] = useState(true);
  const [hasApiKey, setHasApiKey] = useState<boolean | null>(null);
  const [isAppLaunched, setIsAppLaunched] = useState(false);
  const [language, setLanguage] = useState<Language>(Language.AR);
  const [themeMode, setThemeMode] = useState<ThemeMode>(ThemeMode.CHAMELEON);
  const [customPalette, setCustomPalette] = useState<ThemePalette>({
    id: 'custom',
    primary: '#ffffff',
    secondary: '#888888',
    accent: '#cccccc',
    glow: 'rgba(255, 255, 255, 0.5)'
  });
  const [currentPalette, setCurrentPalette] = useState<ThemePalette>(THEME_PALETTES[ThemeMode.MOONLIGHT]);
  const [showAI, setShowAI] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [bridgeKey, setBridgeKey] = useState(Date.now()); 
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Check for API Key status
  useEffect(() => {
    const checkKey = async () => {
      try {
        const selected = await (window as any).aistudio.hasSelectedApiKey();
        setHasApiKey(selected);
      } catch (e) {
        setHasApiKey(false);
      }
    };
    if (!isSplashActive) {
      checkKey();
    }
  }, [isSplashActive]);

  // Apply Theme CSS Variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary-theme', currentPalette.primary);
    root.style.setProperty('--secondary-theme', currentPalette.secondary);
    root.style.setProperty('--accent-theme', currentPalette.accent);
    root.style.setProperty('--glow-theme', currentPalette.glow);
  }, [currentPalette]);

  // Chameleon Engine
  useEffect(() => {
    if (themeMode !== ThemeMode.CHAMELEON) {
      setCurrentPalette(themeMode === ThemeMode.CUSTOM ? customPalette : THEME_PALETTES[themeMode]);
      return;
    }
    const paletteList = Object.values(THEME_PALETTES);
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % paletteList.length;
      setCurrentPalette(paletteList[index]);
    }, 5000);
    return () => clearInterval(interval);
  }, [themeMode, customPalette]);

  const handleSplashFinish = useCallback(() => setIsSplashActive(false), []);

  const handleActivateKey = async () => {
    try {
      await (window as any).aistudio.openSelectKey();
      setHasApiKey(true);
    } catch (e) {
      console.error("Key selection failed", e);
    }
  };

  const handleLaunch = () => {
    setIsAppLaunched(true);
    playGreeting(TRANSLATIONS[language].greetingText);
  };

  const refreshBridge = () => setBridgeKey(Date.now());

  const updateCustomColor = (color: string) => {
    setCustomPalette({ ...customPalette, primary: color, glow: `${color}80` });
    setThemeMode(ThemeMode.CUSTOM);
  };

  if (isSplashActive) return <Splash onFinish={handleSplashFinish} />;

  // API Key Activation Screen
  if (hasApiKey === false) {
    return (
      <div className="fixed inset-0 z-[110] bg-black flex flex-col items-center justify-center p-8">
        <div className="absolute inset-0 opacity-30">
          <img src="https://images.unsplash.com/photo-1557008075-0f230d09e88a?auto=format&fit=crop&q=80&w=2000" alt="Wolf" className="w-full h-full object-cover" />
          <div className="fog-layer"></div>
        </div>
        <div className="relative z-10 text-center max-w-md animate-in zoom-in duration-700">
          <div className="w-24 h-24 rounded-full border-2 border-blue-500/50 flex items-center justify-center mb-8 mx-auto shadow-[0_0_40px_rgba(59,130,246,0.3)]">
            <i className="fa-solid fa-shield-halved text-blue-500 text-3xl animate-pulse"></i>
          </div>
          <h2 className="text-white text-2xl font-black tracking-widest uppercase mb-4">Secure Activation</h2>
          <p className="text-gray-400 text-sm mb-10 leading-relaxed">
            {language === Language.AR 
              ? "يرجى ربط مفتاح API لتشغيل محرك Usra AI والوصول إلى واجهة F NJADI الفاخرة."
              : "Please link an API key to initialize Usra AI engine and access F NJADI's elite interface."}
          </p>
          <button onClick={handleActivateKey} className="w-full py-5 rounded-2xl bg-blue-600 text-white font-black tracking-widest uppercase shadow-xl active:scale-95 transition-all">
            {language === Language.AR ? "تفعيل الترخيص" : "ACTIVATE LICENSE"}
          </button>
          <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="block mt-6 text-gray-600 text-[10px] uppercase tracking-widest">Docs & Billing</a>
        </div>
      </div>
    );
  }

  // Pre-Launch Gate
  if (hasApiKey === true && !isAppLaunched) {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
        <div className="absolute inset-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1557008075-0f230d09e88a?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" />
          <div className="fog-layer"></div>
        </div>
        <div className="relative z-10 text-center">
          <h2 className="text-white text-4xl font-black tracking-[0.3em] uppercase mb-2">F NJADI™</h2>
          <p className="text-blue-500 text-[10px] tracking-[0.6em] uppercase mb-16 opacity-60">System Ready</p>
          <button onClick={handleLaunch} className="group flex flex-col items-center gap-6">
            <div className="w-32 h-32 rounded-full border-2 flex items-center justify-center transition-all duration-700" style={{ borderColor: 'var(--primary-theme)', boxShadow: '0 0 50px var(--glow-theme)' }}>
              <i className="fa-solid fa-power-off text-white text-4xl group-hover:scale-125 transition-transform"></i>
            </div>
            <span className="text-white text-xl font-bold tracking-widest uppercase">{language === Language.AR ? "دخول" : "ENTER"}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col">
      {/* Chameleon Border */}
      <div className="absolute inset-0 pointer-events-none z-30 transition-all duration-1000 border-[2px]" style={{ borderColor: 'var(--primary-theme)', boxShadow: 'inset 0 0 15px var(--glow-theme)' }}></div>

      {/* Header */}
      <div className="relative z-40 h-14 bg-black/90 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button onClick={() => setShowSettings(true)} className="text-white p-2"><i className="fa-solid fa-sliders"></i></button>
          <span className="text-xl font-black tracking-tighter text-white italic">F <span style={{ color: 'var(--primary-theme)' }}>NJADI</span></span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={refreshBridge} className="w-9 h-9 rounded-full bg-white/5 text-white flex items-center justify-center"><i className="fa-solid fa-rotate-right text-xs"></i></button>
          <div className="w-9 h-9 rounded-full bg-white/5 text-white flex items-center justify-center relative"><i className="fa-solid fa-bell text-xs"></i><span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span></div>
        </div>
      </div>

      {/* Main Bridge */}
      <div className="flex-1 relative bg-black">
        <iframe key={bridgeKey} ref={iframeRef} src={`https://m.facebook.com?_f_njadi=${bridgeKey}`} className="w-full h-full border-none" allow="camera; microphone; geolocation" />
        <button className="absolute bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-black/80 backdrop-blur-xl border border-white/20 text-white flex flex-col items-center justify-center shadow-2xl" style={{ borderColor: 'var(--primary-theme)', boxShadow: `0 10px 30px rgba(0,0,0,0.5), 0 0 20px var(--glow-theme)` }}>
          <i className="fa-solid fa-download text-lg mb-1"></i>
          <span className="text-[7px] font-black uppercase">Media</span>
        </button>
      </div>

      {/* Bottom Nav */}
      <div className="relative z-40 h-16 bg-black border-t border-white/5 flex items-center justify-around pb-1">
         <NavBtn icon="fa-house-chimney" active onClick={refreshBridge} />
         <NavBtn icon="fa-users" />
         <NavBtn icon="fa-comment-dots" badge="9+" />
         <NavBtn icon="fa-bag-shopping" />
         <NavBtn icon="fa-bars-staggered" onClick={() => setShowSettings(true)} />
      </div>

      {/* Settings Overlay */}
      {showSettings && (
        <div className="absolute inset-0 z-[70] bg-black/95 backdrop-blur-2xl p-8 overflow-y-auto animate-in slide-in-from-bottom duration-500">
           <div className="flex justify-between items-center mb-12">
              <h2 className="text-white text-2xl font-black">CONFIG <span style={{ color: 'var(--primary-theme)' }}>PANEL</span></h2>
              <button onClick={() => setShowSettings(false)} className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center"><i className="fa-solid fa-xmark"></i></button>
           </div>
           
           <div className="space-y-10">
              <section>
                <h3 className="text-gray-500 text-[10px] uppercase tracking-widest mb-6">Visual Theme</h3>
                <div className="grid grid-cols-2 gap-4">
                  <ThemeOption label="Chameleon" active={themeMode === ThemeMode.CHAMELEON} onClick={() => setThemeMode(ThemeMode.CHAMELEON)} gradient="linear-gradient(45deg, #3b82f6, #10b981, #f59e0b, #8b5cf6)" />
                  <div className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 ${themeMode === ThemeMode.CUSTOM ? 'border-white bg-white/10' : 'border-white/5'}`}>
                    <input type="color" value={customPalette.primary} onChange={(e) => updateCustomColor(e.target.value)} className="w-10 h-10 bg-transparent" />
                    <span className="text-[10px] text-white">Custom</span>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-gray-500 text-[10px] uppercase tracking-widest mb-6">Language</h3>
                <div className="grid grid-cols-3 gap-3">
                  {Object.values(Language).map(lang => (
                    <button key={lang} onClick={() => setLanguage(lang)} className={`py-4 rounded-xl border ${language === lang ? 'bg-white text-black' : 'text-white border-white/10'}`}>{lang}</button>
                  ))}
                </div>
              </section>
           </div>
        </div>
      )}

      <AIOrb isOpen={showAI} setIsOpen={setShowAI} language={language} />
    </div>
  );
};

const ThemeOption = ({ label, active, onClick, color, gradient }: any) => (
  <button onClick={onClick} className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${active ? 'border-white bg-white/15' : 'border-white/5 bg-white/5'}`}>
    <div className="w-10 h-10 rounded-xl" style={{ background: gradient || color }}></div>
    <span className="text-[10px] text-white uppercase font-bold">{label}</span>
  </button>
);

const NavBtn = ({ icon, active = false, badge, onClick }: any) => (
  <button onClick={onClick} className={`relative flex-1 flex flex-col items-center justify-center h-full ${active ? 'text-white' : 'text-gray-600'}`}>
    <i className={`fa-solid ${icon} text-xl`}></i>
    {badge && <span className="absolute top-3 right-4 bg-blue-600 text-[8px] text-white px-1 rounded-full border border-black">{badge}</span>}
    {active && <div className="absolute bottom-0 w-8 h-1 rounded-t-full" style={{ backgroundColor: 'var(--primary-theme)', boxShadow: '0 0 10px var(--glow-theme)' }}></div>}
  </button>
);

export default App;
