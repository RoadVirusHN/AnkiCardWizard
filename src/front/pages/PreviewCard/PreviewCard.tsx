import { useParams } from "react-router";

const PreviewCard = ({}) => {
  const {index} = useParams();
  return <div>{index}</div>;
};
export default PreviewCard;