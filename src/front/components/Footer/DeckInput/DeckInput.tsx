import useAnkiConnectionStore from "@/front/utils/useAnkiConnectionStore";
import DecksSvg from "@/public/Decks-Svg.svg";
import footerStyle from "../footer.module.css";
const DeckInput = ({}) => {
  const {decks} = useAnkiConnectionStore();
  return (
    <div className={footerStyle.deckSelector}>
      <label htmlFor="deck-select">
        <DecksSvg width={18} height={18}/>
      </label>
      <select id="deck-select" name="deck-select" style={{height: '20px', width: '180px'}}>
        {decks.length>0? decks.map((deck) => <option key={deck} value={deck}>{deck}</option>) : <option>Check Anki Connection!</option>}
      </select>
    </div>
  );
};
export default DeckInput;