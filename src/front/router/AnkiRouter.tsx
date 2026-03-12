import { createMemoryRouter, data } from "react-router";
import ConfigPage from "../pages/Config/ConfigPage";
import ModifyTemplate from "../pages/ModifyTemplate/ModifyTemplate";
import Main from "../pages/Main/Main";
import DetectPage from "../pages/Detect/DetectPage";
import AddPage from "../pages/Add/AddPage";
import TemplatesPage from "../pages/Templates/TemplatesPage";
import PreviewCard from '../pages/PreviewCard/PreviewCard';
import ErrorPage from "../pages/Error/ErrorPage";
import ErrorTesting from "../pages/ErrorTesting/ErrorTesting";

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
        path: "templates",
        element: <TemplatesPage/>
      },
      {
        path: "config",
        element: <ConfigPage/>
      },
      {
        path: "templates/modify/:index?",
        element: <ModifyTemplate/>
      },
      {
        path: "previewCard/:index",
        element: <PreviewCard/>
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
