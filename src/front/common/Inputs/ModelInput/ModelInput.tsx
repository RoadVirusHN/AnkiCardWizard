import useAnkiConnectionStore from "@/front/utils/useAnkiConnectionStore";
import modelInputStyle from "./modeInput.module.css";
import useGlobalVarStore from "@/front/utils/useGlobalVarStore";
const ModelInput = ({setModel, defaultModel}:{setModel: (model:string)=>void, defaultModel: string}) => {
  const {models} = useAnkiConnectionStore();
  console.log(defaultModel);
  const onChangeModel = (model:string) => {
    if (models.length===0) return;
    console.log("model Changed :",model);
    setModel(model);
  }
  return (
    <div className={modelInputStyle.modelInputContainer}>
      <label htmlFor="model-select">
        Model 
      </label>
      <select id="model-select" name="model-select" style={{height: '20px', width: '180px'}} onChange={(e)=>{onChangeModel(e.currentTarget.value)}} value={defaultModel}>
        {models.length>0? models.map((model) => <option key={model} value={model}>{model}</option>) : (
          <> 
            defaultModel && <option key={defaultModel} value={defaultModel}>{defaultModel}</option>
            <option value=''>Check Anki Connection!</option>
          </>
          )}
      </select>
    </div>
  );
};
export default ModelInput;