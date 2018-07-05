import { SET_MENTORS, ADD_MENTOR } from '../actions/types';

const initialState = [] ;

export default (state = initialState, action = {}) => {
    switch(action.type) {
        case SET_MENTORS:
            return action.mentors;
        case ADD_MENTOR:
            return [...state, action.mentor];
        default: return state;
    }
}
