import {ReactNode} from 'react';
import tooltipStyles from './tooltip.module.css';

interface ToolTipWrapperProps {
  children?:ReactNode,
  classes?:string[],
  text:string,
  styles?:React.CSSProperties
}

const ToolTipWrapper = (
  {children, classes, text, styles}:ToolTipWrapperProps
) => {
    // TODO: use clsx later.
    let classNames = `${tooltipStyles.tooltip}`;
    for (const className of classes || []) { //와.... || [] 이거 똑똑하네
      classNames += ` ${className}`;
    }
  return (
    <div className={classNames} style={styles} role='tooltip' aria-label={text}>
      <span className={tooltipStyles.tooltiptext}>{text}</span>
      {children}
    </div>
  );
};
export default ToolTipWrapper;