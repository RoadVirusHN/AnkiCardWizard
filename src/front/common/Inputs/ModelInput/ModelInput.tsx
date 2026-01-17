import useAnkiConnectionStore from "@/front/utils/useAnkiConnectionStore";
import { useState } from "react";
import { useTranslation } from "react-i18next";
const ModelInput = ({setModel, defaultModel}:{setModel: (model:string)=>void, defaultModel: string}) => {
  const {models} = useAnkiConnectionStore();
  const [curVal, setCurVal] = useState(defaultModel || models[0] || ''); 
  const onChangeModel = (model:string) => {
    if (models.length===0) return;
    setModel(model);
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
        {models.length > 0 ? models.map((model) => <option key={model} value={model}>{model}</option>) : (
          <option value=''>{t('component.ModelInput.Anki Connection Error')}</option>          
        )}
      </select>
    </div>
  );
};
export default ModelInput;