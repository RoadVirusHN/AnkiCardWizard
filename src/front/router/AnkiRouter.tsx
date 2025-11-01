import { createHashRouter } from "react-router";
import CardPage from "../components/pages/Cards/CardPage";
import HistoryPage from "../components/pages/History/HistoryPage";
import ConfigPage from "../components/pages/Config/ConfigPage";
import CustomPage from "../components/pages/Custom/CustomPage";
import Popup from "../components/pages/Popup/Popup";
import AddCustomCard from "../components/pages/AddCustomCard/AddCustomCard";

const router = createHashRouter([
  {
    path: '/',
    element: <Popup/>,
    children: [
      {
        index: true,
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
      },
      {
        path: "add-custom-card",
        element: <AddCustomCard/>
      }
    ]
  }
]);

export default router;
