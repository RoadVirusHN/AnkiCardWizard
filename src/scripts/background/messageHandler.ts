import { STORAGE_KEY } from './constants';

interface Message {
  type: MessageType;
}
enum MessageType {
  REQUEST_CUSTOMCARDS_FROM_CONTENT = 'REQUEST_CUSTOMCARDS_FROM_CONTENT',
  SEND_DETECTED_CARDS = 'SEND_DETECTED_CARDS',
  REQUEST_DETECTED_CARDS_FROM_PANEL = 'REQUEST_DETECTED_CARDS_FROM_PANEL',
  REQUEST_DETECTED_CARDS_TO_CONTENT = 'REQUEST_DETECTED_CARDS_TO_CONTENT',
  ENTER_INSPECT_MODE = 'ENTER_INSPECT_MODE',
  EXIT_INSPECT_MODE = 'EXIT_INSPECT_MODE',
  SEND_INSPECT_DATA = 'SEND_INSPECT_DATA',
}

export const messageHandler = async (
  message: Message,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: unknown) => void
) => {
  let isAsync = false;
  switch (message.type) {
    case MessageType.REQUEST_CUSTOMCARDS_FROM_CONTENT:
      const response = await chrome.storage.local.get(STORAGE_KEY);
      const customCards = response['customCards'] || [];
      sendResponse({ customCards });
      break;
    case MessageType.REQUEST_DETECTED_CARDS_FROM_PANEL:
      const tabId = sender.tab?.id;
      if (tabId !== undefined){
        chrome.tabs.sendMessage(tabId, 
          { type: MessageType.REQUEST_DETECTED_CARDS_TO_CONTENT },
          (response) => sendResponse(response));
        isAsync = true;
      }
      break;
  }
  return isAsync;
};