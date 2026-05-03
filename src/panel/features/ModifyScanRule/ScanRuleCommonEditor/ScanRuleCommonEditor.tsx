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
import useAnkiConnectionStore from "@/panel/stores/useAnkiConnectionStore";

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
  const {enterInspectionMode, cancleInspectionMode, isInspectionMode} = useInspection(INSPECTION_MODE.TAG_EXTRACTION, scanRule.rootTag, nonuniqueCssSelectorOptions);
  return (<div>
    <div className={modifyScanRuleStyle.formGroup}>
      {/* TODO : refresh options when Anki connected */}
      <label>{tl("Model")}</label>
      <select value={scanRule.modelId} onChange={(e) => {
        setData({ ...scanRule, modelId: e.target.value, modelName: models[e.target.value].name, fields: Object.fromEntries(models[e.target.value].fields.map((field:string) => [field, { selector: "", dataType: "text" }])) });
      }}>
        <option value={scanRule.modelId} >
          {scanRule.modelName}
        </option>
        {
          Object.keys(models).length === 0 ? (
            <option value="" disabled>
              {tl("No Models Founded, Please Connect to Anki")}
            </option>
          ) : (
            Object.entries(models).filter(([modelId,model])=>modelId!==scanRule.modelId).map(([modelId, model]) => (
              <option key={modelId} value={modelId}>
                {model.name}
              </option>
            ))
          )
        }
      </select>
    </div>
    <div className={modifyScanRuleStyle.formGroup}>
      <label>{tl("URL Patterns")}</label>
      <input
        className={modifyScanRuleStyle.input}
        value={scanRule.urlPatterns.join(", ")}
        onChange={(e) => ({ ...scanRule, urlPatterns: e.target.value.split(",").map(s=>s.trim()) })}
        placeholder="*"
      />
    </div>
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