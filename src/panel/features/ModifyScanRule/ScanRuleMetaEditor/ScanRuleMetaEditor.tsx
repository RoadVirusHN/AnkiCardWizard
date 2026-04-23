import { ScanRule } from "@/types/scanRule.types";
import modifyScanRuleStyle from "../modifyScanRule.module.css";
import useLocale from "@/panel/hooks/useLocale";

interface Props {
  data : ScanRule;
  setData: (data: ScanRule) => void;
}
const ScanRuleMetaEditor = ({data, setData}:Props) => {  
  
  // 공통 핸들러: 깊은 객체 업데이트 헬퍼
  const updateMeta = (key: string, value: unknown) => {
    setData({ ...data, meta: { ...data.meta, [key]: value } });
  };
  const tl = useLocale('pages.ModifyScanRule.ScanRuleMetaEditor');
  
  return (<div className={modifyScanRuleStyle.settingsForm}>
  <div className={modifyScanRuleStyle.formGroup}>
    <label>{tl("ScanRule Name")} <span className={modifyScanRuleStyle.req}>*</span></label>
    <input
      className={modifyScanRuleStyle.input}
      value={data.scanRuleName}
      onChange={(e) => setData({ ...data, scanRuleName: e.target.value })}
      placeholder="e.g. Eng-Kor Words"
    />
  </div>

  <div className={modifyScanRuleStyle.row}>
    <div className={modifyScanRuleStyle.formGroup}>
      <label>{tl("Author")}</label>
      <input
        className={modifyScanRuleStyle.input}
        value={data.meta.author || ""}
        onChange={(e) => updateMeta("author", e.target.value)}
      />
    </div>
    <div className={modifyScanRuleStyle.formGroup}>
      <label>{tl("Version")}</label>
      <input
        className={modifyScanRuleStyle.input}
        value={data.meta.version || ""}
        onChange={(e) => updateMeta("version", e.target.value)}
      />
    </div>
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