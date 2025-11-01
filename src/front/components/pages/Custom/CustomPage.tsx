import useCustomCard from "@/front/utils/useCustomCard";
import commonStyles from "@/front/common.module.css";
import customPageStyles from "./customPage.module.css";
const CustomPage: React.FC = () => {
  const {customCards, addCustomCard, removeCustomCard} = useCustomCard();
  const openAddCardModal = () => {
    //open modal to add custom card using chrome Extension.
    // chrome.runtime.sendMessage({type: 'OPEN_ADD_CUSTOM_CARD_MODAL'});
  }
  return (
    <div className={commonStyles.container}>
      <div className={`${customPageStyles.list}`}>
        {customCards.map((card, index) => <div key={index}>{card.cardName} <div onClick={()=>removeCustomCard(index)}>-</div></div>)}
        <div onClick={openAddCardModal} style={{cursor: 'pointer'}}>⨁</div>
      </div>
      <div>

        <div className={customPageStyles.detail}>
          //preview
          // datas front, datas back
          // card name
          //detail 
        </div>
      </div>
    </div>
  );
};

export default CustomPage;
