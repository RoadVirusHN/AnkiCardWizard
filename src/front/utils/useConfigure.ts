import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export enum Language {
  EN = 'en',
  KO = 'ko',
}

// WARN : less than 8kb per item in chrome.storage.sync, maximum 100kb total.
interface ConfigureState {
  language: Language;
  //colors: 
  setLanguage: (lang: Language) => void;
}

const useConfigure = create<ConfigureState>()(
  persist(
    (set) => ({
      language: Language.EN,
      setLanguage: (lang: Language) => {
        console.log("Setting language to:", lang);
        set({ language: lang });
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