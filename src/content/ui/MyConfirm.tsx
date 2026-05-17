import SimpleButton from "@/panel/components/Inputs/SimpleButton/SimpleButton";
import commonStyles from "./common.module.css";
import useLocale from "@/panel/hooks/useLocale";

interface MyConfirmProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const MyConfirm = ({message,onConfirm,onCancel}:MyConfirmProps) => {
  const tl = useLocale('background');
  return <div className={commonStyles['my-confirm']}>
      <p>{message}</p>
      <div className={commonStyles.buttons}>
        <SimpleButton text={tl("OK")} onClick={onConfirm}/>
        <SimpleButton text={tl("Cancel")} onClick={onCancel}/>
      </div>
    </div>;
};
export default MyConfirm;