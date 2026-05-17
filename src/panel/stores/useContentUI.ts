import { MenuItem } from '@/content/ui/Menu';
import { create } from 'zustand';

interface ContentUIState {
  highlight: {
    isShowing: boolean;
    targets: HTMLElement[];
    borderColor: string;
    backgroundColor: string;
  };
  setHighlight: (highlight: ContentUIState['highlight']) => void;
  menu: {
    isShowing: boolean;
    items: MenuItem[];
    x: number;
    y: number;
    header: string;
  };
  setMenu: (menu: ContentUIState['menu']) => void;
  tooltip: {
    isShowing: boolean;
    text: string;
    x: number;
    y: number;
  };
  setTooltip: (tooltip: ContentUIState['tooltip']) => void;
  confirm: {
    isShowing: boolean;
    text: string;
    onConfirm: () => void;
    onCancel: () => void;
  };
  setConfirm: (confirm: ContentUIState['confirm']) => void;
}

const useGlobalVarStore = create<ContentUIState>()((set) => ({
  highlight: {
    isShowing: false,
    targets: [],
    borderColor: 'var(--color-hyperlink)',
    backgroundColor: 'rgba(173, 216, 230, 0.5)',
  },
  setHighlight: (highlight) => set({ highlight }),
  menu: {
    isShowing: false,
    items: [],
    x: 0,
    y: 0,
    header: '',
  },
  setMenu: (menu) => set({ menu }),
  tooltip: {
    isShowing: false,
    text: '',
    x: 0,
    y: 0,
  },
  setTooltip: (tooltip) => set({ tooltip }),
  confirm: {
    isShowing: false,
    text: '',
    onConfirm: () => {},
    onCancel: () => {},
  },
  setConfirm: (confirm) => set({ confirm }),
}));

export default useGlobalVarStore;
