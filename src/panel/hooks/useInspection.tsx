import { useState } from "react";
import { CssSelectorGeneratorOptionsInput } from "css-selector-generator/types/types";
import { INSPECTION_MODE, InspectionMode } from "@/types/app.types";
import { MESSAGE_TYPE, PORT_NAMES } from "@/types/chrome.types";

interface _UseInspectionParams {  
  mode: InspectionMode;
  rootSelector: string;
  cssSelectorOptions: CssSelectorGeneratorOptionsInput;
  onResult: (text:string)=>void;
  onEnter: ()=>void;
}

const useInspection = (
  mode = INSPECTION_MODE.TEXT_EXTRACTION as InspectionMode,
  rootSelector = 'body',
  cssSelectorOptions = {} as CssSelectorGeneratorOptionsInput
) => {

  const [panelPort, setPanelPort] = useState<chrome.runtime.Port|null>();
  const [isInspectionMode, setIsInspectionMode] = useState(false);

  const enterInspectionMode = async (onResult=(text:string)=>{}, onCancle=()=>{}) => {
    if (panelPort!=null)  {
      console.log("disconnect previous port");
      panelPort.disconnect();
    }
    const newPort = chrome.runtime.connect({ name: PORT_NAMES.ENTER_INSPECTION_MODE_FROM_PANEL});
    setPanelPort(newPort);
    if (newPort){
      const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
      const tabId = tab.id;
      newPort.postMessage({type:MESSAGE_TYPE.SET_INSPECTION_TAB_ID, tabId, data: {mode, rootSelector, cssSelectorOptions} });
      newPort.onMessage.addListener((msg)=>{
        let data = msg.data as string;
        onResult(data.trim());
        cancleInspectionMode(onCancle);
      });
      newPort.onDisconnect.addListener(()=>{
        cancleInspectionMode(onCancle);
      });
      setIsInspectionMode(true);
    }
  };
  
  const cancleInspectionMode = (onCancle=()=>{}) => {
    if (panelPort!=null){
      console.log("cancle inspection mode");
      panelPort.disconnect();
      setPanelPort(null);    
    }
    setIsInspectionMode(false);
    onCancle();
  };
  

  return {enterInspectionMode, cancleInspectionMode, isInspectionMode};
};

export default useInspection;
