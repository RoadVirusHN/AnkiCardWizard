import { onInstalled } from './functions';
import { messageHandler } from './messageHandler';

console.log('✅ Background script loaded');

chrome.runtime.onInstalled.addListener(onInstalled);

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

chrome.runtime.onMessage.addListener(messageHandler);
