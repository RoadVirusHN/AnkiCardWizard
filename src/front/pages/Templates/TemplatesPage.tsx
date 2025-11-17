import TemplateDetail from "@/front/components/pages/Templates/TemplateDetail/TemplateDetail";
import useTemplate from "@/front/utils/useTemplates";

const TemplatesPage = ({}) => {
  const {templates} = useTemplate();
  return <div>{templates.map((template)=><TemplateDetail template={template} />)}</div>;
};
export default TemplatesPage;