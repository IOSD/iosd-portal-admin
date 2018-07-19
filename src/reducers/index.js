import {combineReducers} from 'redux' ;
import authReducer from "./authReducer";
import libraryReducer from './libraryReducer';
import mentorReducer from './mentorReducer';
import eventReducer from './eventReducer';
import courseReducer from './courseReducer';
import projectReducer from './projectReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    library: libraryReducer,
    mentors: mentorReducer,
    events: eventReducer,
    courses: courseReducer,
    projects: projectReducer
});

export default rootReducer ;
