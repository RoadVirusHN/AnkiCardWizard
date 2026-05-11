import { ChangeEvent, JSX } from "react";
import simpleInputStyle from "./simpleInput.module.css";


interface SimpleInputProps {
  label?: string|JSX.Element;
  placeholder?: string;
  defaultValue?: string;
  onChange: (e:ChangeEvent<HTMLInputElement>) => void;
}


const SimpleInput = ({label,placeholder,defaultValue,onChange}:SimpleInputProps) => {
  //TODO : Responsive design 
  // 1. when width is too long, make the label and select box stack horizontally.
  return <div className={simpleInputStyle.formGroup}>
    <label htmlFor="simple-input">{label}</label>
    <input id="simple-input" name="simple-input" className={simpleInputStyle.input} placeholder={placeholder} onChange={onChange} value={defaultValue}/>
  </div>;
  }

export default SimpleInput;