import { useEffect, useState } from "react";
import AnkiPng from "@/public/Anki-Png.png";
import ResetSvg from "@/public/Reset-Vector.svg";
import commonStyle from "@/popup/common.module.css";
import ankiStatusStyle from "@/popup/components/AnkiStatus/ankiStatus.module.css";
import ToolTipWrapper from "../TooltipWrapper/ToolTipWrapper";
import fetchAnki from "@/popup/utils/fetchAnki";

const AnkiStatus = ({}) => { 
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    let setLoader = ()=>setIsLoading(true);
    let unsetLoader = ()=>setIsLoading(false); 
    let timeoutId:NodeJS.Timeout;

    const checkConnection = async () => {
        setLoader();
        await fetchAnki({action:'deckNames'}).then((data)=>{
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(()=>unsetLoader(),1000);
            setIsConnected(data?.error === null);
        }).catch((err)=>{
            console.log(err);
            timeoutId = setTimeout(()=>unsetLoader(),1000);
            unsetLoader();
            setIsConnected(false);
        });
    };
  useEffect(()=>{checkConnection()},[]);
  return (
    <ToolTipWrapper 
      text={`Anki ${isConnected ? 'connected' : 'disconnected'}`} 
      classes={[commonStyle['no-select']]}
      styles={{display:'flex', justifyContent: 'space-around', gap:'5px', width: '64px', margin: 'auto'}}>
      <img className={(isLoading ? `${ankiStatusStyle.spinning}`:'')} src={AnkiPng} width={20} height={20}/>
      <span style={{color:isConnected ? 'greenyellow' : 'red'}}>●</span>
      <ResetSvg className={`${ankiStatusStyle["reset-btn"]} ${ankiStatusStyle.btn}`} onClick={()=>checkConnection()} width={20} height={20}/>
    </ToolTipWrapper>
);
};
export default AnkiStatus;