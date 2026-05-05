import { cssSelectorGenerator } from 'css-selector-generator';
import commonStyles from './ui/common.module.css';
import { EXTENSION_UI_ID, uniqueCssSelectorOptions } from './constants';

export const getCommonSelector = (el: HTMLElement, blacklist: string[] = []): string => {
  const path: string[] = [];
  let current: HTMLElement | null = el;

  // 2. 부모를 타고 올라가는 루프
  while (current && current.nodeType === Node.ELEMENT_NODE && current.tagName !== 'HTML') {
    const tagName = current.tagName.toLowerCase();

    let selector = tagName;

    // ---------------------------------------------------------
    // Class 처리
    // ---------------------------------------------------------
    if (current.className && typeof current.className === 'string') {
      const validClasses = current.className
        .trim()
        .split(/\s+/)
        .filter((cls) => cls && !blacklist.includes(cls)); // 블랙리스트 필터링

      if (validClasses.length > 0) {
        selector += `.${validClasses.join('.')}`;
      }
    }

    // ---------------------------------------------------------
    // Attribute 처리 (선택 사항)
    // ---------------------------------------------------------
    // data-* 속성이나 name 등 크롤링에 유용한 속성이 있다면 추가
    const usefulAttrs = ['name', 'data-type', 'role', 'aria-label'];
    Array.from(current.attributes).forEach((attr) => {
      if (usefulAttrs.includes(attr.name) || attr.name.startsWith('data-test')) {
        // 값에 공백이나 특수문자가 있을 수 있으므로 따옴표 처리
        selector += `[${attr.name}="${attr.value.replace(/"/g, '\\"')}"]`;
      }
    });

    path.unshift(selector);

    // 부모로 이동
    current = current.parentElement;

    // body를 만나면 종료 (너무 상위까지 가면 오히려 노이즈 발생)
    if (current && current.tagName === 'BODY') {
      path.unshift('body'); // 명시적으로 body 시작을 원하면 추가, 아니면 제거 가능
      break;
    }
  }
  // 부모 > 자식 관계 연결
  return path.join(' > ');
};

export const getUniqueSelector = (el: HTMLElement, root: HTMLElement): string[] => {
  let res = Array.from(cssSelectorGenerator(el, { ...uniqueCssSelectorOptions, root }));
  return res;
};

// 요소 유효성 검사
export const isValidElement = (element: HTMLElement) => {
  if (element.tagName === 'HTML' || element.tagName === 'BODY') return false;
  if (
    element.className.includes(commonStyles['extension-tooltip']) ||
    element.className.includes(commonStyles.highlight) ||
    element.className.includes(commonStyles.menu) ||
    element.className.includes(commonStyles.header) ||
    element.id === EXTENSION_UI_ID
  ) {
    return false;
  }
  return true;
};

export const tagToText = (tag: HTMLElement) => {
  return `<${tag.tagName.toLowerCase()}> ${(tag.textContent && tag.textContent.length > 15 ? tag.textContent?.trim().slice(0, 12) + '...' : tag.textContent) || ''}`;
};
