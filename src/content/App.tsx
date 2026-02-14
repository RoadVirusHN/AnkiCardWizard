import Menu from "./Menu";
import Overlay from "./Overlay";
import Tooltip from "./Tooltip";
import Highlight from "./Highlight";
import { useEffect, useState } from "react";

const App = ({}) => {
  const [isDisplay, setIsDisplay] = useState(true);
  useEffect(()=>{
    console.log("App mounted");
    const handleDisplay = (e: Event) => {
      const customEvent = e as CustomEvent<{ isDisplay: boolean }>;
      console.log("display event :" ,e);
      //setIsDisplay(customEvent.detail.isDisplay);
    };
    window.addEventListener('toggleOverlayDisplay', handleDisplay);
    return ()=>{
      window.removeEventListener('toggleOverlayDisplay', handleDisplay);
    };
  }, []);


  return <>
  <div style={{display: isDisplay ? 'block' : 'none', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.5)'}}>
    test
  </div>
  </>;
};
export default App;