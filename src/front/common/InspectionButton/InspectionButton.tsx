import ExtractIcon from "@/public/Icon/Icon-Code.svg"
import SimpleButton from "../SimpleButton/SimpleButton";
import { Dispatch, SetStateAction, useState } from "react";
import { PortNames } from "@/scripts/background/connectHandler";
import { MessageType } from "@/scripts/background/messageHandler";
import { InspectionMode } from "@/scripts/content/tagExtraction";
import inspectionButtonStyle from "./InspectionButton.module.css";


const InspectionButton = ({setResult, mode=InspectionMode.TAG_EXTRACTION}:{setResult: (text:string)=>void, mode?: InspectionMode}) => {
  const [panelPort, setPanelPort] = useState<chrome.runtime.Port|null>();
  return <>
    <div className={inspectionButtonStyle.overlay} style={{display:panelPort ? 'flex':'none'}} 
    onClick={()=>{
      if (panelPort!=null) {
        console.log("cancle inspection mode");
        panelPort.disconnect();
        setPanelPort(null);
      }
    }}>  
      <div className={inspectionButtonStyle['left-pointer']}></div>
      <div className={inspectionButtonStyle['instruction-box']}>
        <h3>Your in "Inspection Mode"</h3>
        <ol>
            <li>Hover over the tag</li>
            <li>Click to copy into your clipboard.</li>
            <li>Paste the text where you want!</li>
        </ol>
        <h4>* Click here to exit mode.</h4>
      </div>
     </div>
    <SimpleButton src={ExtractIcon} onClick={async ()=>{
      if (panelPort!=null)  {
        console.log("disconnect previous port");
        panelPort.disconnect();
      }
      const newPort = chrome.runtime.connect({ name: mode==InspectionMode.TEXT_EXTRACTION ? PortNames.ENTER_TEXT_INSPECTION_MODE_FROM_PANEL : PortNames.ENTER_TAG_INSPECTION_MODE_FROM_PANEL });
      setPanelPort(newPort);
      if (newPort){
        const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
        const tabId = tab.id;
        newPort.postMessage({type:MessageType.SET_INSPECTION_TAB_ID, tabId });
        newPort.onMessage.addListener((msg)=>{
          let data = msg.data as string;
          setResult(data.trim());
          newPort.disconnect();
          setPanelPort(null);
        });
        newPort.onDisconnect.addListener(()=>{
          // 탭이 닫히거나 에러 등으로 포트가 끊어졌을 때 처리
          console.log("inspection mode disconnected");
          setPanelPort(null);
        });
      }
    }}/> 
  </> ;
};
export default InspectionButton;