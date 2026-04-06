import { Template, TemplateItemDataType } from '@/front/utils/useTemplates';

export const STORAGE_KEY = 'anki-card-wizard-global-var-store';
export const defaultTemplates: Template[] = [
  {
    meta: {},
    templateName: 'Default Template',
    modelName: 'Basic',
    urlPatterns: [],
    rootTag: 'body',
    fields: 
    [{
      name: 'Front',
      html: '{{Front}}',
      items: [
        { name: 'Front', content: '', dataType: TemplateItemDataType.TEXT, isOptional: false },
      ],
      priority: 1,
    },
    {
      name: 'Back',
      html: '{{Back}}',
      items: [
        { name: 'Back', content: '', dataType: TemplateItemDataType.TEXT, isOptional: false },
      ],
      priority: 2,
    }],
    tags: [],
  },
];
