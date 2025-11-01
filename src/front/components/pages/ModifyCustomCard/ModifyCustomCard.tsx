import commonStyles from "@/front/common.module.css";
import useCustomCard from "@/front/utils/useCustomCard";
import { Form, useParams } from "react-router";
import { useRef } from "react";
import CardFieldInput, { CardFieldInputRef } from "./CardFieldInput/CardFieldInput";
import styles from "./modifyCustomCard.module.css";

const ModifyCustomCard = () => {
  const { index } = useParams();
  const isEditMode = index !== undefined;
  const idx = isEditMode ? parseInt(index) : undefined;
  const { customCards, addCustomCard, modifyCustomCard } = useCustomCard();

  const form = useRef<HTMLFormElement>(null);
  const frontRef = useRef<CardFieldInputRef>(null);
  const backRef = useRef<CardFieldInputRef>(null);

  const submitHandler = () => {
    const formData = new FormData(form.current!);
    const cardName = formData.get("cardName") as string;
    const description = formData.get("description") as string;
    const frontHtml = formData.get("FrontHtml") as string;
    const backHtml = formData.get("BackHtml") as string;

    const frontFields = frontRef.current?.getFields() ?? [];
    const backFields = backRef.current?.getFields() ?? [];

    const newCard = {
      cardName,
      description,
      modelName: "Basic",
      Front: { html: frontHtml, fields: frontFields },
      Back: { html: backHtml, fields: backFields },
      tags: [],
    };
    console.log(newCard);
    if (isEditMode && idx !== undefined) modifyCustomCard(idx, newCard);
    else addCustomCard(newCard);

    frontRef.current?.clearFields();
    backRef.current?.clearFields();
    form.current?.reset();
    chrome.runtime.sendMessage({ type: "CLOSE_MODIFY_CUSTOM_CARD_MODAL" });
  };

  return (
    <div className={`${commonStyles.container} ${styles.wrapper}`}>
      <div className={styles.header}>
        {isEditMode ? `Modify Card #${idx}` : "Add Custom Card"}
      </div>

      <Form ref={form} method="post" onSubmit={(e) => e.preventDefault()} className={styles.form}>
        <div className={styles.basicInfo}>
          <input
            name="cardName"
            placeholder="Card Name"
            defaultValue={isEditMode && idx !== undefined ? customCards[idx]?.cardName : ""}
            required
          />
          <input
            name="description"
            placeholder="Description"
            defaultValue={isEditMode && idx !== undefined ? customCards[idx]?.description : ""}
          />
        </div>

        <div className={styles.cardArea}>
          <div className={styles.cardSide}>
            <textarea
              name="FrontHtml"
              placeholder="Front HTML"
              defaultValue={isEditMode && idx !== undefined ? customCards[idx]?.Front.html : ""}
            />
            <CardFieldInput ref={frontRef} defaultValue={isEditMode && idx !== undefined ? customCards[idx]?.Front.fields : []}/>
          </div>

          <div className={styles.cardSide}>
            <textarea
              name="BackHtml"
              placeholder="Back HTML"
              defaultValue={isEditMode && idx !== undefined ? customCards[idx]?.Back.html : ""}
            />
            <CardFieldInput ref={backRef}  defaultValue={isEditMode && idx !== undefined ? customCards[idx]?.Back.fields : []}/>
          </div>
        </div>

        <button type="button" onClick={submitHandler} className={styles.submitBtn}>
          {isEditMode ? "Modify Card" : "Add Card"}
        </button>
      </Form>
    </div>
  );
};

export default ModifyCustomCard;
