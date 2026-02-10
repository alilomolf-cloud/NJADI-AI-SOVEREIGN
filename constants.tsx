
import React from 'react';
import { Language, ThemeMode, ThemePalette } from './types';

export const THEME_PALETTES: Record<Exclude<ThemeMode, ThemeMode.CHAMELEON | ThemeMode.CUSTOM>, ThemePalette> = {
  [ThemeMode.MOONLIGHT]: {
    id: 'moonlight',
    primary: '#3b82f6',
    secondary: '#1d4ed8',
    accent: '#94a3b8',
    glow: 'rgba(59, 130, 246, 0.5)'
  },
  [ThemeMode.DESERT]: {
    id: 'desert',
    primary: '#f59e0b',
    secondary: '#b45309',
    accent: '#fcd34d',
    glow: 'rgba(245, 158, 11, 0.5)'
  },
  [ThemeMode.FOREST]: {
    id: 'forest',
    primary: '#10b981',
    secondary: '#047857',
    accent: '#6ee7b7',
    glow: 'rgba(16, 185, 129, 0.5)'
  },
  [ThemeMode.ROYAL]: {
    id: 'royal',
    primary: '#8b5cf6',
    secondary: '#6d28d9',
    accent: '#c4b5fd',
    glow: 'rgba(139, 92, 246, 0.5)'
  },
  [ThemeMode.AURORA]: {
    id: 'aurora',
    primary: '#2dd4bf',
    secondary: '#0d9488',
    accent: '#99f6e4',
    glow: 'rgba(45, 212, 191, 0.5)'
  },
  [ThemeMode.NEON]: {
    id: 'neon',
    primary: '#f472b6',
    secondary: '#db2777',
    accent: '#f9a8d4',
    glow: 'rgba(244, 114, 182, 0.5)'
  },
  [ThemeMode.SUNSET]: {
    id: 'sunset',
    primary: '#ef4444',
    secondary: '#991b1b',
    accent: '#fca5a5',
    glow: 'rgba(239, 68, 68, 0.5)'
  }
};

export const TRANSLATIONS = {
  [Language.AR]: {
    welcome: "مرحباً بك في تطبيق F NJADI",
    login: "تسجيل الدخول",
    signup: "إنشاء حساب",
    aiPrompt: "كيفاش نقدر نعاونك اليوم؟",
    download: "تحميل الميديا",
    settings: "الإعدادات",
    theme: "المظهر",
    greetingText: "مرحبا بكل بتطبيقك الذكي f النجادي من تصميم علي ولد نجادي، شكراً لاختيارك.. نتمنى لك تجربة ممتعة! أهلا جيت؟ هههههه جيت كش ما جبت معاك؟ قالك من عندي وعندك تنطبع، ولا من عندي برك تنقطع! هههههه",
    chameleon: "الحرباء (تلقائي)"
  },
  [Language.FR]: {
    welcome: "Bienvenue sur l'application Ali Ould Njadi",
    login: "Connexion",
    signup: "S'inscrire",
    aiPrompt: "Comment puis-je vous aider aujourd'hui ?",
    download: "Télécharger Média",
    settings: "Paramètres",
    theme: "Thème",
    greetingText: "Bienvenue sur l'application intelligente F NJADI, conçue par Ali Ould Njadi. Merci de nous avoir choisis. Bonne expérience ! Ah, tu es là ? Hahaha, as-tu apporté quelque chose avec toi ? On dit que si ça vient de nous deux, ça dure, mais si ça vient de moi seul, ça s'arrête ! Hahaha",
    chameleon: "Chameleon (Auto)"
  },
  [Language.EN]: {
    welcome: "Welcome to F NJADI App",
    login: "Login",
    signup: "Sign Up",
    aiPrompt: "How can I help you today?",
    download: "Download Media",
    settings: "Settings",
    theme: "Theme",
    greetingText: "Welcome to your smart app F NJADI, designed by Ali Ould Njadi. Thank you for choosing us. Have a pleasant experience! Oh, you're here? Hahaha, did you bring anything with you? They say if it comes from both of us, it sticks, but if it's only from me, it breaks! Hahaha",
    chameleon: "Chameleon (Auto)"
  }
};

export const MOCK_USER_AGENTS = [
  "Mozilla/5.0 (Linux; Android 13; SM-S901B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
  "Mozilla/5.0 (Linux; Android 12; Pixel 6 Build/SD1A.210817.036) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Mobile Safari/537.36",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 16_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Mobile/15E148 Safari/604.1"
];
