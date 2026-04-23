import ReturnIcon from "@/public/Icon/Icon-Return.svg";
import SaveIcon from "@/public/Icon/Icon-Save.svg";
import CancleIcon from "@/public/Icon/Icon-Reset.svg";
import modifyScanRuleStyle from "../modifyScanRule.module.css";
import previewCardStyle from "@/panel/features/PreviewCard/previewCard.module.css";
import { useNavigate } from "react-router";
import useLocale from "@/panel/hooks/useLocale";
interface Props {
  title: string;
  isChanged: boolean;
  onSave: () => void;
  onCancle: () => void;
}
const ModifyScanRuleHeader = ({title, isChanged, onSave, onCancle}: Props) => {
  const navigate = useNavigate();
  const tl = useLocale('pages.ModifyScanRule.ModifyScanRuleHeader');
 return (<div className={modifyScanRuleStyle.header}>
    <div className={modifyScanRuleStyle.headerLeft}>
      <img src={ReturnIcon} onClick={() => navigate("/scanRules")} />
      <span className={modifyScanRuleStyle.title}>{title}</span>
    </div>
    <div className={previewCardStyle.modBtns} style={{visibility: isChanged ? "visible" : "hidden"}}>
      <img src={CancleIcon} title={tl('Back to Empty')} onClick={onCancle} style={{'cursor': 'pointer', margin:'5px'}}/>
      <img src={SaveIcon} title={tl('Save', 'common')} onClick={onSave} style={{'cursor': 'pointer', margin: '5px'}}/>
    </div>
  </div>);
};
export default ModifyScanRuleHeader;