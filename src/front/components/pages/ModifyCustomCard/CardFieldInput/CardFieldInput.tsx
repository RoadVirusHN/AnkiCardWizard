import { useState, forwardRef, useImperativeHandle } from "react";
import type { CardField } from "@/front/utils/useCustomCard";
import styles from "./cardFieldInput.module.css";

export interface CardFieldInputRef {
  getFields: () => CardField[];
  clearFields: () => void;
}

interface CardFieldInputProps {
  defaultValue: CardField[];
}

//TODO : learn about forwardRef and useImperativeHandle
const CardFieldInput = forwardRef<CardFieldInputRef, CardFieldInputProps>(({ defaultValue }, ref) => {
  const [fields, setFields] = useState<CardField[]>(defaultValue || []);

  useImperativeHandle(ref, () => ({
    getFields: () => fields,
    clearFields: () => setFields([]),
  }));

  const addField = () => {
    setFields((prev) => [
      ...prev,
      { name: "", content: "", selectorType: "literal", dataType: "text" } as CardField,
    ]);
  };

  const updateField = (index: number, key: keyof CardField, value: string) => {
    setFields((prev) =>
      prev.map((f, i) => (i === index ? { ...f, [key]: value } : f))
    );
  };

  const removeField = (index: number) => {
    setFields((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.container}>
      {fields.map((field, i) => (
        <div key={i} className={styles.fieldRow}>
          <input
            type="text"
            className={styles.input}
            placeholder="name"
            name="name"
            value={field.name}
            onChange={(e) => updateField(i, "name", e.target.value)}
          />
          <input
            type="text"
            className={styles.input}
            placeholder="content"
            name="content"
            value={field.content}
            onChange={(e) => updateField(i, "content", e.target.value)}
          />
          <select
            className={styles.select}
            value={field.selectorType}
            onChange={(e) => updateField(i, "selectorType", e.target.value)}
          >
            <option value="literal">Literal</option>
            <option value="cssSelector">CSS</option>
            <option value="url">URL</option>
          </select>
          <select
            className={styles.select}
            value={field.dataType}
            onChange={(e) => updateField(i, "dataType", e.target.value)}
          >
            <option value="text">Text</option>
            <option value="audio">Audio</option>
            <option value="image">Image</option>
          </select>
          <button
            type="button"
            className={styles.removeBtn}
            onClick={() => removeField(i)}
          >
            ×
          </button>
        </div>
      ))}
      <button type="button" onClick={addField} className={styles.addBtn}>
        + Add Field
      </button>
    </div>
  );
});

export default CardFieldInput;
