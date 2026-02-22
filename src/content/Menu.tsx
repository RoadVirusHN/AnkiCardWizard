import { useEffect, useRef, useState } from "react";
import commonStyles from "./common.module.css";
import useLocale from "@/front/utils/useLocale";
import { X } from "react-router/dist/development/index-react-server-client-1TI9M9o1";
import { getUniqueSelector } from "./App";

export interface MenuItem {
  key: string;
  onClick: () => void;
}
interface MenuProps {
  items: MenuItem[];
  deClick:() => void;
  pos: {x:number, y:number};
}

const Menu = ({items, deClick, pos}:MenuProps) => {
  const [curItems,setCurItems] = useState(items);
  const [mode, setMode]= useState<'main' | 'children'>('main');
  const rect = curItems.getBoundingClientRect();
  const menuRef = useRef<HTMLDivElement>(null);
  const tl = useLocale('background');
  useEffect(()=>{
    const handleClickOutside= (e:MouseEvent)=>{
      if(!e.target || !(e.target instanceof HTMLElement)) return;
      if (menuRef.current &&menuRef.current!==e.target&& !menuRef.current.contains(e.target)) {
        deClick();
      };
    };
    document.addEventListener('click', handleClickOutside);
    return ()=>{
      document.removeEventListener('click', handleClickOutside);
    };
  },[]);
  return <div className={commonStyles.menu} 
    style={{top: rect.top, left: rect.left}}
    ref={menuRef}
  >
    <div className={commonStyles.header}>{mode ==='main' ? (`<${curItems.tagName.toLowerCase()}> ` + tl('Selected')) : tl('Select Child')}</div>
    {
      mode==='main' ? (
        <>
          <button
            onClick={()=>{
              const text =curItems.textContent?.trim() || '';
              onClick(text,rect.top, rect.left);
            }}
            >{'📄 ' + tl('Extract Text')}</button>
          <button
          onClick={()=>{
            const selector = getUniqueSelector(curItems);
            onClick(selector,rect.top, rect.left);
          }}
          >{'🎯 ' + tl('Extract Selector')}</button>
          <button
          onClick={(e)=>{
            e.stopPropagation();
            setMode('children');
          }}
          >{'📂 ' + tl('Select Children') + ` (${curItems.children.length})`}</button>
        </>
    ) : (
      <>
        <button
          onClick={(e)=>{
            e.stopPropagation();
            setMode('main');
          }}
        >{'⬅️'}</button>
        {Array.from(curItems.children).map((child, idx)=>(
          <button key={idx}
            onClick={(e)=>{
              e.stopPropagation();
              setCurItems(child as HTMLElement);
              setMode('main');
            }}
          >{`<${child.tagName.toLowerCase()}> ${child.textContent?.trim().slice(0,15) || '...'}`}</button>
        ))}
      </>
    )}
  </div>;
};
//TODO : change color scheme for dark mode
export default Menu;