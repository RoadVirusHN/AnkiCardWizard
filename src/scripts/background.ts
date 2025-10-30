console.log('✅ Background script loaded');
const STORAGE_KEY = 'anki-card-wizard-global-var-store';
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed!');
});
chrome.action.onClicked.addListener(async (tab) => {
  console.log(tab);
  try {
    const data = await chrome.storage.local.get(STORAGE_KEY);
    const raw = data[STORAGE_KEY];
    // raw는 persist가 저장한 값(보통 JSON 문자열 또는 오브젝트)일 수 있음.
    // Zustand+persist로 저장한 모양에 따라 값을 꺼내는 로직을 맞춰야 함.
    // 예: createJSONStorage(() => chromeStorage) 형태일 때 raw는 이미 파싱된 객체일 가능성 있음.
    let initialTab = null;
    if (raw) {
      try {
        // raw가 문자열이면 parse
        const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
        // parsed.state.currentTab 또는 구조에 따라 찾기
        initialTab = parsed?.state?.currentTab ?? parsed?.currentTab;
      } catch (e) {
        console.warn('Failed to parse persisted store', e);
      }
    }

    // 기본 경로
    let route = '/index.html'; // index -> CardPage
    if (initialTab === 'HISTORY') route = '/history';
    else if (initialTab === 'CUSTOM') route = '/custom';
    else if (initialTab === 'CONFIG') route = '/config';
    const url = chrome.runtime.getURL(route);
    chrome.windows.create({ url, type: 'popup', width: 480, height: 320 });
  } catch (err) {
    console.error('Failed to open window with saved route, opening default', err);
    const url = chrome.runtime.getURL('index.html');
    chrome.windows.create({ url, type: 'popup', width: 480, height: 320 });
  }
});
