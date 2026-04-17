import Icon from "@/panel/components/Icon/Icon";
import TemplateDetail from "@/panel/features/Templates/TemplateDetail/TemplateDetail";
import useTemplate from "@/panel/stores/useTemplates";
import AddIcon from "@/public/Icon/Icon-Add.svg";
import { useNavigate } from "react-router";

const TemplatesPage = ({}) => {
  const {templates} = useTemplate();  
  const navigate = useNavigate();
  return (<div>
    <Icon url={AddIcon} handleClick={()=>{
      navigate("/templates/modify");
    }}
    style={{cursor: "pointer"}}/>  
    {templates.map((template,idx)=>
    <TemplateDetail key={template.templateName} idx={idx} template={template} />)}
  </div>);
};
export default TemplatesPage;