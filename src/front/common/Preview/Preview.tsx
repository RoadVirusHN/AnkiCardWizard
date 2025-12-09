import previewStyle from "./preview.module.css";
const Preview = ({html} : {html:string}) => {
  return (<div className={previewStyle.previewWrapper}>
    <div 
    className={previewStyle.preview}
    dangerouslySetInnerHTML={{__html: html}} 
    />
  </div>);
};
export default Preview;