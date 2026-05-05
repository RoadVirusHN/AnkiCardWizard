import { Editor } from "@monaco-editor/react";

const FieldInput = ({field}:{field:{key:string; content:string;}}) => {
  return <div>
    <label htmlFor="">{field.key}</label>
    <p>{field.content}</p>
    {/* <Editor 
      className={detectPageStyle.field}
      defaultLanguage="html"
      value={item.content}
      onChange={(v)=>{updateNote(key, {...note, fields: note.fields.map(f=>f.key===item.key ? {...f, content: v ?? ''} : f)})}}
      theme={themeOption.theme==THEME.DARK ? "vs-dark" : "light"}
    /> */}

  </div>;
};
export default FieldInput;