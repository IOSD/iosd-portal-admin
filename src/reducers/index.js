import {combineReducers} from 'redux' ;
import authReducer from "./authReducer";
import libraryReducer from './libraryReducer';
import mentorReducer from './mentorReducer';
import eventReducer from './eventReducer';

const rootReducer = combineReducers({
    auth : authReducer,
    library : libraryReducer,
    mentors: mentorReducer,
    events: eventReducer
});

export default rootReducer ;
