import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './slices/authSlice';
import notesReducer from './slices/notesSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    notes: notesReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
