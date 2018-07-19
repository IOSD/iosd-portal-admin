import axios from 'axios' ;
import { SET_COURSES, ADD_COURSE, EDIT_COURSE, DELETE_COURSE } from './types';
import serverConfig from './server.config';

export function setAllCourses(courses){
    return {
        type : SET_COURSES,
        courses
    }
}

export function fetchAllCourses(){
    console.log('Fetching Courses');
    return dispatch => {
        return axios.get(`${serverConfig.base_url}/api/v1/courses`).then(res => {
            if(res.data.success){
                dispatch(setAllCourses(res.data.courses))
            } else {

            }
        })
    }
};

export const addCourse = (course) => ({
    type: ADD_COURSE,
    course
});

export const startAddCourse = (courseData) => {
    return dispatch => {
        return axios.post(`${serverConfig.base_url}/api/v1/courses/new`, courseData).then(res => {
            if (res.data.success) {
                dispatch(addCourse(res.data.course));
            };
        })
    };
};

export const editCourse = (id, updates) => {
    
}