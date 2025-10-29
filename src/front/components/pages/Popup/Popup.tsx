import commonStyle from '@/front/common.module.css';
import AnkiStatus from '@/front/components/AnkiStatus/AnkiStatus';
import SideBar from '@/front/components/SideBar/SideBar';
import { Outlet } from 'react-router';

const Popup: React.FC = () => {
 
  return (
    <div className={commonStyle.popup}>
      <SideBar/>
      <div className={commonStyle["main-content"]}>
        <Outlet/>
        <AnkiStatus/>
      </div>
    </div>
  );
};

export default Popup;
