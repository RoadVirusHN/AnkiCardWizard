import { data, isRouteErrorResponse, useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError() as Error;
  return <div>
    ERROR PAGE!!!
    {error instanceof Error ? (error.stack) : (error as typeof data).name + " " + (error as typeof data).toString()}
    {error.name} {error.message} {isRouteErrorResponse(error)}</div>;
};
export default ErrorPage;