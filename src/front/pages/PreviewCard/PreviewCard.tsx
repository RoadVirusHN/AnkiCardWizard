import useTemplate from "@/front/utils/useTemplates";
import previewCardStyle from "./previewCard.module.css";
import commonStyle from "@/front/common.module.css";
import { useNavigate, useParams } from "react-router";
import ReturnIcon from "@/public/Icon/Icon-Return.svg";
import PreviewIcon from "@/public/Icon/Icon-Preview.svg";
import CancleIcon from "@/public/Icon/Icon-Reset.svg";
import SaveIcon from "@/public/Icon/Icon-Save.svg";
import CodeIcon from "@/public/Icon/Icon-Code.svg";
import { useState } from "react";
import Tags from "@/front/common/Tags/Tags";
import { Editor } from "@monaco-editor/react";
import InspectionButton from "@/front/common/InspectionButton/InspectionButton";
import Preview from "@/front/common/Preview/Preview";

const PreviewCard = ({}) => {
  const {index} = useParams();
  const [isModifying, setIsModifying] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const {notes, templates, updateNote} = useTemplate();
  const idx = index ?? '0-0';
  const [curNote, setCurNote] = useState(notes[idx]);
  const [curText, setCurText] = useState('');
  const templateIdx = Number(idx.split('-')[0]);
  const navigate = useNavigate();
  return (<div>
    <div className={previewCardStyle.header}>
      <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
        <ReturnIcon onClick={()=>{navigate('/')}} style={{'cursor': 'pointer'}}/> 
        <h2>{templates[templateIdx].templateName}</h2>
      </div>
      <div className={commonStyle.toggle}>
        <div className={previewCardStyle.modBtns} style={{visibility: isChanged ? "visible" : "hidden"}}>
          <CancleIcon  onClick={()=>{
            setCurNote(notes[idx]);
            setIsChanged(false);
            }} style={{'cursor': 'pointer', margin:'5px'}}/>
          <SaveIcon  onClick={()=>{
            updateNote(idx,{...curNote});
            setIsChanged(false);
            }} style={{'cursor': 'pointer', margin: '5px'}}/>
        </div>
        <PreviewIcon />
        <label className={commonStyle.switch}>
          <input type="checkbox" onChange={(e)=>{
            setIsModifying(e.target.checked);
            }}/>
          <span className={commonStyle.slider} title={isModifying ? "Modify" : "Preview"}/>
        </label>
        <CodeIcon />
      </div>
    </div>
    {
      <section className={previewCardStyle.previewPage}>
        <div style={{display: 'flex', margin: '5px'}}>
          <h2 style={{margin: '0'}}> {curNote.modelName}</h2>
          <Tags givenTags={curNote.tags} isModifying={isModifying} 
          onAddTag={(tag)=>{
            setCurNote({...curNote, tags: [...curNote.tags, tag]});
            setIsChanged(true);
          }} 
          onRemoveTag={(tag)=>{
            setCurNote({...curNote, tags: curNote.tags.filter(t=>t!==tag)});
            setIsChanged(true);
          }}/>
        </div>
        {curText}

        <h3>front preview{isModifying ? <InspectionButton setResult={setCurText}/> : ''}</h3>
        {
          isModifying ?
          (<Editor
            defaultLanguage="html"
            value={curNote.fields.Front}
            width='100%'
            height='200px'
            onChange={(value)=>{
              setCurNote({...curNote, fields: {...curNote.fields, Front: value || ''}}); 
              setIsChanged(true);
            }}
            onMount={(editor)=>{
              editor.onDidFocusEditorText(()=>{
              });
              editor.onDidBlurEditorText(()=>{
              });
            }}
            />) :
            <Preview html={curNote.fields.Front}/>
        }
        <h3>back preview</h3>
        {
          isModifying ? 
          (<Editor
            defaultLanguage="html"
            value={curNote.fields.Back}
            width='100%'
            height='200px'
            onChange={(value)=>{
              setCurNote({...curNote, fields: {...curNote.fields, Back: value || ''}}); 
              setIsChanged(true);
            }}
            onMount={(editor)=>{
              editor.onDidFocusEditorText(()=>{
              });
              editor.onDidBlurEditorText(()=>{
              });
            }}
            />)
          : <Preview html={curNote.fields.Back}/>
        }
      </section>      
    }
  </div>);
};
export default PreviewCard;