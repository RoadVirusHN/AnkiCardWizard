import { NavLink } from "react-router";
import tabsStyle from "../tabs.module.css";
import useGlobalVarStore, { Tab } from "@/front/utils/useGlobalVarStore";
import AnkiIcon from '@/public/Icon/Icon-Anki.svg';
import useAnkiConnectionStore from "@/front/utils/useAnkiConnectionStore";
import { useEffect } from "react";
import TooltipWrapper from "../../TooltipWrapper/TooltipWrapper";

const DetectTab = ({}) => {
  const {currentTab} = useGlobalVarStore();
  const {isConnected, isPending, checkConnection} = useAnkiConnectionStore();
  useEffect(()=>{
      if (isConnected) return;
      checkConnection();
      const id = setInterval(()=> checkConnection(), 5000);
      return ()=> clearInterval(id); // cleanup on unmount
    }, [isConnected,checkConnection]);

  return (
  <NavLink className={`${tabsStyle.tab} ${currentTab==Tab.CARD? tabsStyle.selected : ''}`} to={'/card'}>
      <AnkiIcon className={(isPending ? `${tabsStyle.spinning}`:'')}/>
      <p>Detect</p>
      <TooltipWrapper 
      classes={[tabsStyle.tooltip]}
      text={`Anki ${isConnected ? 'connected' : 'disconnected'}`} 
      >
        <span style={{color:isPending ? 'gray' : (isConnected ? 'greenyellow' : 'red')}}>●</span>
      </TooltipWrapper>
  </NavLink>);
};
export default DetectTab;