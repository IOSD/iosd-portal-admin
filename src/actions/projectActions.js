import axios from 'axios';
import { SET_PROJECTS, ADD_PROJECT, EDIT_PROJECT, DELETE_PROJECT } from './types'
import serverConfig from './server.config';

export const setProjects = (projects) => {
    return {
        type: SET_PROJECTS,
        projects
    }
}

export const fetchProjects = () => {
    return dispatch => {
        return axios.get(`${serverConfig.base_url}/api/v1/projects/all`).then(res => {
            if (res.data.success) {
                dispatch(setProjects(res.data.data))
            } else {

            }
        })
    };
};

export const addProject = (project) => {
    return {
        type: ADD_PROJECT,
        project
    };
};

export const startAddProject = (projectData) => {
    return dispatch => {
        return axios.post(`${serverConfig.base_url}/api/v1/project/new`, projectData).then(res => {
            if (res.data.success) {
                dispatch(addProject(res.data.data));
            };
        });
    };
};


export const editProject = (id, updates) => ({
    type: EDIT_PROJECT,
    id,
    updates
});

export const startEditProject = (id, updates) => {
    return dispatch => {
        return axios.post(`${serverConfig.base_url}/api/v1/project/${id}`, updates).then(res => {
            if(res.data.success) {
                dispatch(editProject(id, res.data.data));
            };
        });
    };
};

export const deleteProject = (id) => ({
    type: DELETE_PROJECT,
    id
});

export const startDeleteProject = (id) => {
    return dispatch => {
        return axios.delete(`${serverConfig.base_url}/api/v1/project/${id}`).then(res => {
            if(res.data.success) {
                dispatch(deleteProject(id));
            };
        });
    };
};