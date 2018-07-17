import { SET_MENTORS, ADD_MENTOR, EDIT_MENTOR, DELETE_MENTOR } from '../actions/types';

const initialState = [] ;

export default (state = initialState, action = {}) => {
    switch(action.type) {
        case SET_MENTORS:
            return action.mentors;

        case ADD_MENTOR:
            return [...state, action.mentor];
            
        case EDIT_MENTOR:
            return state.map(mentor => {
                if (mentor._id === action.id) {
                    return {
                        ...mentor,
                        ...action.updates
                    };
                } else {
                    return mentor;
                }
            });

        case DELETE_MENTOR:
            return state.filter(mentor => {
                return mentor._id !== action.id;
            });
            
        default: return state;
    }
}
