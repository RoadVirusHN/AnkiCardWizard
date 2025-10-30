import { NavLink, useLocation } from "react-router";
import sideBarStyles from "./sideBar.module.css";
import AnkiAddPng from "@/public/AnkiAdd-Png.png";
import HistorySvg from "@/public/History-Svg.svg";
import CustomSvg from "@/public/Custom-Svg.svg";
import ConfigSvg from "@/public/Config-Svg.svg";
import { useEffect } from "react";
import useGlobalVarStore, { Tab } from "@/front/utils/useGlobalVarStore";

const SideBar = ({}) => {
  const location = useLocation();
  const {currentTab, setCurrentTab} = useGlobalVarStore();
  useEffect(() => {
    switch (location.pathname) {
      case '/history':
        if (currentTab !== Tab.HISTORY) setCurrentTab(Tab.HISTORY);
        break;
      case '/custom':
        if (currentTab !== Tab.CUSTOM) setCurrentTab(Tab.CUSTOM);
        break;
      case '/config':
        if (currentTab !== Tab.CONFIG) setCurrentTab(Tab.CONFIG);
        break;
      default:
        if (currentTab !== Tab.CARD) setCurrentTab(Tab.CARD);
        break;
    }
  }, [location]);
  return (
  <nav className={sideBarStyles["side-bar"]}>
    <NavLink className={`${sideBarStyles.tab} ${currentTab==Tab.CARD? sideBarStyles.selected : ''}`} to={'/card'}><img src={AnkiAddPng} width={24} height={24}/></NavLink>
    <NavLink className={`${sideBarStyles.tab} ${currentTab==Tab.HISTORY? sideBarStyles.selected : ''}`} to={'/history'}><HistorySvg width={20} height={20}/></NavLink>
    <NavLink className={`${sideBarStyles.tab} ${currentTab==Tab.CUSTOM? sideBarStyles.selected : ''}`} to={'/custom'}><CustomSvg width={20} height={20}/></NavLink>
    <NavLink className={`${sideBarStyles.tab} ${currentTab==Tab.CONFIG? sideBarStyles.selected : ''}`} to={'/config'}><ConfigSvg width={20} height={20}/></NavLink>
  </nav>
  );
};
export default SideBar;