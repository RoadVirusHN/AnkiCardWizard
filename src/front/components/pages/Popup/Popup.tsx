import commonStyle from '@/front/common.module.css';
import AnkiStatus from '@/front/components/Footer/AnkiStatus/AnkiStatus';
import SideBar from '@/front/components/SideBar/SideBar';
import { Outlet } from 'react-router';
import Footer from '../../Footer/Footer';

const Popup: React.FC = () => {
 
  return (
    <div className={commonStyle.popup}>
      <SideBar/>
      <div className={commonStyle["main-content"]}>
        <Outlet/>
        <Footer/>
      </div>
    </div>
  );
};

export default Popup;
