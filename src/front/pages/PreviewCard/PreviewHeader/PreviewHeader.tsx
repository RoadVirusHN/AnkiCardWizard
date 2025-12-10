import ReturnIcon from "@/public/Icon/Icon-Return.svg";
import PreviewIcon from "@/public/Icon/Icon-Preview.svg";
import CancleIcon from "@/public/Icon/Icon-Reset.svg";
import SaveIcon from "@/public/Icon/Icon-Save.svg";
import CodeIcon from "@/public/Icon/Icon-Code.svg";
import previewCardStyle from "../previewCard.module.css";
import commonStyle from "@/front/common.module.css";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import useTemplate from "@/front/utils/useTemplates";
import { PreviewContext } from "../PreviewContext";
const PreviewHeader = () => {
  const {contextValue, setContextValue} = useContext(PreviewContext);
  const {notes, templates, updateNote} = useTemplate();
  const {curNote, isModifying, isChanged, idx} = contextValue; 
  const templateIdx = Number(idx.split('-')[0]);
  const navigate = useNavigate();
  return (<div className={previewCardStyle.header}>
    <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
      <ReturnIcon onClick={()=>{navigate('/')}} style={{'cursor': 'pointer'}}/> 
      <h2>{templates[templateIdx].templateName}</h2>
    </div>
    <div className={commonStyle.toggle}>
      <div className={previewCardStyle.modBtns} style={{visibility: isChanged ? "visible" : "hidden"}}>
        <CancleIcon  onClick={()=>{
          setContextValue({...contextValue, curNote: notes[idx],isChanged:false});
          }} style={{'cursor': 'pointer', margin:'5px'}}/>
        <SaveIcon  onClick={()=>{
          updateNote(idx,{...curNote});
          setContextValue({...contextValue,isChanged:false});
          }} style={{'cursor': 'pointer', margin: '5px'}}/>
      </div>
      <PreviewIcon />
      <label className={commonStyle.switch}>
        <input type="checkbox" onChange={(e)=>{
          setContextValue({...contextValue,isModifying:e.target.checked});
        }}/>
        <span className={commonStyle.slider} title={isModifying ? "Modify" : "Preview"}/>
      </label>
      <CodeIcon />
    </div>
  </div>);
};
export default PreviewHeader;