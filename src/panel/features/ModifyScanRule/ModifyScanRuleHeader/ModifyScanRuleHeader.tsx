import ReturnIcon from "@/public/Icon/Icon-Return.svg";
import modifyScanRuleStyle from "../modifyScanRule.module.css";
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
  </div>);
};
export default ModifyScanRuleHeader;