import { NavLink, useLocation } from "react-router";
import tabsStyle from "./tabs.module.css";
import AddCardIcon from "@/public/Icon/Icon-AddCard.svg";
import CardTypeIcon from "@/public/Icon/Icon-CardType.svg";
import ConfigIcon from "@/public/Icon/Icon-Config.svg";
import { useEffect } from "react";
import useGlobalVarStore, { Tab } from "@/front/utils/useGlobalVarStore";
import DetectTab from "./DetectTab/DetectTab";
import commonStyle from "@/front/common.module.css";
import { useTranslation } from "react-i18next";import Icon from "../Icon/Icon";

const Tabs = ({}) => {
  const location = useLocation();
  const {currentTab, setCurrentTab} = useGlobalVarStore();
  const [t] = useTranslation();
  useEffect(() => {
    switch (location.pathname) {
      case '/detect': case '/':
        if (currentTab !== Tab.DETECT) setCurrentTab(Tab.DETECT);
        break;
      case '/add':
        if (currentTab !== Tab.ADD) setCurrentTab(Tab.ADD);
        break;
      case '/templates':
        if (currentTab !== Tab.TEMPLATES) setCurrentTab(Tab.TEMPLATES);
        break;
      case '/config':
        if (currentTab !== Tab.CONFIG) setCurrentTab(Tab.CONFIG);
        break;
      case '/modify':
        if (currentTab !== Tab.CONFIG) setCurrentTab(Tab.TEMPLATES);
        break;
      default:
        if (location.pathname.match('/templates')!==null) setCurrentTab(Tab.TEMPLATES);
        // TODO: error handling for unknown path can be added here
        break;
    }
  }, [location]);
  return (
  <nav className={`${tabsStyle.tabs} ${commonStyle["no-select"]}`}>
    <DetectTab/>
    <NavLink 
    className={`${tabsStyle.tab} ${currentTab==Tab.ADD? tabsStyle.selected : ''}`} 
    to={'/add'}>
      <Icon url={AddCardIcon}/>
      <p>{t('tabs.add')}</p>
      </NavLink>
    <NavLink 
    className={`${tabsStyle.tab} ${currentTab==Tab.TEMPLATES? tabsStyle.selected : ''}`} 
    to={'/templates'}>
      <Icon url={CardTypeIcon}/>
      <p>{t('tabs.templates')}</p>
    </NavLink>    
    <NavLink 
    className={`${tabsStyle.tab} ${currentTab==Tab.CONFIG? tabsStyle.selected : ''}`} 
    to={'/config'}>
      <Icon url={ConfigIcon}/>
      <p>{t('tabs.config')}</p>
    </NavLink>
  </nav>
  );
};
export default Tabs;