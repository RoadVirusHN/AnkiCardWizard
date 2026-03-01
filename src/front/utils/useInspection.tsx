import { InspectionMode } from "@/scripts/content/tagExtraction2";
import { JSX, useState } from "react";
import {} from "css-selector-generator";
import { CssSelectorGeneratorOptionsInput } from "css-selector-generator/types/types";
import { PortNames } from "@/scripts/background/connectHandler";
import { MessageType } from "@/scripts/background/messageHandler";

interface UseInspectionParams {  
  cssSelectorOptions: CssSelectorGeneratorOptionsInput;
  onResult: (text:string)=>void;
  onEnter: ()=>void;
  onCancel: ()=>void;
}

const useInspection = ({
  cssSelectorOptions,
  onResult,
  onEnter,
  onCancel
}:UseInspectionParams) => {

  const [panelPort, setPanelPort] = useState<chrome.runtime.Port|null>();
  const [isInspectionMode, setIsInspectionMode] = useState(false);

  const enterInspectionMode = async () => {
    if (panelPort!=null)  {
      console.log("disconnect previous port");
      panelPort.disconnect();
    }
    const newPort = chrome.runtime.connect({ name: PortNames.ENTER_INSPECTION_MODE_FROM_PANEL});
    setPanelPort(newPort);
    if (newPort){
      const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
      const tabId = tab.id;
      newPort.postMessage({type:MessageType.SET_INSPECTION_TAB_ID, tabId, data: cssSelectorOptions });
      newPort.onMessage.addListener((msg)=>{
        let data = msg.data as string;
        onResult(data.trim());
        newPort.disconnect();
        setPanelPort(null);
      });
      newPort.onDisconnect.addListener(()=>{
        // 탭이 닫히거나 에러 등으로 포트가 끊어졌을 때 처리
        setPanelPort(null);
      });
    setIsInspectionMode(true);
  }
  onEnter();
  };
  
  const cancleInspectionMode = () => {
    if (panelPort!=null){
      console.log("cancle inspection mode");
      panelPort.disconnect();
      setPanelPort(null);    
    }
    setIsInspectionMode(false);
    onCancel();
  };
  

  return [enterInspectionMode, cancleInspectionMode, isInspectionMode];
};

export default useInspection;
