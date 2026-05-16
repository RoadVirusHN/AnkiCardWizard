import { createPortal } from "react-dom";
import { isValidElement } from "../function";
import commonStyles from "./common.module.css";

//TODO : "Targeted"라고 우측 상단에 표시하기
const SelectorHighlight = ({target, mode="HIGHLIGHT"}: {target: HTMLElement, mode?: "ROOTS" | "HIGHLIGHT"}) => {
  if (!isValidElement(target)) return;
  const curRect = target.getBoundingClientRect();
  return createPortal(<div 
    className={mode==="ROOTS" ? commonStyles.rootTagHighlight :commonStyles.selectorHighlight} 
    style={
      {top: curRect.top + scrollY, left: curRect.left + scrollX, width: curRect.width, height: curRect.height, 
      display: 'block', 
      /* inline styled to force !important style vs web page css. */
      border: '2px solid ' + (mode==="ROOTS" ? 'var(--color-danger)' : 'var(--color-on)') + ' !important',
    }}/>, document.body);
};
export default SelectorHighlight;