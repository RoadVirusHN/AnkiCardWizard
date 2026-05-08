import { useState } from "react";
import useScanRule from "@/panel/stores/useScanRule";
import useLocale from "@/panel/hooks/useLocale";
import SimpleSelect from "../SimpleSelect/SimpleSelect";

const ScanRuleInput = ({setScanRule, defaultScanRule}:{setScanRule: (model:string)=>void, defaultScanRule: string}) => {
  const {scanRules: scanRules} = useScanRule();
  const [curVal, setCurVal] = useState(defaultScanRule || 'Empty'); 
  const onChangeModel = (scanRule:string) => {
    if (scanRules.length===0) return;
    setScanRule(scanRule);
  }
  const tl = useLocale('common');
  return (
    <SimpleSelect label={tl('scanRules')}
      defaultValue={curVal} 
      options={
       [{key:tl('empty'), val:''}, ...scanRules.map((scanRule) => ({key: scanRule.scanRuleName, val: scanRule.scanRuleName}))]
      }
      onChange={(e)=>{onChangeModel(e.currentTarget.value); setCurVal(e.currentTarget.value);}}
    />
  );
};
export default ScanRuleInput;