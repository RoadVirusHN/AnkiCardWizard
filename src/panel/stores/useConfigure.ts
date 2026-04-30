import i18n from '@/locales/i18n';
import { LOCALE, Locale, THEME, Theme, THEME_SETTING, ThemeSetting } from '@/types/app.types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeOption {
  theme: Theme;
  userSetting: ThemeSetting;
}

// WARN : less than 8kb per item in chrome.storage.sync, maximum 100kb total.
interface ConfigureState {
  locale: Locale;
  themeOption: ThemeOption;
  fontSize: string;
  styles: { [modelName: string]: { card: string; [cards: string]: string } };
  setLocale: (lang: Locale) => void;
  setThemeSetting: (themeSetting: ThemeSetting) => void;
  setFontSize: (fontSize: string) => void;
  setStyles: (modelName: string, key: string, newStyle: string) => void;
}
// TODO : Move style setting to local storage.
const DEFAULT_STYLE = `
  font-family: arial;
  font-size: 20px;
  text-align: center;
  color: black;
  background-color: white;
`;

const useConfigure = create<ConfigureState>()(
  persist(
    (set) => ({
      locale: LOCALE.EN,
      themeOption: {
        theme: THEME.LIGHT,
        userSetting: THEME_SETTING.NONE,
      },
      fontSize: 'normal',
      styles: {
        basic: {
          card: DEFAULT_STYLE,
        },
      },
      setLocale: (newLocale: Locale) => {
        set({ locale: newLocale });
        i18n.changeLanguage(newLocale);
      },
      setThemeSetting: (themeSetting: ThemeSetting) => {
        let newThemeOption = {
          theme: THEME.LIGHT as Theme,
          userSetting: themeSetting,
        };
        switch (themeSetting) {
          case THEME_SETTING.DARK:
          case THEME_SETTING.SYSTEM_DARK:
            document.documentElement.setAttribute('data-theme', 'dark');
            newThemeOption.theme = THEME.DARK;
            break;
          default:
            document.documentElement.setAttribute('data-theme', 'light');
            break;
        }
        set({ themeOption: newThemeOption });
      },
      setFontSize: (fontSize: string) => {
        const html = document.documentElement;
        html.classList.remove('font-small', 'font-normal', 'font-large', 'font-very-large');
        html.classList.add(`font-${fontSize}`);
        set({ fontSize: fontSize });
      },
      setStyles: (modelName: string, key: string, newStyle: string) => {
        set((state) => {
          const newStyles = { ...state.styles };
          if (!newStyles[modelName]) {
            newStyles[modelName] = { card: DEFAULT_STYLE };
          }
          newStyles[modelName][key] = newStyle;
          return { styles: newStyles };
        });
      },
    }),
    {
      name: 'anki-card-wizard-configure-store',
      storage: {
        getItem: async (name) => (await chrome.storage.sync.get(name))[name],
        setItem: async (name, value) => await chrome.storage.sync.set({ [name]: value }),
        removeItem: async (name) => await chrome.storage.sync.remove(name),
      },
    }
  )
);

export default useConfigure;
