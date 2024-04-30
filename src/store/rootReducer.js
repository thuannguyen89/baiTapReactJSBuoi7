import { combineReducers } from 'redux';
import studentReducer from './student/reducer';

const rootReducer = combineReducers({
    // key: value
    studentReducer: studentReducer
});

export default rootReducer;