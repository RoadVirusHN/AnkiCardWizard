import React, {ReactNode} from 'react';
import tooltipStyle from './tooltip.module.css';
import commonStyle from "@/panel/common.module.css";
import { TOOLTIP_DIRECTION, TooltipDirection } from '@/types/app.types';

interface TooltipWrapperProps {
  children?:ReactNode,
  classes?:string[],
  text:string,
  styles?: React.CSSProperties,
  textStyles?:React.CSSProperties,
  tooltipDirection?: TooltipDirection,
}
const TooltipWrapper = (
  {children, classes, text, textStyles, styles, tooltipDirection=TOOLTIP_DIRECTION.TOP}:TooltipWrapperProps
) => {
    // TODO: use clsx later.
    let classNames = `${tooltipStyle.tooltip} ${commonStyle['no-select']}`;
    for (const className of classes || []) { //와.... || [] 이거 똑똑하네
      classNames += ` ${className}`;
    }
    let directionStyle;
    switch (tooltipDirection) {
      case TOOLTIP_DIRECTION.BOTTOM:
        directionStyle = tooltipStyle['tooltip-bottom'];
        break;
      case TOOLTIP_DIRECTION.LEFT:
        directionStyle = tooltipStyle['tooltip-left'];
        break;
      case TOOLTIP_DIRECTION.RIGHT:
        directionStyle = tooltipStyle['tooltip-right'];
        break;
      case TOOLTIP_DIRECTION.BOTTOM_LEFT:
        directionStyle = tooltipStyle['tooltip-bottom-left'];  // fix later
        break;
      default:
        directionStyle = tooltipStyle['tooltip-top'];
        break;
    }
  return (
    <div className={classNames} role='tooltip' aria-label={text} style={styles}>
      <span className={`${tooltipStyle.tooltiptext} ${directionStyle}`} style={textStyles}>{text}</span>
      {children}
    </div>
  );
};
export default TooltipWrapper;