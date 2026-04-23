import { useState, forwardRef, useImperativeHandle } from "react";
import scanRuleFieldStyle from "./scanRuleFieldInput.module.css";
import useLocale from "@/panel/hooks/useLocale";
import { FIELD_DATA_TYPES  } from "@/types/scanRule.types";

/**
 * 외부에 노출되는 ref 메서드들
 */
export interface ScanRuleItemInputRef {
  getItems: () => ScanRuleItem[]; // locked 속성 제거된 배열 반환
  clearItems: () => void;
  setDefaultItems: (fields: (ScanRuleItem & { locked?: boolean })[], lock?: boolean) => void;
}

interface ScanRuleItemInputProps {
  defaultValue?: (ScanRuleItem & { locked?: boolean })[];
}

type InternalItem = ScanRuleItem & { locked?: boolean };

const _ScanRuleFieldInput = forwardRef<ScanRuleItemInputRef, ScanRuleItemInputProps>(
  ({ defaultValue = [] }, ref) => {
    const [items, setItems] = useState<InternalItem[]>(() =>
      (defaultValue || []).map((f) => ({ ...f }))
    );

    useImperativeHandle(ref, () => ({
      getItems: () => items.map(({ locked, ...rest }) => rest),
      clearItems: () => setItems([]),
      setDefaultItems: (flds, lock = false) => {
        setItems((prev) => [
          ...flds.map((f) => ({ ...f, locked: lock || f.locked })),
          ...prev.filter((p) => !p.locked), // 기존 잠긴 것들은 유지, 비잠긴것은 뒤에 붙음
        ]);
      },
    }));

    const addField = () => {
      setItems((prev) => [
        ...prev,
        { name: "", content: "", dataType: FIELD_DATA_TYPES.TEXT, locked: false, isOptional: true},
      ]);
    };

    const updateField = (index: number, key: keyof ScanRuleItem, value: string|boolean) => {
      setItems((prev) =>
        prev.map((f, i) => (i === index ? { ...f, [key]: value } : f))
      );
    };

    const removeField = (index: number) => {
      setItems((prev) => prev.filter((_, i) => i !== index));
    };
    const tl = useLocale('pages.ModifyScanRule.ScanRuleSideEditor.ScanRuleFieldInput');
    return (
      <div className={scanRuleFieldStyle.container}>
        {items.map((field, i) => (
          <div key={i} className={scanRuleFieldStyle.fieldRow}>
            <input
              type="text"
              className={`${scanRuleFieldStyle.input} ${scanRuleFieldStyle.name}`}
              placeholder={tl("Name",'pages.ModifyScanRule.ScanRuleSideEditor.')}
              value={field.name}
              onChange={(e) => updateField(i, "name", e.target.value)}
            />
            <input
              type="text"
              className={`${scanRuleFieldStyle.input} ${scanRuleFieldStyle.content}`}
              placeholder={tl("content")}
              value={field.content}
              onChange={(e) => updateField(i, "content", e.target.value)}
            />
            <select
              className={`${scanRuleFieldStyle.select} ${scanRuleFieldStyle.datatype}`}
              value={field.dataType}
              onChange={(e) => updateField(i, "dataType", e.target.value)}
            >
              <option value="text">{tl('Text','pages.ModifyScanRule.ScanRuleSideEditor.')}</option>
              <option value="audio">{tl('Audio','pages.ModifyScanRule.ScanRuleSideEditor.')}</option>
              <option value="image">{tl('Image','pages.ModifyScanRule.ScanRuleSideEditor.')}</option>
            </select>

            <input 
            type="checkbox" 
            checked={field.isOptional} 
            onChange={(e)=>updateField(i,"isOptional", e.target.checked)}
            />

            {/* 삭제 버튼은 locked일 때 숨김 */}
            {!field.locked && (
              <button
                type="button"
                className={scanRuleFieldStyle.removeBtn}
                onClick={() => removeField(i)}
                title={tl("Remove field")}
              >
                ×
              </button>
            )}

            {field.locked && (
              <div className={scanRuleFieldStyle.lockBadge} title={tl("Required")}>
                🔒
              </div>
            )}
          </div>
        ))}

        <div className={scanRuleFieldStyle.controls}>
          <button type="button" onClick={addField} className={scanRuleFieldStyle.addBtn}>
            {"+ " + tl('Add Field')}
          </button>
        </div>
      </div>
    );
  }
);

export default _ScanRuleFieldInput;
