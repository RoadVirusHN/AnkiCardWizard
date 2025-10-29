import { createBrowserRouter } from "react-router";
import CardPage from "../components/pages/Cards/CardPage";
import HistoryPage from "../components/pages/History/HistoryPage";
import ConfigPage from "../components/pages/Config/ConfigPage";
import CustomPage from "../components/pages/Custom/CustomPage";
import Popup from "../components/pages/Popup/Popup";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Popup/>,
    children: [
      {
        index: true,
        element: <CardPage/>
      },
      {
        path: "index.html",
        element: <CardPage/>
      },
      {
        path: "card",
        element: <CardPage/>
      },
      {
        path: "history",
        element: <HistoryPage/> 
      },
      {
        path: "custom",
        element: <CustomPage/>
      },
      {
        path: "config",
        element: <ConfigPage/>
      }
    ]
  }
]);

export default router;
