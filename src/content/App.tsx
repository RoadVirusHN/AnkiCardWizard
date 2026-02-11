import Menu from "./Menu";
import Overlay from "./Overlay";
import Tooltip from "./Tooltip";
import Highlight from "./Highlight";
import { useEffect, useState } from "react";

const App = ({}) => {
  const [isDisplay, setIsDisplay] = useState(false);
  useEffect(()=>{
    const handleDisplay = (e: Event) => {
      const customEvent = e as CustomEvent<{ isDisplay: boolean }>;
      setIsDisplay(customEvent.detail.isDisplay);
    };
    window.addEventListener('toggleOverlayDisplay', handleDisplay);
    return ()=>{
      window.removeEventListener('toggleOverlayDisplay', handleDisplay);
    };
  }, []);


  return <>
    <Menu />
    <Highlight/>
    <Tooltip/>
  </>;
};
export default App;