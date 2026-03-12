import { data, NavLink } from "react-router";

const ErrorTesting = ({}) => {
  return <div>
    runtime errors
    <button onClick={()=>{
      //throw 404 error
      throw new Response("testing runtime 404", {status: 404, statusText: "Not found."});
      }}>404(Response)</button>
    <button onClick={()=>{
      //throw 500 error
      throw new Error("This is a test error for testing the error boundary.");
      }}>500</button>
    <button onClick={()=>{
      throw data("testing 403", {status: 403, statusText: "Forbidden"});
      }}>403(data)</button>
    loader errors
    <NavLink to="/errorTesting/403">403 data Error</NavLink>
    <NavLink to="/errorTesting/404">404 data Error</NavLink>
    <NavLink to="/errorTesting/500">500 new Error</NavLink>
    <NavLink to="/errorTesting/StorageError">Storage Response Error</NavLink>
  </div>;
};
export default ErrorTesting;