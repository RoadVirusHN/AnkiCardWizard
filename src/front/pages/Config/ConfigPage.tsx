import commonStyle from '@/front/common.module.css';
import configPageStyle from "./configPage.module.css";
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useConfigure, { Language } from '@/front/utils/useConfigure';
import useLocale from '@/front/utils/useLocale';


const ConfigPage: React.FC = () => {
  // locale, theme, font, about, javascript, default Anki Connect url, 
  const [_t, i18n] = useTranslation();
  const tl = useLocale('pages.ConfigPage.');
  const {language, setLanguage} = useConfigure();
  const [locale, setLocale] = useState(language);
  return (
    <div>
      <label htmlFor='locale-select'>{tl('Locale')}</label>
      <select name='locale' id='locale-select' onChange={(e)=>{
        const selectedLocale = e.target.value as Language;
        setLocale(selectedLocale);
        i18n.changeLanguage(selectedLocale);
        setLanguage(selectedLocale);        
      }}
      value={locale}>
        <option value={Language.EN}>English</option>
        <option value={Language.KO}>한국어</option>
      </select>
    </div>
  );
};

export default ConfigPage;
