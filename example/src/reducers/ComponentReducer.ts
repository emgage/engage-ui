import * as types from '../constants/ComponentActionTypes';
import InitialState from './InitialState';
import { IDocument, IAction } from '../Types';

export default function componentReducer(state: IDocument[] = InitialState.components, action: IAction) {
  switch (action.type) {
    case types.REQUEST_COMPONENTS: {
      return {
        ...state,
        // error: false,
        // isFetching: true,
      };
    }

    // case types.LOAD_COMPONENTS: {
    //   const allComponents = action.payload.allComponents.data;
    //   return {
    //     ...state,
    //     isFetching: false,
    //     error: false,
    //     allComponents,
    //   };
    // }

    // case types.ERROR_LOADING_COMPONENTS: {
    //   return {
    //     ...state,
    //     isFetching: false,
    //     error: true,
    //   };
    // }

    default:
      return state;
  }
}
