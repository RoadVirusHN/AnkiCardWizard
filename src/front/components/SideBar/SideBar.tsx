import { NavLink } from "react-router";
import sideBarStyles from "./sideBar.module.css";
import AnkiAddPng from "@/public/AnkiAdd-Png.png";
import HistorySvg from "@/public/History-Svg.svg";
import CustomSvg from "@/public/Custom-Svg.svg";
import ConfigSvg from "@/public/Config-Svg.svg";

const SideBar = ({}) => {
  return (
  <nav className={sideBarStyles["side-bar"]}>
    <NavLink className={sideBarStyles.tab} to={'/card'}><img src={AnkiAddPng} width={24} height={24}/></NavLink>
    <NavLink className={sideBarStyles.tab} to={'/history'}><HistorySvg width={20} height={20}/></NavLink>
    <NavLink className={sideBarStyles.tab} to={'/custom'}><CustomSvg width={20} height={20}/></NavLink>
    <NavLink className={sideBarStyles.tab} to={'/config'}><ConfigSvg width={20} height={20}/></NavLink>
  </nav>
  );
};
export default SideBar;