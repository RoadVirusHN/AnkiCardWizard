import { FunctionComponent, SVGAttributes } from "react";

interface TabProps {
  Logo: FunctionComponent<SVGAttributes<SVGElement>>;
  url: string;
};

const Tab = ({Logo, url}:TabProps) => {
  return <div><a href={url}><Logo /></a></div>;
};
export default Tab;