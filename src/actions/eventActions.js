import axios from 'axios' ;
import {SET_EVENTS, ADD_EVENT, EDIT_EVENT, DELETE_EVENT} from './types'
import serverConfig from './server.config';

//SET EVENTS
export function setEvents(events){
    return {
        type : SET_EVENTS,
        events
    }
};

export function fetchEvents(){
    console.log('Fetching Events');
    return dispatch => {
        return axios.get(`${serverConfig.base_url}/api/v1/events`).then(res => {
            console.log(res.data);
            if(res.data.success){
                dispatch(setEvents(res.data.data))
            } else {

            }
        })
    }
};


//ADD EVENTS
export const addEvent = (event) => {
    return {
        type: ADD_EVENT,
        event
    };
};

export const startAddEvent = (eventData) => {
    return dispatch => {
        return axios.post(`${serverConfig.base_url}/api/v1/events/new`, eventData).then(res => {
            if (res.data.success) {
                dispatch(addEvent(res.data.data));
            };
        });
    };
};


//Edit event
export const editEvent = (id, updates) => ({
    type: EDIT_EVENT,
    id,
    updates
});

export const startEditEvent = (id, updates) => {
    return dispatch => {
        return axios.post(`${serverConfig.base_url}/api/v1/events/${id}`, updates).then(res => {
            if(res.data.success) {
                dispatch(editEvent(id, res.data.data));
            };
        });
    };
};


//Delete Event
export const deleteEvent = (id) => ({
    type: DELETE_EVENT,
    id
});

export const startDeleteEvent = (id) => {
    return dispatch => {
        return axios.delete(`${serverConfig.base_url}/api/v1/events/${id}`).then(res => {
            if(res.data.success) {
                dispatch(deleteEvent(id));
            };
        });
    };
};