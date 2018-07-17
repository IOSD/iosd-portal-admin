import { SET_EVENTS, ADD_EVENT, EDIT_EVENT, DELETE_EVENT } from '../actions/types';

const initialState = [] ;

export default (state = initialState, action = {}) => {
    switch(action.type) {
        case SET_EVENTS:
            return action.events;

        case ADD_EVENT:
            return [...state, action.event];

        case EDIT_EVENT:
            return state.map(event => {
                if (event._id === action.id) {
                    return {
                        ...event,
                        ...action.updates
                    };
                } else {
                    return event;
                }
            });

        case DELETE_EVENT:
            return state.filter(event => {
                return event._id !== action.id;
            });
            
        default: return state;
    }
}
