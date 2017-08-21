import { combineReducers } from 'redux';
import ComponentReducer from './ComponentReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  components: ComponentReducer,
  routing: routerReducer,
});

export default rootReducer;
