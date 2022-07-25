import { combineReducers } from 'redux';
import productsReducer from '../slices/productsSlice';
import uiReducer from '../slices/uiSlice';

const rootReducer = combineReducers({
  products: productsReducer,
  ui: uiReducer,
});

export default rootReducer;