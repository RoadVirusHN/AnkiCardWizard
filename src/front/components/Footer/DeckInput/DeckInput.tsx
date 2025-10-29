import useAnkiConnectionStore from "@/front/utils/useAnkiConnectionStore";
import DecksSvg from "@/public/Decks-Svg.svg";
const DeckInput = ({}) => {
  const {decks} = useAnkiConnectionStore();
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: '5px', height: '100%'}}>
      <DecksSvg width={18} height={18} style={{ display: 'block', flexShrink: 0 }}/>
      <select id="deck-select" name="deck-select" style={{height: '20px', width: '180px', padding: '0 4px'}}>
        {decks.length>0? decks.map((deck) => <option key={deck} value={deck}>{deck}</option>) : <option>Check Anki Connection!</option>}
      </select>
    </div>
  );
};
export default DeckInput;