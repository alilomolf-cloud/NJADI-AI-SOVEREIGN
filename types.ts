
export enum Language {
  AR = 'AR',
  FR = 'FR',
  EN = 'EN'
}

export enum ThemeMode {
  MOONLIGHT = 'MOONLIGHT',
  DESERT = 'DESERT',
  FOREST = 'FOREST',
  ROYAL = 'ROYAL',
  AURORA = 'AURORA',
  NEON = 'NEON',
  SUNSET = 'SUNSET',
  CUSTOM = 'CUSTOM',
  CHAMELEON = 'CHAMELEON'
}

export interface ThemePalette {
  id: string;
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface AppState {
  language: Language;
  theme: ThemeMode;
  isLoggedIn: boolean;
  showAI: boolean;
  isSplashActive: boolean;
}
