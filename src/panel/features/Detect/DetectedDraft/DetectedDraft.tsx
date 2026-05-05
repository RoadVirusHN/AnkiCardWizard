import useScanRule from "@/panel/stores/useScanRule";
import detectPageStyle from "@/panel/features/Detect/detectPage.module.css";

import DelIcon from "@/public/Icon/Icon-Dump.svg";
import { useNavigate } from "react-router";
import useGlobalVarStore from "@/panel/stores/useGlobalVarStore";
import { Note, ScanRule } from "@/types/scanRule.types";
import { Editor } from "@monaco-editor/react";
import { THEME } from "@/types/app.types";
import useConfigure from "@/panel/stores/useConfigure";
import FieldInput from "./FieldInput";


interface DetectedDraftProps {
  key: string;
  note: Note;
  scanRuleName: String;
  checkAdd: (val:boolean)=>void;
};

const DetectedDraft = ({key, note, scanRuleName, checkAdd}:DetectedDraftProps) => {
   const navigate = useNavigate();
   const {notes, removeNote,updateNote} = useScanRule();
   const {setCurrentDetected, currentDetected} = useGlobalVarStore();
   const {themeOption} = useConfigure();
   return (  
    <article className={detectPageStyle.detectedDraftContainer} onClick={()=>{navigate(`/previewCard/${key}`)}}>
      <input type="checkbox" onChange={e=>{checkAdd(e.target.checked)}} onClick={e=>e.stopPropagation()}/>
      <div className={detectPageStyle.detectedDraftContent}>
        <div style={{display: 'flex'}}>
          <span className={detectPageStyle.scanRuleName} >{scanRuleName}</span>
        </div>
        {
          note.fields.map((item)=>{
            return <FieldInput field={item}/>
          })
        }
      </div>
      <div className={detectPageStyle.delButton}>
        <img src={DelIcon} onClick={(e)=>{
          e.stopPropagation();
          removeNote(key);
          setCurrentDetected(currentDetected - 1);
        }} style={{cursor: 'pointer'}}/>
      </div>
    </article>);
};
export default DetectedDraft;