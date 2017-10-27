import * as redux from 'redux';

export interface IDocumentAppState {
  components: IDocument[];
}

export interface IDocument {
  id: string;
  heading: string;
  subheading?: string;
  property?:IProperty[];
  exampleCodeExtra?: string; // SD - Needs to remove
  exampleComponentExtra?: any; // SD - Needs to remove
  exampleCodeHeader?: string;
  exampleCodeDescription?: string;
  exampleCode?: string;
  exampleComponent?: any;
  exampleCodeHeader1?: string;
  exampleCodeDescription1?: string;
  exampleCode1?: string;
  exampleComponent1?: any;
  exampleCodeHeader2?: string;
  exampleCodeDescription2?: string;
  exampleCode2?: string;
  exampleComponent2?: any;
  exampleCodeHeader3?: string;
  exampleCodeDescription3?: string;
  exampleCode3?: string;
  exampleComponent3?: any;
  exampleCodeHeader4?: string;
  exampleCodeDescription4?: string;
  exampleCode4?: string;
  exampleComponent4?: any;
  exampleCodeHeader5?: string;
  exampleCodeDescription5?: string;
  exampleCode5?: string;
  exampleComponent5?: any;
  exampleCodeHeader6?: string;
  exampleCodeDescription6?: string;
  exampleCode6?: string;
  exampleComponent6?: any;
  exampleCodeHeader7?: string;
  exampleCodeDescription7?: string;
  exampleCode7?: string;
  exampleComponent7?: any;
  exampleCodeHeader8?: string;
  exampleCodeDescription8?: string;
  exampleCode8?: string;
  exampleComponent8?: any;
  exampleCodeHeader9?: string;
  exampleCodeDescription9?: string;
  exampleCode9?: string;
  exampleComponent9?: any;
}

export interface IProperty {
  name: string;
  type: string;
  desc: string;
}

export interface IAction extends redux.Action {
  type: string;
  payload?: {};
}
