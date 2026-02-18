import { useEffect, useRef } from "react";
import commonStyles from "./common.module.css";

const Menu = ({target, onClick, deClick}:
  {
    target: HTMLElement, 
    onClick:(text: string, x: number, y: number, port: chrome.runtime.Port) => void,
    deClick:() => void
  }
) => {
  const rect = target.getBoundingClientRect();
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    console.log("Menu mounted");
    const handleClickOutside= (e:MouseEvent)=>{
      if(!e.target || !(e.target instanceof HTMLElement)) return;
      console.log(menuRef.current);
      console.log(e.target);
      console.log(menuRef.current?.contains(e.target));
      console.log(menuRef.current===(e.target));
      if (menuRef.current &&menuRef.current!==e.target&& !menuRef.current.contains(e.target)) {
        deClick();
        console.log("deClick!");
      };
    };
    document.addEventListener('click', handleClickOutside);
    return ()=>{
      console.log("Menu unmounted");
      document.removeEventListener('click', handleClickOutside);
    };
  },[]);
  return <div className={commonStyles.menu} 
    style={{top: rect.top, left: rect.left }}
    ref={menuRef}
  >
    <div className={commonStyles.header}>testtesttest</div>
  </div>;
};
export default Menu;