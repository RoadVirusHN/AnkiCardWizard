import { FunctionComponent, SVGAttributes } from 'react';
import simpleButtonStyles from './simpleButton.module.css';
import Icon from '../Icon/Icon';
interface ButtonProps {
  text?: string;
  src?: string; 
  onClick?: () => void;
  overridedStyle?: React.CSSProperties;
  title?: string;
}
const SimpleButton = ({text, src, onClick, overridedStyle, title}:ButtonProps) => {
  return (<button className={`${simpleButtonStyles['simple-btn']}`} onClick={onClick} style={overridedStyle} title={title}>
    {src && <Icon url={src}/>} {text}
  </button>);
};  
export default SimpleButton;