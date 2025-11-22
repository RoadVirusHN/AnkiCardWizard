import { STORAGE_KEY } from './constants';
import { MessageType } from './messages';

interface Message {
  type: MessageType;
}

export const messageHandler = async (message: Message) => {
  switch (message.type) {
    case MessageType.GET_CUSTOMCARDS:
      {
        const response = await chrome.storage.local.get(STORAGE_KEY);
        const customCards = response['customCards'] || [];
        chrome.runtime.sendMessage({
          type: MessageType.SEND_CUSTOMCARDS,
          data: customCards,
        });
      }
      break;
  }
};