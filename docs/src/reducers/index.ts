import { combineReducers } from 'redux';
import ComponentReducer from './ComponentReducer';
import { connectRouter } from 'connected-react-router';

const createRootReducer = (history: any) =>
  combineReducers({
    components: ComponentReducer,
    router: connectRouter(history),
  });

export default createRootReducer;
