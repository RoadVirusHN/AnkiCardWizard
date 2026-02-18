import { Template } from '@/front/utils/useTemplates';
import { Message, MessageType } from '../background/messageHandler';
import { getExtractedFromPage } from './content';
import { activateInspectionMode, deactivateInspectionMode, InspectionMode } from './tagExtraction2';
import { PortNames } from '../background/connectHandler';

export const messageHandler = async (
  message: Message,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: unknown) => void
) => {
  let isAsync = false;
  console.log('Content script received message:', message);
  switch (message.type) {
    case MessageType.REQUEST_DETECTED_CARDS_TO_CONTENT:
      console.log('Received REQUEST_DETECTED_CARDS_TO_CONTENT message');
      sendResponse(getExtractedFromPage(message.data as Template[]));
      break;
    case MessageType.ENTER_INSPECTION_MODE_FROM_PANEL:
      console.log('Enter inspect mode requested: ' + message.data);
      const port = chrome.runtime.connect({ name: PortNames.READY_INSPECTION_MODE_FROM_CONTENT });
      port.onDisconnect.addListener(() => {
        deactivateInspectionMode();
      });
      activateInspectionMode(message.data as InspectionMode, port);
      break;
  }
  return isAsync;
};
