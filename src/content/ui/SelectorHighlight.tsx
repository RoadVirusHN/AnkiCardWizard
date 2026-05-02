import commonStyles from "./common.module.css";
import { isValidElement } from "./App";


//TODO : "Targeted"라고 우측 상단에 표시하기
const SelectorHighlight = ({target}: {target: HTMLElement}) => {
  if (!isValidElement(target)) return;
  const curRect = target.getBoundingClientRect();
  return <div 
    className={commonStyles.selectorHighlight} 
    style={
      {top: curRect.top, left: curRect.left, width: curRect.width, height: curRect.height, 
      display: 'block'}}/>;
};
export default SelectorHighlight;