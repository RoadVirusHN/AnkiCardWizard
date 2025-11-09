import {ReactNode} from 'react';
import tooltipStyle from './tooltip.module.css';
import commonStyle from "@/front/common.module.css";
export enum TooltipDirection{
  UP = 'tooltip-top',
  DOWN = 'tooltip-down',
  LEFT = 'tooltip-left',
  RIGHT = 'tooltip-right',
  UP_LEFT = 'tooltip-up-left',
  UP_RIGHT = 'tooltip-up-right',
  DOWN_LEFT = 'tooltip-down-left',
  DOWN_RIGHT = 'tooltip-down-right',
}

interface TooltipWrapperProps {
  children?:ReactNode,
  classes?:string[],
  text:string,
  styles?:React.CSSProperties,
  tooltipDirection?: TooltipDirection
}

const TooltipWrapper = (
  {children, classes, text, styles, tooltipDirection=TooltipDirection.UP}:TooltipWrapperProps
) => {
    // TODO: use clsx later.
    let classNames = `${tooltipStyle.tooltip} ${commonStyle['no-select']}`;
    for (const className of classes || []) { //와.... || [] 이거 똑똑하네
      classNames += ` ${className}`;
    }
  return (
    <div className={classNames} style={styles} role='tooltip' aria-label={text}>
      <span className={`${tooltipStyle.tooltiptext}`}>{text}</span>
      {children}
    </div>
  );
};
export default TooltipWrapper;