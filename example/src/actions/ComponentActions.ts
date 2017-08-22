import * as types from '../constants/ComponentActionTypes';

export function errorLoadingComponents() {
  return { type: types.ERROR_LOADING_COMPONENTS };
}

export function requestComponents() {
  return { type: types.REQUEST_COMPONENTS };
}

export function loadComponents(allComponents: any) {
  return {type: types.LOAD_COMPONENTS, payload: {
    allComponents,
  }};
}
