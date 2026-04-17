import { useEffect } from "react";
import { useLocation } from "react-router";
import useGlobalVarStore from "../stores/useGlobalVarStore";

const PathUpdater = () => {
  const location = useLocation();
  const {setCurrentUrl} = useGlobalVarStore();
  useEffect(() => {
    setCurrentUrl(location.pathname);
  }, [location]);
  return <></>;
};
export default PathUpdater;