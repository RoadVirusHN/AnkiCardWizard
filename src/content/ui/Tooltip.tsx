import commonStyles from "./common.module.css";
const Tooltip = ({text, pos:{x,y}}:{text:string, pos:{x:number,y:number}}) => {
  return <div className={commonStyles["extension-tooltip"]} style={{
    top: y + 10,
    left: x + 10,
  }}>
    {text}
  </div>;
};
export default Tooltip;