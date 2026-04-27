import { createMemoryRouter, data } from "react-router";
import ConfigPage from "../features/Config/ConfigPage";
import ModifyScanRule from "../features/ModifyScanRule/ModifyScanRule";
import Main from "../features/Main/Main";
import DetectPage from "../features/Detect/DetectPage";
import AddPage from "../features/Add/AddPage";
import ScanRulesPage from "../features/ScanRule/ScanRulesPage";
import ErrorPage from "../features/Error/ErrorPage";
import ErrorTesting from "../features/ErrorTesting/ErrorTesting";

const router = (currentUrl: string)=> createMemoryRouter([
  {
    path: '/',
    element: <Main/>,
    ErrorBoundary: ErrorPage,
    children: [
      {
        index: true,
        element: <DetectPage/>
      },
      {
        path: "detect",
        element: <DetectPage/>
      },
      {
        path: "add",
        element: <AddPage/>
      },
      {
        path: "scanRules",
        element: <ScanRulesPage/>
      },
      {
        path: "config",
        element: <ConfigPage/>
      },
      {
        path: "scanRules/modify/:index?",
        element: <ModifyScanRule/>
      },
      {
        path:"errorTesting/runtime",
        element: <ErrorTesting/>
      },
      {
        path:"errorTesting/403",
        loader: async ()=>{
          throw data("testing 403", {status: 403, statusText: "Forbidden"});
        }
      },
      {
        path:"errorTesting/404",
        loader: async ()=>{
          throw data("testing 404", {status: 404, statusText: "Not Found"});
        }
      },
      {
        path:"errorTesting/500",
        loader: async ()=>{
          throw new Error("500");
          throw data("testing 500", {status: 500, statusText: "Internal Server Error"});
        }
      },
      {
        path:"errorTesting/StorageError",
        loader: async ()=>{
          throw new Response("Storage Error", {status: 500, statusText: "Failed to access storage"});
        }
      }

    ],
  },
], {initialEntries: [currentUrl]});

export default router;
