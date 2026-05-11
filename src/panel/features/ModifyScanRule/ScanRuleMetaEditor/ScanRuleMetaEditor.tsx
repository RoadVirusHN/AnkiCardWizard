import { ScanRule } from "@/types/scanRule.types";
import modifyScanRuleStyle from "../modifyScanRule.module.css";
import useLocale from "@/panel/hooks/useLocale";
import SimpleSelect from "@/panel/components/Inputs/SimpleSelect/SimpleSelect";
import SimpleInput from "@/panel/components/Inputs/SimpleInput/SimpleInput";

interface Props {
  data : ScanRule;
  setData: (data: ScanRule) => void;
}
const ScanRuleMetaEditor = ({data, setData}:Props) => {  
  
  const updateMeta = (key: string, value: unknown) => {
    setData({ ...data, meta: { ...data.meta, [key]: value } });
  };
  const tl = useLocale('pages.ModifyScanRule.ScanRuleMetaEditor');
  
  return (<div className={modifyScanRuleStyle.settingsForm}>
    <SimpleInput 
      label={<>{tl("ScanRule Name")} <span className={modifyScanRuleStyle.req}>*</span></>} 
      placeholder="e.g. eng-kor-words"
      defaultValue={data.scanRuleName}
      onChange={(e) => setData({ ...data, scanRuleName: e.target.value })}
    />

  <div className={modifyScanRuleStyle.row}>
    <SimpleInput 
      label={tl("Author")} 
      defaultValue={data.meta.author || ""}
      onChange={(e) => updateMeta("author", e.target.value)}
    />
    <SimpleInput
      label={tl("Version")}
      defaultValue={data.meta.version || ""}
      onChange={(e) => updateMeta("version", e.target.value)}
    />
  </div>
    
  
  <div className={modifyScanRuleStyle.formGroup}>
    <label>{tl("Description")}</label>
    <textarea
      className={modifyScanRuleStyle.textarea}
      value={data.meta.description || ""}
      onChange={(e) => updateMeta("description", e.target.value)}
      rows={3}
    />
  </div>
</div>);
};
export default ScanRuleMetaEditor;