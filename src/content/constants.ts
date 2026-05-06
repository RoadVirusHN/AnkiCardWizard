import {
  CssSelectorGeneratorOptionsInput,
  CssSelectorType,
} from 'css-selector-generator/types/types';
import commonStyles from './ui/common.module.css';

export const EXTENSION_UI_ID = 'extension-ui-container' as const;

export const uniqueCssSelectorOptions: CssSelectorGeneratorOptionsInput = {
  maxResults: 3,
  combineWithinSelector: true, // 동일한 요소 내에서 여러 selector 조합 허용 여부
  combineBetweenSelectors: true, // 여러 selector 조합 허용 여부
  blacklist: [EXTENSION_UI_ID, ...Object.keys(commonStyles)],
  selectors: ['id', 'class', 'nth-child', 'tag'] as CssSelectorType[],
  includeTag: true, // Css selector에 태그 이름 포함 여부
};
