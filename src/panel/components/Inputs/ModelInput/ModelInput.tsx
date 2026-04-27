import useAnkiConnectionStore from "@/panel/stores/useAnkiConnectionStore";
import { useState } from "react";
import { useTranslation } from "react-i18next";
const ModelInput = ({setModelId, defaultModelId}:{setModelId: (modelId:string)=>void, defaultModelId: string}) => {
  const {models} = useAnkiConnectionStore();
  const [curVal, setCurVal] = useState(defaultModelId || models[0].id || ''); 
  const onChangeModel = (modelId:string) => {
    if (Object.keys(models).length===0) return;
    setModelId(modelId);
  }
  const [t] = useTranslation();
  return (
    <div>
      <label htmlFor="model-select">
        {t('common.model')}
      </label>
      <select id="model-select" name="model-select" style={{height: '20px', width: '180px'}} onChange={(e)=>{
        onChangeModel(e.currentTarget.value); 
        setCurVal(e.currentTarget.value);
      }} value={curVal}>
        {Object.keys(models).length > 0 ? Object.entries(models).map(([modelId,model]) => <option key={modelId} value={modelId}>{model.name}</option>) : (
          <option value=''>{t('component.ModelInput.Anki Connection Error')}</option>          
        )}
      </select>
    </div>
  );
};
export default ModelInput;