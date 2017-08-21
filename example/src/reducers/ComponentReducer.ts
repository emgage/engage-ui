import * as types from '../constants/ComponentActionTypes';
import InitialState from './InitialState';
import { IDocument, IAction } from '../Types';

export default function componentReducer(state: IDocument[] = InitialState.components, action: IAction) {
  switch (action.type) {
    case types.REQUEST_COMPONENTS: {
      return {
        ...state,
      };
    }

    default:
      return state;
  }
}
