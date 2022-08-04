import { createStore } from 'redux';
import noteReducer from './reducers';

const store = createStore(noteReducer);

export default store;