import { ChangeEvent, JSX } from "react";
import simpleSelectStyle from "./simpleSelect.module.css";

type SimpleSelectOption = {
  key: string;
  val: string;
  isDisabled?: boolean;
};

interface SimpleSelectProps {
  label?: string|JSX.Element;
  placeholder?: string;
  defaultValue?: string;
  options: SimpleSelectOption[];
  onChange: (e:ChangeEvent<HTMLSelectElement>) => void;
}


const SimpleSelect = ({label,placeholder,defaultValue,options,onChange}:SimpleSelectProps) => {
  //TODO : Responsive design 
  // 1. when options are too many, make the select box scrollable and set a max height
  // 2. when width is too long, make the label and select box stack horizontally.
  return <div className={simpleSelectStyle.formGroup}>
    <label htmlFor="simple-select">{label}</label>
    <select id="simple-select" name="simple-select" className={simpleSelectStyle.select} onChange={onChange} value={defaultValue}>
      {placeholder  ? <option value="" disabled>{placeholder}</option> : null}
      {options.map(({key,val,isDisabled},idx) => <option key={idx} value={val} disabled={isDisabled}>{key}</option>)}
    </select>
  </div>;
  }

export default SimpleSelect;