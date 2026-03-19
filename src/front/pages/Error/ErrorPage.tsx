import useLocale from "@/front/utils/useLocale";
import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router";
import errorPageStyle from "./errorPage.module.css";
import SimpleButton from "@/front/common/SimpleButton/SimpleButton";
import { FallbackProps } from "react-error-boundary";
import i18n from "@/front/locales/i18n";

const getErrorGuide = (infos:{status: string, message: string},tl:(key: string, altKey?: string) => string)=>{
  let altKey = "pages.ErrorPage.codes." + infos.status;
  let description = tl("description",altKey);
  if (!i18n.exists(altKey)){
    altKey = "pages.ErrorPage.codes.Unknown Error";
    if (infos.message.length > 0){
      description = infos.message; 
    }
  }
  return {status:infos.status,statusText:tl("statusText",altKey),description, solutions: tl("solutions",altKey) as unknown as string[]};
};

const getErrorInfo = (error: unknown): {status: string, message: string} => {
  console.log("error: ",error);
  if (isRouteErrorResponse(error)) {
    console.log(error.data);
    return {status: String(error.status),message: error.data?.message || error.statusText || "An error occurred while loading the page."};
  } else if (error instanceof Error){
    return {status: error.name, message: error.message};
  }
  return {status: "Unknown Error", message: "An unexpected error has occurred."};
};

// TODO: Responsive, runtime error and route error handling
const ErrorPage = ({ error: runtimeError, resetErrorBoundary }: Partial<FallbackProps>) => {
  let infos = getErrorInfo(runtimeError ?? useRouteError());
  const tl = useLocale('pages.ErrorPage');
  const guide = getErrorGuide(infos, tl);
  console.log(guide);
  const navigate = useNavigate();
  return (
<div className={errorPageStyle.container}>
      <div className={errorPageStyle.content}>
        <div className={errorPageStyle["error-icon"]}>⚠️</div>
        <div className={errorPageStyle["error-status"]}>STATUS: {guide.status}</div>
        <h1 className={errorPageStyle['error-status-text']}>{guide.statusText}</h1>
        <p className={errorPageStyle['error-description']}>
          {guide.description}
        </p>
        <div className={errorPageStyle['solution']}>
          <span className={errorPageStyle['solution-title']}>💡 {tl('solutions')}</span>
          <ul className={errorPageStyle['solution-list']}>
            {guide.solutions.map((sol, index) => (
              <li key={index}>{sol}</li>
            ))}
          </ul>
        </div>
      </div>
      <SimpleButton onClick={()=>{
        resetErrorBoundary?.();
        navigate('/',{replace: true});//replace to avoid user go home to error page again
        // No Go back button for prevent error page loop
      }}>Go Home</SimpleButton>
      <div className={errorPageStyle['contact-info']}>
        <span className={errorPageStyle.email}>Contact : tempEmail@google.com</span>
      </div>
    </div>);

};
export default ErrorPage;