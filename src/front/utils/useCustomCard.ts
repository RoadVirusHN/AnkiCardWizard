import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CustomCard {
  cardName: string;
  modelName: string;
  Front: string;
  Back: string;
  tags: string[];
  audio?: {
    url: string;
    filename: string;
    skipHash: string;
    fields: string[];
  };
}
interface CustomCardState {
  customCards: CustomCard[];
  addCustomCard: (card: CustomCard) => void;
  removeCustomCard: (index: number) => void;
}

const useCustomCard = create<CustomCardState>()(
  persist(
    (set) => ({
      customCards: [],
      addCustomCard: (card: CustomCard) => {
        set((state) => ({ customCards: [...state.customCards, card] }));
      },
      removeCustomCard: (index: number) => {
        set((state) => ({
          customCards: state.customCards.filter((_, i) => i !== index),
        }));
      },
    }),
    {
      name: 'anki-card-wizard-global-var-store',
      storage: {
        getItem: async (name) => (await chrome.storage.local.get(name))[name],
        setItem: async (name, value) => await chrome.storage.local.set({ [name]: value }),
        removeItem: async (name) => await chrome.storage.local.remove(name),
      },
    }
  )
);

export default useCustomCard;
