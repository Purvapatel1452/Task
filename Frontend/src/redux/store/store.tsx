import { createStore, combineReducers, applyMiddleware } from 'redux';
import homeReducer from '../reducers/homeReducer';
import { thunk } from 'redux-thunk';
// import chatReducer from '../chatRedux/chatReducer';


const rootReducer = combineReducers({
  home: homeReducer,
 
});

const store = createStore(rootReducer,applyMiddleware(thunk));

export default store;