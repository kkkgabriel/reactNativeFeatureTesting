import { combineReducers, createStore } from 'redux';
import blogAuthReducers from './ducks/blogAuth';

const reducers = combineReducers({
	auth: blogAuthReducers,
});

const store = createStore(reducers)

export default store;