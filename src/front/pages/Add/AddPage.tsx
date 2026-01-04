import ReturnIcon from "@/public/Icon/Icon-Return.svg";
import PreviewIcon from "@/public/Icon/Icon-Preview.svg";
import AddIcon from "@/public/Icon/Icon-Add.svg";
import SaveIcon from "@/public/Icon/Icon-Save.svg";
import CodeIcon from "@/public/Icon/Icon-Code.svg";
import addPageStyle from "./addPage.module.css";
import commonStyle from "@/front/common.module.css";
import InspectionButton from "@/front/common/InspectionButton/InspectionButton";
import useTemplate from "@/front/utils/useTemplates";
import Preview from "@/front/common/Preview/Preview";
import { Editor } from "@monaco-editor/react";
import Tags from "@/front/common/Tags/Tags";
import { useNavigate } from "react-router";
import useAnkiConnectionStore from "@/front/utils/useAnkiConnectionStore";
import ModelInput from "@/front/common/Inputs/ModelInput/ModelInput";
import { useState } from "react";
const AddPage = ({}) => {
  // TODO : templates 혹은 default template를 이용해서 카드를 추가하는 기능
  // 사용자가 기본값을 변경했으면 나갈때 경고창을 띄우는 기능
  const {models} = useAnkiConnectionStore();
  const [curModel, setCurModel] = useState(models[0] || '');
  const [isChanged, setIsChanged] = useState(false);
  const [isModifying, setIsModifying] = useState(true);
  const navigate = useNavigate();
  return <div>
    <div className={addPageStyle.header}>
      <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
        <img src={ReturnIcon} onClick={()=>{navigate('/')}} style={{'cursor': 'pointer'}}/> 
        <ModelInput defaultModel={models[0]} setModel={setCurModel}/>
      </div>
      <div className={commonStyle.toggle}>
        <div className={addPageStyle.modBtns} style={{visibility: isChanged ? "visible" : "hidden"}}>
          <img src={SaveIcon}  onClick={()=>{
            updateNote(idx,{...curNote});
            setContextValue({...contextValue,isChanged:false});
          }} style={{'cursor': 'pointer', margin: '5px'}}/>
          <img src={AddIcon}  onClick={()=>{
            setContextValue({...contextValue, curNote: notes[idx],isChanged:false});
            }} style={{'cursor': 'pointer', margin:'5px'}}/>
        </div>
        <img src={PreviewIcon} />
        <label className={commonStyle.switch}>
          <input type="checkbox" onChange={(e)=>{
            setContextValue({...contextValue,isModifying:e.target.checked});
          }}/>
          <span className={commonStyle.slider} title={isModifying ? "Modify" : "Preview"}/>
        </label>
        <img src={CodeIcon} />
      </div>
    </div>
      {<section className={addPageStyle.previewPage}>{
          isModifying ? 
            (<ModelInput setModel={(modelName:string)=>setContextValue({
              ...contextValue,
              curNote: {...curNote, modelName},
              isChanged:true
            })} defaultModel={curNote.modelName}/>) : 'Model :' + curNote.modelName
        }
          <Tags givenTags={curNote.tags} isModifying={isModifying} 
          onAddTag={(tag)=>{
            setContextValue({...contextValue,
              curNote: {...curNote, tags: [...curNote.tags, tag]},
              isChanged:true});
          }} 
          onRemoveTag={(tag)=>{
            setContextValue({...contextValue, 
              curNote: {...curNote, tags: curNote.tags.filter(t=>t!==tag)},
              isChanged:true});
          }}/>
          <h3>front preview {isModifying ? <InspectionButton mode={InspectionMode.TEXT_EXTRACTION} setResult={setResult}/> : ''}</h3>
          {
            isModifying ?
            (<Editor
              defaultLanguage="html"
              value={curNote.fields.Front}
              width='100%'
              height='200px'
              onChange={(value)=>{
                setContextValue({...contextValue,
                  curNote:{...curNote, fields: {...curNote.fields, Front: value || ''}},
                  isChanged:true});
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
          <h3>back preview {isModifying ? <InspectionButton mode={InspectionMode.TEXT_EXTRACTION} setResult={setResult}/> : ''}</h3>
          {
            isModifying ? 
            (<Editor
              defaultLanguage="html"
              value={curNote.fields.Back}
              width='100%'
              height='200px'
              onChange={(value)=>{
                setContextValue({...contextValue,
                  curNote:{...curNote, fields: {...curNote.fields, Back: value || ''}},
                  isChanged:true});
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

  </div>;
};
export default AddPage;