import DecksSvg from "@/public/Decks-Svg.svg";
const DeckInput = ({}) => {
  
  return (
    <div>
      <DecksSvg width={20} height={20}/>
      <select id="deck-select" name="deck-select">
        <option></option>
      </select>
    </div>
  );
};
export default DeckInput;