import { create } from 'zustand';

enum Tab {
  CARD = 'CARD',
  HISTORY = 'HISTORY',
  CUSTOM = 'CUSTOM',
  CONFIG = 'CONFIG',
}

interface GlobalVarState {
  currentTab: Tab;
  currentDeck: string | null;
  isAddingCard: boolean;
}

const useGlobalVarStore = create<GlobalVarState>(() => ({
  currentTab: Tab.CARD,
  currentDeck: null,
  isAddingCard: false,
}));

export default useGlobalVarStore;
