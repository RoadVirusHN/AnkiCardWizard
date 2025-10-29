import React from "react";
import ReactDOM from "react-dom/client";
import Popup from "@/front/components/pages/Popup/Popup";
import { RouterProvider } from "react-router";
import router from "./router/AnkiRouter";

const container = document.getElementById('root');
if (container) ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
