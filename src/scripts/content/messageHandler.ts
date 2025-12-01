import { STORAGE_KEY } from "../background/constants";
import { getExtractedFromPage } from "./content";

interface Message {
  type: MessageType;
}

enum MessageType {
  SEND_DETECTED_CARDS = 'SEND_DETECTED_CARDS',
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
    case MessageType.REQUEST_DETECTED_CARDS_TO_CONTENT:
      getExtractedFromPage().then((extractedData) => {sendResponse({ extractedData });});
      break;
  }
  return isAsync;
};

// (message) => {
//   console.log('Message received from content.js :', message);
//   if (message.type === MessageType.REQUEST_DETECTED_CARDS_FROM_PANEL) {
//     console.log('Received EXTRACT_DATA_REQUEST message');
//     sendDetectedCards(message.customCards);
//   } else if (message.type === MessageType.ENTER_INSPECT_MODE) {
//     console.log("request OverlayMode" + message.mode);
//     activateInspectionMode(message.mode);
//   } else if (message.type === MessageType.EXIT_INSPECT_MODE) {
//     console.log("request unset OverlayMode");
//     deactivateInspectionMode();
//   } else {
//     console.log("wtf");
//   }
// });