import { SET_COURSES, ADD_COURSE, EDIT_COURSE, DELETE_COURSE } from '../actions/types';

const initialState = []

export default (state = initialState, action = {}) => {
    switch(action.type) {
        case SET_COURSES:
            return action.courses;
        case ADD_COURSE:
            return [...state, action.course];
        case EDIT_COURSE:
            return;
        default: return state;
    }
}
