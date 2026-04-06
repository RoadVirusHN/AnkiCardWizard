import useTemplates, { TEMPLATE_CODE, TemplateItemDataType} from "@/front/utils/useTemplates";
import { useParams } from "react-router";
import { useState } from "react";
import modifyTemplateStyle from "./modifyTemplate.module.css";
import type { Template } from "@/front/utils/useTemplates";
import TemplateFieldEditor from "./TemplateFieldEditor/TemplateFieldEditor";
import TemplateMetaEditor from "./TemplateMetaEditor/TemplateMetaEditor";
import TemplateCommonEditor from "./TemplateCommonEditor/TemplateCommonEditor";
import ModifyTemplateHeader from "./ModifyTemplateHeader/ModifyTemplateHeader";
import useLocale from "@/front/utils/useLocale";

const emptyTemplate: Template = {
    templateName: "",
    meta: { author: "", description: "", version: "0.0.1" },
    modelName: "Basic",
    urlPatterns: ["*"],
    rootTag: "div.word",
    tags: [],
    fields: [
      {name: "Front", html: "<h2>{{front}}</h2>", items: [{name: "front", content: "h1", dataType: TemplateItemDataType.TEXT,isOptional: false}], priority:1 },
      {name:"Back", html: "<p>{{back}}</p>", items: [{name: "back", content: "p", dataType: TemplateItemDataType.TEXT,isOptional: false}], priority:2 },
    ]
};


const ModifyTemplate = () => {
  // BUGS : NO DEFAULT FIELDS (FRONT/BACK) CHECKED
  const { index } = useParams();
  const isEditMode = index !== undefined;
  const idx = isEditMode ? parseInt(index) : undefined;
  const { templates, addTemplate, modifyTemplate } = useTemplates();
  const currentTemplate = isEditMode && idx !== undefined ? templates[idx] : emptyTemplate;  
  const tl = useLocale('pages.ModifyTemplate');
  const tabs = ["meta", "common", ...currentTemplate.fields.map(f => f.name.toLowerCase())];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [templateData, setTemplateData] = useState<Template>(currentTemplate);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const changeTemplatData = (updatedData: Template) => {
    setIsChanged(true);
    setTemplateData(updatedData);
  };
  const handleSave = () => {
    const code = isEditMode && idx !== undefined ? 
      modifyTemplate(templates[idx].templateName, templateData) :
      addTemplate(templateData);
    if (code===TEMPLATE_CODE.OK) {
      setIsChanged(false);
    } else {
      alert(`Error occurred: ${code}`);
      return;
    }
  };

  const handleCancle = () => {
    setTemplateData(currentTemplate);
    setIsChanged(false);
  };
  

return (
    <div className={modifyTemplateStyle.container}>
      <ModifyTemplateHeader 
        title={isEditMode ? tl("modify template") : tl("new template")}
        isChanged={isChanged}
        onSave={handleSave}
        onCancle={handleCancle}
      />
      <div className={modifyTemplateStyle.tabs}>
        {tabs.map(tab => 
          <button
            key={tab}
            className={`${modifyTemplateStyle.tab} ${activeTab === tab ? modifyTemplateStyle.activeTab : ""}`}
            onClick={() => setActiveTab(tab)}>
            {tl(tab)}
          </button>)}
      </div>
      <div className={modifyTemplateStyle.content}>        
        {activeTab === "meta" && (
          <TemplateMetaEditor 
            data={templateData} 
            setData={changeTemplatData}/>)}
        {activeTab === "common" && (
          <TemplateCommonEditor 
            data={templateData} 
            setData={changeTemplatData}/>)}
        {activeTab !== "meta"&&activeTab!=="common" && (
          <TemplateFieldEditor
            fieldName={activeTab}
            template={templateData}
            setData={(newData) => {
              setTemplateData(
                {
                  ...templateData,
                  fields: templateData.fields.map(f => f.name.toLowerCase() === activeTab ? { ...f, ...newData } : f)
                }
              );
              setIsChanged(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ModifyTemplate;
