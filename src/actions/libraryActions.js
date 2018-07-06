import axios from 'axios';
import { SET_LIBRARY_BOOKS, ADD_LIBRARY_BOOK, EDIT_LIBRARY_BOOK, DELETE_LIBRARY_BOOK } from './types.js';
import serverConfig from './server.config';

//SET_LIBRARY_BOOKS
export const setLibraryBooks = ({ books, category }) => ({	 
	type: SET_LIBRARY_BOOKS,
	books,
	categories: category
});

export function fetchLibraryBooks(){
    return dispatch => {
        return axios.get(`${serverConfig.base_url}/api/v1/library/books`).then(res => {
            if(res.data.success){
                dispatch(setLibraryBooks(res.data))
            }; 
        });
    };
};

//ADD_LIBRARY_BOOK
export const addLibraryBook = ({ data }) => ({
    type: ADD_LIBRARY_BOOK,
    book: data
});

export const startAddLibraryBook = (book) => {
    return dispatch => {
        return axios.post(`${serverConfig.base_url}/api/v1/library/book/new`, book).then(res => {
            if(res.data.success) {
                dispatch(addLibraryBook(res.data));
            };
        });
    };
};

//EDIT_LIBRARY_BOOK
export const editLibraryBook = (id, updates) => ({
    type: EDIT_LIBRARY_BOOK,
    id,
    updates
});

export const startEditLibraryBook = (id, updates) => {
    return dispatch => {
        return axios.post(`${serverConfig.base_url}/api/v1/library/book/${id}`, updates).then(res => {
            if(res.data.success) {
                dispatch(editLibraryBook(id, updates));
            };
        })
    }
}

export const deleteLibraryBook = (id) => ({
    type: DELETE_LIBRARY_BOOK,
    id
});

export const startDeleteLibraryBook = (id) => {
    return dispatch => {
        return axios.delete(`${serverConfig.base_url}/api/v1/library/book/${id}`).then(res => {
            if(res.data.success) {
                dispatch(deleteLibraryBook(id));
            }
        })
    }
}
