import commonStyle from '@/front/common.module.css';
import configPageStyle from "./configPage.module.css";
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';


const ConfigPage: React.FC = () => {
  // locale, theme, font, about, javascript, default Anki Connect url, 
  const [t, i18n] = useTranslation();

  return (
    <div>
      {t('test')}

    </div>
  );
};

export default ConfigPage;
