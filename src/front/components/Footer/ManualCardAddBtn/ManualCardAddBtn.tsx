import AddAnkiBtnSvg from '@/public/AddAnkiBtn-Svg.svg';
import addAnkiCardBtnStyle from '../footer.module.css';
import { useState } from 'react';
const ManualCardAddBtn = ({}) => {
  const [isClicked, setIsClicked] = useState(false);
  const clickBtn = () => {
    setIsClicked(!isClicked);
  }
  return (<button 
    className={`${addAnkiCardBtnStyle.addAnkiCardButton} ${isClicked ? addAnkiCardBtnStyle.clicked : ''}`}
    title="Add Card to Anki Manually"
    onClick={() => clickBtn()}>
      <AddAnkiBtnSvg />
    </button>); 
};
export default ManualCardAddBtn;