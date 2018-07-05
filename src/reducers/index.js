import {combineReducers} from 'redux' ;
import authReducer from "./authReducer";
import libraryReducer from './libraryReducer';
import mentorReducer from './mentorReducer';

const rootReducer = combineReducers({
    auth : authReducer,
    library : libraryReducer,
    mentors: mentorReducer
});

export default rootReducer ;
