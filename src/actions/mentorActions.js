import axios from 'axios';
import { SET_MENTORS, ADD_MENTOR } from './types'
import serverConfig from './server.config';

export const setMentors = (mentors) => {
    return {
        type: SET_MENTORS,
        mentors
    }
}

export const addMentor = (mentor) => {
    return {
        type: ADD_MENTOR,
        mentor
    };
};

export const fetchMentors = () => {
    console.log('Fetching Events');
    return dispatch => {
        return axios.get(`${serverConfig.base_url}/api/v1/mentors/all`).then(res => {
            // console.log(res.data);
            if (res.data.success) {
                dispatch(setMentors(res.data.data))
            } else {

            }
        })
    };
};

export const addNewMentor = (mentorData) => {
    return dispatch => {
        return axios.post(`${serverConfig.base_url}/api/v1/mentor/new`, mentorData).then(res => {
            if (res.data.success) {
                dispatch(addMentor(res.data.data));
            };
        });
    };
};
