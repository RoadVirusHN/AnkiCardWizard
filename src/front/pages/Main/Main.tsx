import Tabs from '@/front/common/Tabs/Tabs';
import mainStyle from "./main.module.css";
import { Outlet } from 'react-router';
import PathUpdater from '@/front/utils/PathUpdater';
import { withErrorBoundary } from 'react-error-boundary';
import ErrorPage from '../Error/ErrorPage';

const Main = () => {
 
  return (
    <div className={mainStyle.main}>
      <PathUpdater/>
      <Tabs/>
      <div className={mainStyle["main-content"]}>
        <Outlet/>
      </div>
    </div>
  );
};

export default withErrorBoundary(Main,
  {
    FallbackComponent: ErrorPage
  });