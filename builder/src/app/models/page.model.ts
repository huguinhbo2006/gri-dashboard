import { PageElement } from './element.model';

export interface Page {
  id: string;
  name: string;
  slug: string;
  elements: PageElement[];
}
