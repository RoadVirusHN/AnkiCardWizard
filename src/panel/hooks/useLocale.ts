import { useTranslation } from 'react-i18next';

const useLocale = (prefix: string) => {
  const { t } = useTranslation();
  return (key: string, altKey?: string) => {
    return t(`${altKey ?? prefix}.${key}`);
  };
};

export default useLocale;
