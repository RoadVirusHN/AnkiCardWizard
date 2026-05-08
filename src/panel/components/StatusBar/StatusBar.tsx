import AnkiStatus from "./AnkiStatus/AnkiStatus";
import DeckInput from "../Inputs/DeckInput/DeckInput";
import statusBarStyle from "./statusBar.module.css";
const StatusBar= ({}) => {
  return (
    <footer className={statusBarStyle.footer}>
      <><DeckInput/>
      {/* <AnkiStatus/> */}
      </>
    </footer>);
};
export default StatusBar;