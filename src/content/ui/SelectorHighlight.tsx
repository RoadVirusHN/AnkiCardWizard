import { isValidElement } from "../function";
import commonStyles from "./common.module.css";


//TODO : "Targeted"라고 우측 상단에 표시하기
const SelectorHighlight = ({target, mode="HIGHLIGHT"}: {target: HTMLElement, mode?: "ROOTS" | "HIGHLIGHT"}) => {
  if (!isValidElement(target)) return;
  const curRect = target.getBoundingClientRect();
  return <div 
    className={mode==="ROOTS" ? commonStyles.rootTagHighlight :commonStyles.selectorHighlight} 
    style={
      {top: curRect.top, left: curRect.left, width: curRect.width, height: curRect.height, 
      display: 'block'}}/>;
};
export default SelectorHighlight;