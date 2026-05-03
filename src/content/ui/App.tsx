import Menu, { MenuItem } from "./Menu";
import Tooltip from "./Tooltip";
import MouseHighlight from "./MouseHighlight";
import { useState } from "react";
import commonStyles from "./common.module.css";
import "./common.css";
import { cssSelectorGenerator } from "css-selector-generator";
import useLocale from "@/panel/hooks/useLocale";
import { CssSelectorGeneratorOptionsInput, CssSelectorType } from "css-selector-generator/types/types";
import { EXTENSION_UI_ID  } from "@/content/constants";
import { INSPECTION_MODE, InspectionMode } from "@/types/app.types";
import { MESSAGE_TYPE } from "@/types/chrome.types";
import SelectorHighlight from "./SelectorHighlight";

const INSPECTION_STATE = {
  HIGHLIGHT: 'HIGHLIGHT',
  MENU: 'MENU',
  TOOLTIP: 'TOOLTIP',
  SELECTOR_CONFIRM: 'SELECT_CONFIRM',
} as const;
type InspectionState = typeof INSPECTION_STATE[keyof typeof INSPECTION_STATE];

const getCommonSelector = (
  el: HTMLElement,
  blacklist: string[] = []
): string => {

  const path: string[] = [];
  let current: HTMLElement | null = el;

  // 2. 부모를 타고 올라가는 루프
  while (current && current.nodeType === Node.ELEMENT_NODE && current.tagName !== 'HTML') {
    const tagName = current.tagName.toLowerCase();
    
    let selector = tagName;

    // ---------------------------------------------------------
    // Class 처리
    // ---------------------------------------------------------
    if (current.className && typeof current.className === 'string') {
      const validClasses = current.className
        .trim()
        .split(/\s+/)
        .filter(cls => cls && !blacklist.includes(cls)); // 블랙리스트 필터링

      if (validClasses.length > 0) {
        selector += `.${validClasses.join('.')}`;
      }
    }

    // ---------------------------------------------------------
    // Attribute 처리 (선택 사항)
    // ---------------------------------------------------------
    // data-* 속성이나 name 등 크롤링에 유용한 속성이 있다면 추가
    const usefulAttrs = ['name', 'data-type', 'role', 'aria-label'];
    Array.from(current.attributes).forEach(attr => {
      if (usefulAttrs.includes(attr.name) || attr.name.startsWith('data-test')) {
        // 값에 공백이나 특수문자가 있을 수 있으므로 따옴표 처리
        selector += `[${attr.name}="${attr.value.replace(/"/g, '\\"')}"]`; 
      }
    });

    path.unshift(selector);
    
    // 부모로 이동
    current = current.parentElement;
    
    // body를 만나면 종료 (너무 상위까지 가면 오히려 노이즈 발생)
    if (current && current.tagName === 'BODY') {
      path.unshift('body'); // 명시적으로 body 시작을 원하면 추가, 아니면 제거 가능
      break;
    }
  }
  // 부모 > 자식 관계 연결
  return path.join(' > ');
};

export const getUniqueSelector = (el: HTMLElement, cssSelectorOptions:CssSelectorGeneratorOptionsInput): string[] => {
  if (!cssSelectorOptions.selectors?.includes('nth-child' as CssSelectorType)) {
    console.log("nonunique")
    return [getCommonSelector(el, cssSelectorOptions.blacklist as string[])];  
  }
  let res = Array.from(cssSelectorGenerator(el, cssSelectorOptions));
  return res;
};
export const uniqueCssSelectorOptions: CssSelectorGeneratorOptionsInput = {
  maxResults: 3, 
  combineWithinSelector: true, // 동일한 요소 내에서 여러 selector 조합 허용 여부
  combineBetweenSelectors: true, // 여러 selector 조합 허용 여부
  blacklist: [EXTENSION_UI_ID, ...Object.values(commonStyles)],
  selectors: ['id', 'class', 'tag', 'nth-child'] as CssSelectorType[],
  includeTag: true, // Css selector에 태그 이름 포함 여부
};
export const nonuniqueCssSelectorOptions: CssSelectorGeneratorOptionsInput = {
  maxResults: 3, 
  blacklist: [EXTENSION_UI_ID, ...Object.values(commonStyles)],
  selectors: ['id', 'class', 'tag', ] as CssSelectorType[],
  includeTag: true, // Css selector에 태그 이름 포함 여부
};

// 요소 유효성 검사
export const isValidElement = (element: HTMLElement) => {
  if (element.tagName === 'HTML' || element.tagName === 'BODY') return false;
  if (
    element.className.includes(commonStyles["extension-tooltip"]) ||
    element.className.includes(commonStyles.highlight) ||
    element.className.includes(commonStyles.menu)  ||
    element.className.includes(commonStyles.header)  ||
    element.id === EXTENSION_UI_ID
  ){
    return false;
  }
  return true;
};

const tagToText = (tag: HTMLElement) => {
  return `<${tag.tagName.toLowerCase()}> ${((tag.textContent&&tag.textContent.length > 15 ? tag.textContent?.trim().slice(0,12) + "..." : tag.textContent) )|| ''}`;
};
//TODO: App doing to much, split to multiple components
// ex) App: manage state, container: position, Highlight: highlight logic, Menu: menu logic, Tooltip: tooltip logic
const App = ({mode, port, cssSelectorOptions, deactivate}:{mode:InspectionMode, port:chrome.runtime.Port, cssSelectorOptions:CssSelectorGeneratorOptionsInput, deactivate:()=>void}) => {
  const [state, setState] = useState(INSPECTION_STATE.HIGHLIGHT as InspectionState);
  const [text, setText] = useState('');
  const [{x,y}, setPosition] = useState({x:0, y:0});  
  const [items, setItems] = useState<MenuItem[]>([] as MenuItem[]);
  const [highlightTargets, setHighlightTargets] = useState<HTMLElement[]>([]);
  const [menuHeader, setMenuHeader] = useState('');
  const tl = useLocale('background');
  const showTooltip = (text: string, x: number, y: number) => {
    setState(INSPECTION_STATE.TOOLTIP);
    setText(text);
    setPosition({ x, y });
    port.postMessage({ type: MESSAGE_TYPE.SEND_INSPECTION_DATA_FROM_CONTENT, data: text });
    setTimeout(() => {
      deactivate();
    }, 2000); // 2초 후에 툴팁 숨김
  };

  const showMenu = (items:MenuItem[], x: number, y: number, header:string) => {
    setState(INSPECTION_STATE.MENU);
    setItems(items);
    setPosition({ x, y });
    setMenuHeader(header);
     // 메뉴 표시 후 클릭 이벤트가 메뉴 외부에서 발생하면 메뉴 숨김
     const handleClickOutside = (e: MouseEvent) => {
      if (!e.target || !(e.target instanceof HTMLElement)) return;
      if (!e.target.closest(`div.${CSS.escape(commonStyles.menu)}`)) {
        setState(INSPECTION_STATE.HIGHLIGHT);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }
  // 클립보드 복사 및 툴팁 표시
  const copyToClipboard = (text: string, x: number, y: number, port: chrome.runtime.Port) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showTooltip(text, x, y);
      })
      .catch((err) => console.error(err));
  };

  const createMenuItems = (target:HTMLElement, pos:{x:number,y:number}): MenuItem[] =>{
    const {x,y} = pos;
    return [{key:'📄 ' + tl('Extract Text'), onClick:()=>{
        const text =target.textContent?.trim() || '';
        copyToClipboard(text,x, y, port);
      }},
      {key:'🎯 ' + tl('Extract Selector'), onClick:()=>{
        const selector = getUniqueSelector(target, cssSelectorOptions);
        setItems(Array.from(selector, s=>({key: s, onClick:()=>{
          setState(INSPECTION_STATE.SELECTOR_CONFIRM);
          const elements = document.querySelectorAll(s);
          setHighlightTargets(Array.from(elements) as HTMLElement[]);
          setTimeout(()=>{
            // TODO: confirm dialog to non block scrolling
            if (confirm(tl('Confirm Copy Selector'))) {           
              copyToClipboard(s,x, y, port);
            } else {
              setState(INSPECTION_STATE.MENU);
            }
            setHighlightTargets([]);
          }, 10);
        }})));
      }},
      {key:'📂 ' + tl('Select Children') + ` (${target.children.length?? "No Children"})`, onClick:(e2)=>{
        e2.stopPropagation();
        const children = Array.from(target.children) as HTMLElement[];
        if (children.length === 0) return;
        setItems([
          {key: '⬅',onClick: ()=>{
          setItems(createMenuItems(target, {x,y}));
          }},
          ...Array.from(children, (child) => ({
            key: tagToText(child),
            onClick: (e3:MouseEvent) => {
              e3.stopPropagation();
              setMenuHeader(tagToText(child));
              setItems(createMenuItems(child, {x,y}));
        }}))]);
      }}
    ]
  };

  const onHighlightClicked = (e:MouseEvent) =>{
    if (state !== INSPECTION_STATE.HIGHLIGHT) return;
    e.preventDefault();
    e.stopPropagation();
    const target = e.target;
    const rect = (target as HTMLElement).getBoundingClientRect();
    if (!(target instanceof HTMLElement && isValidElement(target))) return;
    if (mode== INSPECTION_MODE.TAG_EXTRACTION) {
      showMenu(
        createMenuItems(target,{x: rect.left, y: rect.top},),
        rect.left, rect.top,
        tagToText(target));
    } else {
      copyToClipboard((target.textContent ?? "").trim(), rect.left, rect.top, port);
    }
  };
  return <>
    {state === INSPECTION_STATE.HIGHLIGHT && <MouseHighlight onClick={onHighlightClicked}/>}
    {state === INSPECTION_STATE.MENU &&
     ( mode == INSPECTION_MODE.TAG_EXTRACTION && items.length > 0 ? 
     <Menu items={items} 
      header={menuHeader}
      deClick={()=>{
        setState(INSPECTION_STATE.HIGHLIGHT);
      }} pos={{x,y}}/> : <></>)}
    {state === INSPECTION_STATE.TOOLTIP &&
      <Tooltip text={text} pos={{x,y}}/>
    }
    {state === INSPECTION_STATE.SELECTOR_CONFIRM&&
    highlightTargets.map((target, idx)=> <SelectorHighlight key={idx} target={target}/>)

    }
  </>;
};
export default App;