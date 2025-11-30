import useTemplate, { Template } from "@/front/utils/useTemplates";
import templateDetailStyle from "./templateDetail.module.css";
import DownSvg from "@/public/Icon/Icon-Down.svg"
import DumpSvg from "@/public/Icon/Icon-Dump.svg";
const TemplateDetail = ({template}:{template: Template}) => {
  const {removeTemplate} = useTemplate();

  
  return (<div className={templateDetailStyle.template}>
    <h2>{template.templateName}</h2>
    {template.meta.description}
    <DumpSvg onClick={()=>{
      if (confirm(`정말 "${template.templateName}" 카드를 삭제하시겠습니까?`)){
        removeTemplate(template.templateName);
      }
    }}/>
  </div>);
};
export default TemplateDetail;