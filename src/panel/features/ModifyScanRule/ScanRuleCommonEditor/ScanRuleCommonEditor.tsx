import modifyScanRuleStyle from "../modifyScanRule.module.css";
import Tags from "@/panel/components/Tags/Tags";
import { useRef } from "react";
import useLocale from "@/panel/hooks/useLocale";
import InspectionOverlay from "@/panel/components/InspectionOverlay/InspectionOverlay";
import MagicIcon from "@/public/Icon/Icon-Magic.svg";
import useInspection from "@/panel/hooks/useInspection";
import { ScanRule } from "@/types/scanRule.types";
import { INSPECTION_MODE } from "@/types/app.types";
import useAnkiConnectionStore from "@/panel/stores/useAnkiConnectionStore";
import SimpleButton from "@/panel/components/Inputs/SimpleButton/SimpleButton";
import SimpleInput from "@/panel/components/Inputs/SimpleInput/SimpleInput";
import SimpleSelect from "@/panel/components/Inputs/SimpleSelect/SimpleSelect";

interface Props {
  scanRule : ScanRule;
  setData: (data: ScanRule) => void;
}

const ScanRuleCommonEditor = ({scanRule, setData}:Props) => {

  const rootTagInputRef = useRef<HTMLInputElement>(null);
  const tl = useLocale('pages.ModifyScanRule.ScanRuleCommonEditor');
  const onResult = (text: string)=>{
    setData({ ...scanRule, rootTag: text });
    if (rootTagInputRef.current){
      rootTagInputRef.current.value = text;
    };
  }
  const {models} = useAnkiConnectionStore();
  const {enterInspectionMode, cancleInspectionMode, isInspectionMode} = useInspection(INSPECTION_MODE.TAG_EXTRACTION, scanRule.rootTag );
  
  const options = models
    ? Object.entries(models).map(([modelId, model]) => ({ key: model.name, val: modelId, isDisabled: false }))
    : [{ key: tl("No Models Founded, Please Connect to Anki"), val: "", isDisabled: true }];
  
  return (<div>
    <SimpleSelect
      label={tl("Model")} 
      options={[
        {key: scanRule.modelName, val: scanRule.modelId, isDisabled: false},
      ].concat(options.filter(option => option.val !== scanRule.modelId))}   
      defaultValue={scanRule.modelId} 
      onChange={(e) => {
        setData({ ...scanRule, modelId: e.target.value, modelName: models[e.target.value].name, fields: Object.fromEntries(models[e.target.value].fields.map((field:string) => [field, { selector: "", dataType: "text" }])) });
      }}    
    />
    <SimpleInput 
      label={tl("URL Patterns")} 
      placeholder={"*"} 
      defaultValue={scanRule.urlPatterns.join(", ")} 
      onChange={(e) => ({ ...scanRule, urlPatterns: e.target.value.split(",").map(s=>s.trim()) })}
    />
    <Tags givenTags={scanRule.tags} isModifying={true} onAddTag={
      (newTag) => {
        if (!scanRule.tags.includes(newTag)) {
          setData({ ...scanRule, tags: [...scanRule.tags, newTag] });
        }
      }
    } onRemoveTag={
      (tagToRemove) => {
        setData({ ...scanRule, tags: scanRule.tags.filter(tag => tag !== tagToRemove) });
      }
    }/>
    <div className={modifyScanRuleStyle.formGroup}>
      <label>{tl("Root Tag")} <span className={modifyScanRuleStyle.req}>*</span></label>
      <div className={modifyScanRuleStyle.inputWithBtn}>
        <input
          className={modifyScanRuleStyle.input}
          value={scanRule.rootTag}
          onChange={(e) => setData({ ...scanRule, rootTag: e.target.value })}
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