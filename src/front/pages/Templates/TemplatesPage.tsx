import TemplateDetail from "@/front/components/pages/Templates/TemplateDetail/TemplateDetail";
import useTemplate from "@/front/utils/useTemplates";
import AddIcon from "@/public/Icon/Icon-Add.svg";
import { NavLink } from "react-router";

const TemplatesPage = ({}) => {
  const {templates} = useTemplate();  
  return (<div>
    <NavLink to={`/modify`} style={{cursor: 'pointer'}}><AddIcon/></NavLink>  
    {templates.map((template)=><TemplateDetail template={template} />)}
  </div>);
};
export default TemplatesPage;