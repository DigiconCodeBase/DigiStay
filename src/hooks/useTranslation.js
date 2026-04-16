import { useSelector } from 'react-redux';
import { getTranslation } from '../utils/translations';

/**
 * Custom hook to get translation function for the current language
 * @returns {function} Function that takes a key and returns translated text
 */
export const useTranslation = () => {
  const language = useSelector((state) => state.settings.language);

  return (key) => getTranslation(language, key);
};
