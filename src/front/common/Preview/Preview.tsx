import DOMPurify from "dompurify";
import previewStyle from "./preview.module.css";
import { useState } from "react";
import root from "react-shadow";

/*
  자바스크립트 차단(기본) : Dompurify 자바스크립트 완전 삭제, 외부 링크 접속 url시 경고, shadow Dom으로 CSS, fixed pos 방지
  자바스크립트 허용 : Dompurify + iframe 태그를 이용한 자바스크립 실행, 외부 링크 접속 url시 경고
  폰트는 없을때 기본 폰트 사용, href, src에는 https만 허용, data:는 이미지에만 허용
  외부 이미지 error시 대체 텍스트 표시
  입력길이 제한


*/

enum PreviewMode {
  SAFE = 'safe',
  ALLOW_JS = 'allow-js',
}
const Preview = ({html} : {html:string}) => {
  const sanitizedHtml = DOMPurify.sanitize(html, {
    RETURN_TRUSTED_TYPE: true,
  });
  const [mode, setMode] = useState<PreviewMode>(PreviewMode.SAFE);

  return (
  <div>
    <div className={previewStyle.modeSelector}>
      <label>
        <input 
          type="radio" 
          name="previewMode" 
          value={PreviewMode.SAFE} 
          checked={mode === PreviewMode.SAFE} 
          onChange={() => setMode(PreviewMode.SAFE)} 
        />
        Safe Mode
      </label>
      <label>
        <input 
          type="radio" 
          name="previewMode" 
          value={PreviewMode.ALLOW_JS} 
          checked={mode === PreviewMode.ALLOW_JS} 
          onChange={() => setMode(PreviewMode.ALLOW_JS)} 
        />
        Allow JavaScript
      </label>
    </div>
    {
      mode === PreviewMode.SAFE ?
      <root.div className={previewStyle.previewWrapper}>
        <div 
        className={previewStyle.preview}
        dangerouslySetInnerHTML={{__html: sanitizedHtml}} 
        />
      </root.div> :
      <div className={previewStyle.previewWrapper}>
        <iframe 
          className={previewStyle.preview} 
          srcDoc={sanitizedHtml.toString()} 
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          title="Preview Frame"
        />
      </div>
    }
  </div>);
};
export default Preview;