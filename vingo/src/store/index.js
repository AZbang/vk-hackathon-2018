import {routerReducer} from 'react-router-redux';
import {combineReducers} from 'redux';
import data from './reducer';

export default combineReducers({
  data: data,
  router: routerReducer,
});
