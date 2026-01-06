import { RouterProvider } from "react-router";
import AnkiRouter from "./router/AnkiRouter";
import { useEffect, useState } from "react";
import useGlobalVarStore from "./utils/useGlobalVarStore";

const App = ({}) => {
  const {currentUrl} = useGlobalVarStore();
  const [router, setRouter] =  useState<ReturnType<typeof AnkiRouter>| null>(null);
  useEffect(()=>{
    setRouter(AnkiRouter(currentUrl || '/'));
  }, []);
  return router ? <RouterProvider router={router}/> : null;
};
export default App;