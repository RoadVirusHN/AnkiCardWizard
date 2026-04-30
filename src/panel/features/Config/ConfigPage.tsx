import commonStyle from '@/panel/common.module.css';
import configPageStyle from "./configPage.module.css";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useConfigure from '@/panel/stores/useConfigure';
import useLocale from '@/panel/hooks/useLocale';
import SimpleButton from '@/panel/components/SimpleButton/SimpleButton';
import { LOCALE, Locale, THEME_SETTING, ThemeSetting } from '@/types/app.types';
import useAnkiConnectionStore from '@/panel/stores/useAnkiConnectionStore';


const ConfigPage: React.FC = () => {
  // font size, about, javascript, default Anki Connect url, default setting, default scanRules 
  const [_t, i18n] = useTranslation();
  const tl = useLocale('pages.ConfigPage');
  const {
    locale,setLocale, 
    themeOption, setThemeSetting,
    fontSize, setFontSize
  } = useConfigure();
  const {ankiUrl, setAnkiUrl} = useAnkiConnectionStore();
  const [curLocale, setCurLocale] = useState(locale);
  const [curThemeSetting, setCurThemeSetting] = useState(themeOption.userSetting);
  const [curFontSize, setCurFontSize] = useState(fontSize);
  const [curAnkiUrl, setCurAnkiUrl] = useState(ankiUrl);
  const hasChanges = locale !== curLocale || curThemeSetting !== themeOption.userSetting || curFontSize !== fontSize;
  const isUserSchemeDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return (
    <div>
      <div>
        <label htmlFor='locale-select'>{tl('Locale')}</label>
        <select name='locale' id='locale-select' onChange={(e)=>{
          const selectedLocale = e.target.value as Locale;
          setLocale(selectedLocale); 
        }}
        value={curLocale}>
          <option value={LOCALE.EN}>English</option>
          <option value={LOCALE.KO}>한국어</option>
        </select>
      </div>  
      <div>
        <label htmlFor="theme-select">{tl('Theme')}</label>
        <select name="theme" id="theme-select" onChange={
          (e)=>{
            const selectedTheme = e.target.value as ThemeSetting;
            setCurThemeSetting(selectedTheme);
          }
        }
        value={curThemeSetting}
        >
          <option value={isUserSchemeDark ? THEME_SETTING.SYSTEM_DARK : THEME_SETTING.SYSTEM_LIGHT}>{isUserSchemeDark ?tl('SystemDark'):tl('SystemLight')}</option>
          <option value={THEME_SETTING.LIGHT}>{tl('Light')}</option>
          <option value={THEME_SETTING.DARK}>{tl('Dark')}</option>
        </select>
      </div>
      <div>
        <label htmlFor="fontSizeSelect">{tl('font size')}</label>
        <select name="fontSizeSelect" id="fontSizeSelect" onChange={(e)=>{
          const selectedFontSize = e.target.value;
          setCurFontSize(selectedFontSize);
        }} 
        value={curFontSize}>
          <option value="small">small</option>
          <option value="normal">normal(default)</option>
          <option value="large">large</option>
          <option value="very-large">very large</option>
        </select>
      </div>
      <div>
        <label htmlFor="Anki-URL">{tl('Anki URL')}</label>
        <input type="text" name="Anki-URL" onChange={(e)=>{
          setCurAnkiUrl(e.target.value);
        }} value={curAnkiUrl} />
      </div>
      <SimpleButton onClick={()=>{
        //Add default scanRules

      }}>
        {tl('Add Default ScanRules')}
      </SimpleButton>
      <div className={configPageStyle.floatingBtnContainer}>
        <SimpleButton onClick={()=>{
          setLocale(curLocale);
          setThemeSetting(curThemeSetting);
          setFontSize(curFontSize);  
          setAnkiUrl(curAnkiUrl);
        }} 
          style={{display: hasChanges ? 'inline-block' : 'none'}}
        >
          {tl('Apply')}
        </SimpleButton>
        <SimpleButton onClick={()=>{
          setCurLocale(locale);
          setCurThemeSetting(themeOption.userSetting);
          setCurFontSize(fontSize);
        }}
        style={{display: hasChanges ? 'inline-block' : 'none'}}
        >
          {tl('Cancle')}
        </SimpleButton>
        <SimpleButton onClick={()=>{
          if (confirm(tl('Reset to default settings?'))) {
            const uiLocale = chrome.i18n.getUILanguage();
            const defaultLocale = uiLocale.startsWith('ko') ? LOCALE.KO : LOCALE.EN;
            setLocale(defaultLocale);
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (themeOption.userSetting === THEME_SETTING.SYSTEM_LIGHT ||themeOption.userSetting===THEME_SETTING.SYSTEM_DARK||themeOption.userSetting===THEME_SETTING.NONE) {
              setCurThemeSetting(isDark ? THEME_SETTING.SYSTEM_DARK : THEME_SETTING.SYSTEM_LIGHT);
            }
            setCurFontSize('normal');
          }
        }}>
          {tl('Default')}
        </SimpleButton>
      </div>

    </div>
  );
};

export default ConfigPage;
