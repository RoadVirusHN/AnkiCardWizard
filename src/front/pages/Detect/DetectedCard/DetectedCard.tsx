import useAnkiConnectionStore from "@/front/utils/useAnkiConnectionStore";
import { TemplateFieldDataType, Template } from "@/front/utils/useTemplates";
import useGlobalVarStore from "@/front/utils/useGlobalVarStore";
import detectPageStyle from "@/front/pages/Detect/detectPage.module.css";
import { Extracted } from "../DetectPage";

const buildCard = (key: 'Front' | 'Back', customCard: Template, extracted: Extracted) =>
  customCard[key].html.replaceAll(/\{\{(.*?)\}\}/g, 
    (_, fieldName) => {
      const fieldInfo = customCard[key].fields.find(f=>f.name === fieldName);
      if (fieldInfo) {
        switch (fieldInfo.dataType) {
          case TemplateFieldDataType.IMAGE:
            return `<img src="${extracted[key][fieldName] || ''}" />`;
          case TemplateFieldDataType.AUDIO:
            return `[sound:${extracted[key][fieldName] || ''}]`;
          default:
            return extracted[key][fieldName] || '';
        }
      }
      return ''; // Ensure a string is always returned
    }
  );

const DetectedCard = ({customCard, extracted}:{customCard: Template, extracted: Extracted}) => {
  const {fetchAnki} = useAnkiConnectionStore();
  const {currentDeck} = useGlobalVarStore();
  const addToAnki = () => {
    const buildedFront = buildCard("Front",customCard,extracted);
    const buildedBack = buildCard("Back", customCard, extracted);

    fetchAnki<{noteIds: number[]}>({
      action: 'addNote',
      params: {
        note: {
          deckName: currentDeck || 'Default',
          modelName: customCard.modelName || 'Basic',
          fields: {
            Front: buildedFront || 'Something Wrong with Front',
            Back:  buildedBack || 'Something Wrong with Back',
          },
          audio: customCard.audio ? [{
            url: customCard.audio.url,
            filename: customCard.audio.filename,
            skipHash: customCard.audio.skipHash,
            fields: customCard.audio.fields,
          }] : [],
          tags: customCard.tags || [],
        },
      },
    }).then((res) => {
      if (res.error) {
        console.error('Error adding note to Anki:', res.error);
        alert('Failed to add note to Anki: ' + res.error);
      } else {
        console.log('Note added to Anki with ID:', res.result);
        alert('Note added to Anki successfully!');
      }
    });
  };  

  return (  
    <div className={detectPageStyle.detectedCardContainer}>
      <div className={detectPageStyle.detectedCardContent}>
        <div>{customCard.templateName}</div>
        <div className={detectPageStyle.detectedCardFields}>
          <span><b>Front:</b>  {extracted.Front['front']}</span>
          <span><b>Back:</b>  {extracted.Back['back']}</span>
        </div>
      </div>
      <div className={detectPageStyle.addCardButton} onClick={addToAnki}>⨁</div>
    </div>);
};
export default DetectedCard;