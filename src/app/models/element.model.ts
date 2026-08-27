export type ElementType = 
  | 'navbar'
  | 'hero'
  | 'events-grid'
  | 'services'
  | 'contact'
  | 'footer'
  | 'banner'
  | 'simulador'
  | 'faq'
  | 'imagen';

export interface PageElement {
  id: string;
  type: ElementType;
  props: any;
  col?: number; // columnas Bootstrap 1-12, default 12
}

