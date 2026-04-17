import useTemplate from "@/panel/stores/useTemplates";
import templateDetailStyle from "./templateDetail.module.css";
import ModifySvg from "@/public/Icon/Icon-Modify.svg";
import DumpSvg from "@/public/Icon/Icon-Dump.svg";
import { useNavigate } from "react-router";
import { Template } from "@/types/scanRule.types";
const TemplateDetail = ({template, idx}:{template: Template, idx: number}) => {
  const {removeTemplate} = useTemplate();
  const navigate = useNavigate();
  
  return (<div className={templateDetailStyle.template}>
    <h2>{template.templateName}</h2>
    {template.meta.description}
    {template.tags}
    <img src={DumpSvg} 
    onClick={()=>{
      if (confirm(`정말 "${template.templateName}" 카드를 삭제하시겠습니까?`)){
        removeTemplate(template.templateName);
      }
    }}/>
    <img src={ModifySvg} onClick={()=>{
      navigate(`/templates/modify/${idx}`);
    }}/>
  </div>);
};
export default TemplateDetail;