import useAnkiConnectionStore from "@/panel/stores/useAnkiConnectionStore";
import DecksIcon from "@/public/Icon/Icon-Decks.svg";
import statusBarStyle from "../statusBar.module.css";
import useGlobalVarStore from "@/panel/stores/useGlobalVarStore";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Icon from "../../Icon/Icon";
const DeckInput = ({initDeck,onChange}:{initDeck? : string, onChange? : (deck:string)=>void}) => {
  const {decks} = useAnkiConnectionStore();
  const {currentDeck,setCurrentDeck} = useGlobalVarStore();
  const [curDeck, setCurDeck] = useState(initDeck || currentDeck);
  const {t} = useTranslation();
  const onChangeDeck = (deck:string) => {
    if (decks.length===0) return;
    setCurrentDeck(deck);
  }
  return (
    <div className={statusBarStyle.deckSelector}>
      <label htmlFor="deck-select">
         <Icon url={DecksIcon} />
      </label>
      <select id="deck-select" name="deck-select" style={{height: '20px', width: '180px'}} 
        onChange={
          onChange ? (e)=>{
            setCurDeck(e.currentTarget.value);
            onChange(e.currentTarget.value);
          } : (e)=>{
            setCurDeck(e.currentTarget.value);
            onChangeDeck(e.currentTarget.value)
          }
      } value={curDeck}>
        {decks.length>0? 
          decks.map((deck) => <option key={deck} value={deck}>{deck}</option>) 
          : <option value=''>{t('common.Anki Disconnected')}</option>
        }
      </select>
    </div>
  );
};
export default DeckInput;