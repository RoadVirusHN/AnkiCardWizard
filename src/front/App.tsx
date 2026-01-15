import { RouterProvider } from "react-router";
import AnkiRouter from "./router/AnkiRouter";
import { useEffect, useState } from "react";
import useGlobalVarStore from "./utils/useGlobalVarStore";
import useConfigure from "./utils/useConfigure";
import i18n from './locales/i18n';

const App = ({}) => {
  const {currentUrl} = useGlobalVarStore();
  const [router, setRouter] =  useState<ReturnType<typeof AnkiRouter>| null>(null);
  const {language} = useConfigure();

  useEffect(()=>{
    setRouter(AnkiRouter(currentUrl || '/'));
    if (language) {
      console.log("App.tsx setting i18n language to:", language);
      i18n.changeLanguage(language);
    }
  }, []);
  return router ? <RouterProvider router={router}/> : null;
};
export default App;