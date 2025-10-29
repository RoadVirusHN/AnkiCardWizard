import { create } from 'zustand';

interface fetAnkiRequestBody {
  action: string;
  params?: Record<string, unknown>;
}
interface fetchAnkiResponseBody<T = unknown> {
  result: T;
  error: string | null;
}
interface AnkiConnectionState {
  isConnected: boolean;
  isPending: boolean;
  decks: string[];
  checkConnection: () => Promise<void>;
  fetchAnki: <T>(request: fetAnkiRequestBody) => Promise<fetchAnkiResponseBody<T>>;
}
const useAnkiConnectionStore = create<AnkiConnectionState>((set, get) => ({
  isConnected: false,
  isPending: false,
  decks: [],
  checkConnection: async () => {
    if (get().isPending) return;
    set({ isPending: true });
    const res = await fetch('http://127.0.0.1:8765', {
      method: 'POST',
      body: JSON.stringify({ action: 'deckNames', version: 5 }),
    })
      .then((data) => data.json())
      .catch((err) => {
        console.log(err);
        set({ isPending: false, isConnected: false, decks: [] });
      });
    set({ isPending: false, isConnected: !res.error, decks: res.result || [] });
  },
  fetchAnki: async <T>(request: fetAnkiRequestBody) => {
    if (get().isConnected === false) {
      // checkConnection() 안됨...
      return Promise.reject('Anki is not connected');
    }
    if (get().isPending) return Promise.reject('Another request is pending');
    set({ isPending: true });
    const res = await fetch('http://127.0.0.1:8765', {
      method: 'POST',
      body: JSON.stringify({ ...request, version: 5 }),
    })
      .then((res) => res.json())
      .catch((err) => {
        set({ isPending: false });
        throw err;
      });
    set({ isPending: false });
    return res as fetchAnkiResponseBody<T>;
  },
}));

export default useAnkiConnectionStore;
