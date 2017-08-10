import * as redux from 'redux';

export interface IDocumentAppState {
  components: IDocument[];
}

export interface IDocument {
  id: string;
  heading: string;
  subheading?: string;
  property?:IProperty[];
  code?: string;
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
