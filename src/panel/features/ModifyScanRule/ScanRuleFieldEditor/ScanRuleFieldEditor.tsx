import { useMemo } from "react";
import Editor from "@monaco-editor/react";
import styles from "../modifyScanRule.module.css";
import useLocale from "@/panel/hooks/useLocale";
import useConfigure from "@/panel/stores/useConfigure";
import MagicIcon from "@/public/Icon/Icon-Magic.svg";
import InspectionOverlay from "@/panel/components/InspectionOverlay/InspectionOverlay";
import useInspection from "@/panel/hooks/useInspection";
import { uniqueCssSelectorOptions } from "@/content/ui/App";
import SimpleButton from "@/panel/components/SimpleButton/SimpleButton";
import { ScanRule, FieldProperties, FieldDataType } from "@/types/scanRule.types";
import { INSPECTION_MODE } from "@/types/app.types";

interface Props {
  scanRule: ScanRule;
  setData: (data: {[fieldName: string]: FieldProperties}) => void;
}

const ScanRuleFieldEditor = ({ scanRule, setData } : Props) => {
  const {
    enterInspectionMode,
    cancleInspectionMode,
    isInspectionMode
  } = useInspection(INSPECTION_MODE.TAG_EXTRACTION, scanRule.rootTag, uniqueCssSelectorOptions);

  const handleItemChange = (fieldName:string, newData: FieldProperties) => {
    const newItems = {...scanRule.fields};
    newItems[fieldName] = newData;
    setData(newItems);
  };

  const tl = useLocale('pages.ModifyScanRule.ScanRuleSideEditor');
  return (
    <div className={styles.editorContainer}>

      {/* 3. Items List */}
      <div className={styles.fieldHeader}>
        <div className={styles.sectionTitle} style={{marginBottom:0}}>{tl('Fields')}</div>
      </div>
      
      <div className={styles.fieldsList}>
        {Object.keys(scanRule.fields).map((item) => {
          const onResult = (sel:string) => handleItemChange(item,{...scanRule.fields[item], selector:sel});
          return (
            <div key={item} className={styles.fieldRow}>
              {/* Field Name */}
              <div>
                <div className={styles.fieldName}>{item}</div>
              </div>
              
              {/* CSS Selector + Picker */}
              <div className={styles.selectorWrapper}>
                <input
                  className={`${styles.input} ${styles.fieldSelector}`}
                  value={scanRule.fields[item].selector}
                  placeholder={tl("CSS Selector")}
                  onChange={(e) => handleItemChange(item, {...scanRule.fields[item], selector: e.target.value})}
                />
                <SimpleButton title="Extract Field Css Selector" src={MagicIcon} onClick={()=>enterInspectionMode(onResult)}/> 
              </div>
              <select
                className={styles.select}
                value={scanRule.fields[item].dataType}
                onChange={(e) => handleItemChange(item, {...scanRule.fields[item], dataType: e.target.value as FieldDataType})}
              >
                <option value="text">{tl('Text')}</option>
                <option value="image">{tl('Image')}</option>
                <option value="audio">{tl('Audio')}</option>
                <option value="video">{tl('Video')}</option>
              </select>
            </div>
          );
        })}
      </div>
      {isInspectionMode ?? <InspectionOverlay mode={INSPECTION_MODE.TAG_EXTRACTION} cancleInspectionMode={cancleInspectionMode}/>}
    </div>
  );
};

export default ScanRuleFieldEditor;