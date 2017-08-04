import * as redux from 'redux';

export interface IDocumentAppState {
  Components: IDocument[];
}

export interface IDocument {
  heading: string;
  subheading: string;
  property:IProperty[];
  code: string;
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
