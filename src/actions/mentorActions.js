import axios from 'axios';
import { SET_MENTORS, ADD_MENTOR, EDIT_MENTOR, DELETE_MENTOR } from './types'
import serverConfig from './server.config';


//set mentors
export const setMentors = (mentors) => {
    return {
        type: SET_MENTORS,
        mentors
    }
}

export const fetchMentors = () => {
    console.log('Fetching Events');
    return dispatch => {
        return axios.get(`${serverConfig.base_url}/api/v1/mentors/all`).then(res => {
            if (res.data.success) {
                dispatch(setMentors(res.data.data))
            } else {

            }
        })
    };
};

//add mentors
export const addMentor = (mentor) => {
    return {
        type: ADD_MENTOR,
        mentor
    };
};

export const startAddMentor = (mentorData) => {
    return dispatch => {
        return axios.post(`${serverConfig.base_url}/api/v1/mentor/new`, mentorData).then(res => {
            if (res.data.success) {
                dispatch(addMentor(res.data.data));
            };
        });
    };
};


//Edit mentors
export const editMentor = (id, updates) => ({
    type: EDIT_MENTOR,
    id,
    updates
});

export const startEditMentor = (id, updates) => {
    return dispatch => {
        return axios.post(`${serverConfig.base_url}/api/v1/mentor/${id}`, updates).then(res => {
            if(res.data.success) {
                dispatch(editMentor(id, res.data.data));
            };
        });
    };
};


//Delete Mentor
export const deleteMentor = (id) => ({
    type: DELETE_MENTOR,
    id
});

export const startDeleteMentor = (id) => {
    return dispatch => {
        return axios.delete(`${serverConfig.base_url}/api/v1/mentor/${id}`).then(res => {
            if(res.data.success) {
                dispatch(deleteMentor(id));
            };
        });
    };
};