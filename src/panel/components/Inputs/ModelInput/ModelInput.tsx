import useAnkiConnectionStore from "@/panel/stores/useAnkiConnectionStore";
import { useState } from "react";
import SimpleSelect from "../SimpleSelect/SimpleSelect";
import useLocale from "@/panel/hooks/useLocale";
const ModelInput = ({setModelId, defaultModelId}:{setModelId: (modelId:string)=>void, defaultModelId: string}) => {
  const {models} = useAnkiConnectionStore();
  const [curVal, setCurVal] = useState(defaultModelId || models[0].id || ''); 
  const onChangeModel = (modelId:string) => {
    if (Object.keys(models).length===0) return;
    setModelId(modelId);
  }
  const tl = useLocale('common');
  return (
    <SimpleSelect label={tl('model')} 
      defaultValue={curVal} 
      options={
        Object.keys(models).length === 0 ? [{key:tl('Anki Connection Error','component.ModelInput'), val:'', isDisabled: true}] :
        [{key:tl('Select a model'), val: '',isDisabled:true},...Object.keys(models).map((modelId) => ({key: modelId, val: models[modelId].name}))]
      }
      onChange={(e)=>{onChangeModel(e.currentTarget.value); setCurVal(e.currentTarget.value);}}
      />
  );
};
export default ModelInput;