import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import TestReducer from './test';

const rootReducer = combineReducers({
  test: TestReducer,
});

export default rootReducer;
