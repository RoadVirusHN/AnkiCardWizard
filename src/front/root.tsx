import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router";
import Popup from "@/front/components/pages/Popup/Popup";

const router = createBrowserRouter([
  {
    path: "/index.html",
    element: <Popup/>
  }
]);

const container = document.getElementById('root');
if (container) ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);