export interface FetchAnkiRequestBody {
  action: string;
  params?: Record<string, unknown>;
}

// Enum changed into const + type for typescript performance optimization.
export const THEME_SETTING = {
  NONE: 'none',
  SYSTEM_DARK: 'system-dark',
  SYSTEM_LIGHT: 'system-light',
  LIGHT: 'light',
  DARK: 'dark',
} as const;
export type ThemeSetting = (typeof THEME_SETTING)[keyof typeof THEME_SETTING];

export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;
export type Theme = (typeof THEME)[keyof typeof THEME];

export const LANGUAGE = {
  EN: 'en',
  KO: 'ko',
} as const;
export type Language = (typeof LANGUAGE)[keyof typeof LANGUAGE];

export const TAB = {
  DETECT: 'DETECT',
  ADD: 'ADD',
  HISTORY: 'HISTORY',
  TEMPLATES: 'TEMPLATES',
  CONFIG: 'CONFIG',
} as const;
export type Tab = (typeof TAB)[keyof typeof TAB];

export const TOOLTIP_DIRECTION = {
  TOP: 'top',
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right',
  UP_LEFT: 'up-left',
  UP_RIGHT: 'up-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
} as const;
export type TooltipDirection = (typeof TOOLTIP_DIRECTION)[keyof typeof TOOLTIP_DIRECTION];

export const TEMPLATE_CODE = {
  OK: 'ok',
  INVALID_TEMPLATE_NAME: 'invalid_template_name',
  DUPLICATE_TEMPLATE_NAME: 'duplicate_template_name',
  INVALID_AUTHOR_NAME: 'invalid_author_name',
  INVALID_MODEL: 'invalid_model',
  INVALID_ROOT_TAG: 'invalid_root_tag',
  NO_SUCH_TEMPLATE: 'no_such_template',
} as const;
export type TEMPLATE_CODE = (typeof TEMPLATE_CODE)[keyof typeof TEMPLATE_CODE];

export const INSPECTION_MODE = {
  TAG_EXTRACTION: 'TAG_EXTRACTION',
  FIELD_EXTRACTION: 'FIELD_EXTRACTION',
  TEXT_EXTRACTION: 'TEXT_EXTRACTION',
} as const;

export type InspectionMode = (typeof INSPECTION_MODE)[keyof typeof INSPECTION_MODE];