import * as types from '../constants/ComponentActionTypes';
import InitialState from './InitialState';

export default function componentReducer(state = InitialState.Components, action) {
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
