console.log('✅ Background script loaded');
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed!');
});
chrome.action.onClicked.addListener((tab) => {
  console.log("clicked");
  console.log(tab);
  chrome.windows.create({ url: '/index.html', type: 'popup', height: 320, width: 480 });
});
