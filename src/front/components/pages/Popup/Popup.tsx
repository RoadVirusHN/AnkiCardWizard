import { createRoot } from 'react-dom/client';
import commonStyle from '@/front/common.module.css';
import AnkiStatus from '@/front/components/AnkiStatus/AnkiStatus';
import SideBar from '@/front/components/SideBar/SideBar';

const Popup: React.FC = () => {
 
  return (
    <div className={commonStyle.popup}>
      <SideBar/>
      <div>
        <h3>Popup Test</h3>
        <AnkiStatus/>
      </div>
    </div>
  );
};

export default Popup;
