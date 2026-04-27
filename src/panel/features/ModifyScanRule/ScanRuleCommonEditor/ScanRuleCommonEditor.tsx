import modifyScanRuleStyle from "../modifyScanRule.module.css";
import Tags from "@/panel/components/Tags/Tags";
import { useRef } from "react";
import useLocale from "@/panel/hooks/useLocale";
import InspectionOverlay from "@/panel/components/InspectionOverlay/InspectionOverlay";
import SimpleButton from "@/panel/components/SimpleButton/SimpleButton";
import MagicIcon from "@/public/Icon/Icon-Magic.svg";
import useInspection from "@/panel/hooks/useInspection";
import { nonuniqueCssSelectorOptions } from "@/content/ui/App";
import { ScanRule } from "@/types/scanRule.types";
import { INSPECTION_MODE } from "@/types/app.types";

interface Props {
  data : ScanRule;
  setData: (data: ScanRule) => void;
}

const ScanRuleCommonEditor = ({data, setData}:Props) => {

  const rootTagInputRef = useRef<HTMLInputElement>(null);
  const tl = useLocale('pages.ModifyScanRule.ScanRuleCommonEditor');
  const onResult = (text: string)=>{
    setData({ ...data, rootTag: text });
    if (rootTagInputRef.current){
      rootTagInputRef.current.value = text;
    };
  }
  const {enterInspectionMode, cancleInspectionMode, isInspectionMode} = useInspection(INSPECTION_MODE.TAG_EXTRACTION, data.rootTag, nonuniqueCssSelectorOptions);
  return (<div>
    <div className={modifyScanRuleStyle.formGroup}>
      <label>{tl("Model Name")}</label>
      {/* TODO : MODEL SELECTING DROP DOWN */}
      <input
        className={modifyScanRuleStyle.input}
        value={data.modelId}
        onChange={(e) => setData({ ...data, modelId: e.target.value })}
      />
    </div>
    <div className={modifyScanRuleStyle.formGroup}>
      <label>{tl("URL Patterns")}</label>
      <input
        className={modifyScanRuleStyle.input}
        value={data.urlPatterns.join(", ")}
        onChange={(e) => ({ ...data, urlPatterns: e.target.value.split(",").map(s=>s.trim()) })}
        placeholder="*"
      />
    </div>
    <Tags givenTags={data.tags} isModifying={true} onAddTag={
      (newTag) => {
        if (!data.tags.includes(newTag)) {
          setData({ ...data, tags: [...data.tags, newTag] });
        }
      }
    } onRemoveTag={
      (tagToRemove) => {
        setData({ ...data, tags: data.tags.filter(tag => tag !== tagToRemove) });
      }
    }/>
    <div className={modifyScanRuleStyle.formGroup}>
      <label>{tl("Root Tag")} <span className={modifyScanRuleStyle.req}>*</span></label>
      <div className={modifyScanRuleStyle.inputWithBtn}>
        <input
          className={modifyScanRuleStyle.input}
          value={data.rootTag}
          onChange={(e) => setData({ ...data, rootTag: e.target.value })}
          ref={rootTagInputRef}
          placeholder="e.g. div.card-body"
        />
      <SimpleButton title="Extract Tag Selector" src={MagicIcon} onClick={()=>enterInspectionMode(onResult)}/> 
     </div>
      <p className={modifyScanRuleStyle.hint}>{tl("Fields will be searched under the root tag")}</p>
    </div>
    {isInspectionMode && <InspectionOverlay mode={INSPECTION_MODE.TAG_EXTRACTION} cancleInspectionMode={cancleInspectionMode}/>}
  </div>);
};
export default ScanRuleCommonEditor;