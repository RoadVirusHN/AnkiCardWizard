import { STORAGE_KEY } from './constants';
import { getCurrentTabId } from './functions';

export interface Message {
  type: MessageType;
  data: unknown;
}
export enum MessageType {
  REQUEST_CUSTOMCARDS_FROM_CONTENT = 'REQUEST_CUSTOMCARDS_FROM_CONTENT',
  SEND_DETECTED_CARDS = 'SEND_DETECTED_CARDS',
  REQUEST_DETECTED_CARDS_FROM_PANEL = 'REQUEST_DETECTED_CARDS_FROM_PANEL',
  REQUEST_DETECTED_CARDS_TO_CONTENT = 'REQUEST_DETECTED_CARDS_TO_CONTENT',
  ENTER_INSPECT_MODE_FROM_PANEL = 'ENTER_INSPECT_MODE_FROM_PANEL',
  ENTER_INSPECT_MODE_TO_CONTENT = 'ENTER_INSPECT_MODE_TO_CONTENT',
  EXIT_INSPECT_MODE = 'EXIT_INSPECT_MODE',
  SEND_INSPECT_DATA = 'SEND_INSPECT_DATA',
}

export const messageHandler = (
  message: Message,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: unknown) => void
) => {
  console.log('Background received message:', message);

  // 비동기 처리가 필요한 경우를 위한 플래그
  let shouldKeepChannelOpen = false;

  switch (message.type) {
    case MessageType.REQUEST_CUSTOMCARDS_FROM_CONTENT:
      shouldKeepChannelOpen = true;
      (async () => {
        try {
          const response = await chrome.storage.local.get(STORAGE_KEY);
          const customCards = response['customCards'] || [];
          sendResponse({ customCards });
        } catch (e) {
          sendResponse({ error: e});
        }
      })();
      break;

    case MessageType.REQUEST_DETECTED_CARDS_FROM_PANEL:
      console.log('Received REQUEST_DETECTED_CARDS_FROM_PANEL message');
      shouldKeepChannelOpen = true; 

      (async () => {
        try {
          const tabId = await getCurrentTabId();
          console.log('tabId:', tabId);

          if (tabId === undefined) {
            sendResponse({ error: "No Active tab found" });
            return;
          }

          // Content Script로 메시지 전송
          chrome.tabs.sendMessage(
            tabId,
            { type: MessageType.REQUEST_DETECTED_CARDS_TO_CONTENT, data: message.data },
            (response) => {
              if (chrome.runtime.lastError) {
                console.error("Content Script Error:", chrome.runtime.lastError.message);
                sendResponse({ error: chrome.runtime.lastError.message });
              } else {
                console.log('Response from content script (Valid):', response);
                sendResponse(response); 
              }
            }
          );
        } catch (error) {
          console.error("Background Error:", error);
          sendResponse({ error: "Background script error" });
        }
      })();
      break;

    case MessageType.ENTER_INSPECT_MODE_FROM_PANEL:
      console.log('Received ENTER_INSPECT_MODE message');
      shouldKeepChannelOpen = true;
      
      (async () => {
        try {
          const tabId = await getCurrentTabId(); // TODO : need to refactoring
          console.log('tabId:', tabId);

          if (tabId === undefined) {
            sendResponse({ error: "No Active tab found" });
            return;
          }

          // Content Script로 메시지 전송
          chrome.tabs.sendMessage(
            tabId,
            { type: MessageType.ENTER_INSPECT_MODE_TO_CONTENT, data: message.data },
            (response) => {
              if (chrome.runtime.lastError) {// TODO : need to refactoring
                console.error("Content Script Error:", chrome.runtime.lastError.message);
                sendResponse({ error: chrome.runtime.lastError.message });
              } else {
                console.log('Response from content script (Valid):', response);
                sendResponse(response); 
              }
            }
          );
        } catch (error) {
          console.error("Background Error:", error);
          sendResponse({ error: "Background script error" });
        }
      })();
      break;

  }

  return shouldKeepChannelOpen;
};