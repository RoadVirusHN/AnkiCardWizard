import Menu, { MenuItem } from "./Menu";
import Tooltip from "./Tooltip";
import MouseHighlight from "./MouseHighlight";
import { useState } from "react";
import commonStyles from "./common.module.css";
import "./common.css";
import useLocale from "@/panel/hooks/useLocale";
import { INSPECTION_MODE, InspectionMode } from "@/types/app.types";
import { MESSAGE_TYPE } from "@/types/chrome.types";
import SelectorHighlight from "./SelectorHighlight";
import { getCommonSelector, getRelativeSelector, isValidElement, tagToText } from "../function";
import { EXTENSION_UI_ID } from "../constants";
import { createPortal } from "react-dom";

const INSPECTION_STATE = {
  HIGHLIGHT: 'HIGHLIGHT',
  MENU: 'MENU',
  TOOLTIP: 'TOOLTIP',
  SELECTOR_CONFIRM: 'SELECTOR_CONFIRM',
} as const;
type InspectionState = typeof INSPECTION_STATE[keyof typeof INSPECTION_STATE];


//TODO: App doing to much, split to multiple components
// ex) App: manage state, container: position, Highlight: highlight logic, Menu: menu logic, Tooltip: tooltip logic
const App = ({mode, port, roots, deactivate}:{mode:InspectionMode, port:chrome.runtime.Port, roots:HTMLElement[], deactivate:()=>void}) => {
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
  console.log("App rendered with mode: ", mode, " and roots: ", roots);
  const showMenu = (items:MenuItem[], x: number, y: number, header:string) => {
    console.log("Showing menu at: ", x, y, " with items: ", items);
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
    console.log("Creating menu items for target: ", target, " at position: ", pos);
    const {x,y} = pos;
    return [{key:'📄 ' + tl('Extract Text'), onClick:()=>{
        const text =target.textContent?.trim() || '';
        copyToClipboard(text,x, y, port);
      }},
      {key:'🎯 ' + tl('Extract Selector'), onClick:()=>{
        let selectors = [] as string[];
        console.log("mode: ", mode);
        if (mode === INSPECTION_MODE.TAG_EXTRACTION) {
          selectors = [getCommonSelector(target, [EXTENSION_UI_ID, ...Object.keys(commonStyles)])];
        } else {
          console.log("WERE IN FIELD EXTRACTION MODE, GETTING UNIQUE SELECTOR");
          console.log("roots: ", roots);
          let found = false;
          for (const root of roots) {
            if (root.contains(target)) {
              console.log("Found target within root: ", root);
              selectors = [getRelativeSelector(target, root)];
              found = true;
              break;
            }
          }
          console.log("Got selectors: ", selectors);
          if (!found&&!confirm(tl('selected tag does not child of root, copy selector anyway?'))) {
            return;
          }
        }
        setItems(Array.from(selectors, s=>({key: s, onClick:()=>{
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
      {key:'🧑🏽‍🍼 ' + tl('Select Parent') + ` (${!target.parentElement || target.tagName === 'BODY' ? "No Parent" : "" })`, onClick: (e)=>{
        e.stopPropagation();
        const parent = target.parentElement;
        if (!parent || parent.tagName === 'BODY') return;
        setItems(createMenuItems(parent, {x, y}));
        setMenuHeader(tagToText(parent));
        setHighlightTargets([parent]);
      }, onHover: (e:MouseEvent)=>{
        const parent = target.parentElement;
        if (!parent || parent.tagName === 'BODY') {
          setHighlightTargets([]);
          return;
        }
        setHighlightTargets([parent]);
      }},
      {key:'📂 ' + tl('Select Children') + ` (${target.children.length?? "No Children"})`, onClick:(e)=>{
        e.stopPropagation();
        const children = Array.from(target.children) as HTMLElement[];
        if (children.length === 0) return;
        const rect = target.getBoundingClientRect();
        setItems([
          {key: '⬅',onClick: ()=>{
          setItems(createMenuItems(target, {x:rect.top,y:rect.top}));
          }, onHover: (e:MouseEvent)=>{
            setHighlightTargets([target]);
          }},
          ...Array.from(children, (child) => ({
            key: tagToText(child),
            onClick: (e:MouseEvent) => {
              e.stopPropagation();
              setMenuHeader(tagToText(child));
              const rect = child.getBoundingClientRect();
              setItems(createMenuItems(child, {x: rect.x,y:rect.y}));
              setHighlightTargets([child]);
        }, onHover: (e:MouseEvent)=>{
          setHighlightTargets([child]);
        }}))]);
      }, onHover: (e:MouseEvent)=>{
        setHighlightTargets(Array.from(target.children) as HTMLElement[]);
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
    if (mode== INSPECTION_MODE.TAG_EXTRACTION || mode=== INSPECTION_MODE.FIELD_EXTRACTION) {
      showMenu(
        createMenuItems(target,{x: rect.left, y: rect.top},),
          rect.left, rect.top,
        tagToText(target));
    } else {
      copyToClipboard((target.textContent ?? "").trim(), rect.left, rect.top, port);
    }
  };
  // TODO : prevent css conflict with website, use css module or shadow dom
  return <>
    {state === INSPECTION_STATE.HIGHLIGHT && <MouseHighlight onClick={onHighlightClicked}/>}
    {state === INSPECTION_STATE.MENU &&
     ( mode === INSPECTION_MODE.TAG_EXTRACTION||mode === INSPECTION_MODE.FIELD_EXTRACTION && items.length > 0 ? 
     createPortal(<Menu items={items} 
      header={menuHeader}
      deClick={()=>{
        setState(INSPECTION_STATE.HIGHLIGHT);
      }} pos={{x,y}}/>,document.body) : <></>)}
    {state === INSPECTION_STATE.TOOLTIP &&<Tooltip text={text} pos={{x,y}}/>}
    {roots.map((root, idx)=> <SelectorHighlight key={idx} target={root} mode={"ROOTS"}/>)}
    {highlightTargets.map((target, idx)=> <SelectorHighlight key={idx} target={target}/>)}
  </>;
};
export default App;