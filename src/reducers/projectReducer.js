import { SET_PROJECTS, ADD_PROJECT, EDIT_PROJECT, DELETE_PROJECT } from '../actions/types';

const initialState = [] ;

export default (state = initialState, action = {}) => {
    switch(action.type) {
        case SET_PROJECTS:
            return action.projects;

        case ADD_PROJECT:
            return [...state, action.project];
            
        case EDIT_PROJECT:
            return state.map(project => {
                if (project._id === action.id) {
                    return {
                        ...project,
                        ...action.updates
                    };
                } else {
                    return project;
                }
            });

        case DELETE_PROJECT:
            return state.filter(project => {
                return project._id !== action.id;
            });
            
        default: return state;
    }
}
