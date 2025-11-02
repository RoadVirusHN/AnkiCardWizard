import cardPageStyles from '@/front/components/pages/Cards/cardPage.module.css';
import { useEffect, useRef, useState } from 'react';
import Footer from '../../Footer/Footer';
import useCustomCard from '@/front/utils/useCustomCard';
import DetectedCard from './DetectedCard/DetectedCard';

export interface Extracted{
  Front : Record<string, string>;
  Back : Record<string, string>;
}
interface IdxedExtracted{
  customCardIndex: number,
  extracted: Extracted
};


const CardPage: React.FC = () => {
  const {customCards} = useCustomCard();
  const [extracteds, setExtracteds] = useState<IdxedExtracted[]>([]);
  const requestExtracteds = () =>{
    chrome.runtime.sendMessage({type: 'SEARCH_DETECTED_CARDS', customCards});
  }
  useEffect(()=>{
    chrome.runtime.onMessage.addListener((message)=>{
      if (message.type === 'URL_CHANGED') {
        chrome.runtime.sendMessage({type: 'SEARCH_DETECTED_CARDS', customCards});
      } else if (message.type === 'CARDS_DETECTED_UPDATE_REQUEST') {
        setExtracteds(message.extracteds);
      }
    });

    if (customCards.length > 0) {
      chrome.runtime.sendMessage({type: 'REQUEST_DETECTED_CARDS', customCards});
    }
  },[customCards])
  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px'}}>
      {extracteds.map(({customCardIndex, extracted}, idx)=><DetectedCard key={idx} customCard={customCards[customCardIndex]} extracted={extracted}/>)}
      <span className={cardPageStyles.redetectCard} onClick={requestExtracteds}> ↺ </span>
      <Footer/>
    </div>
  );
};

export default CardPage;
