import axios from 'axios';
import { SET_LIBRARY_BOOKS, ADD_LIBRARY_BOOK } from './types.js';
import serverConfig from './server.config';

export const setLibraryBooks = ({ books, category }) => ({	 
	type: SET_LIBRARY_BOOKS,
	books,
	categories: category
});

export const addLibraryBook = ({ data }) => ({
    type: ADD_LIBRARY_BOOK,
    book: data
});

export function fetchLibraryBooks(){
    return dispatch => {
        return axios.get(`${serverConfig.base_url}/api/v1/library/books`).then(res => {
            // console.log(res.data);
            if(res.data.success){
                dispatch(setLibraryBooks(res.data))
            }; 
        });
    };
};

export const addNewLibraryBook = (book) => {
    return dispatch => {
        return axios.post(`${serverConfig.base_url}/api/v1/library/book/new`, book).then(res => {
            if(res.data.success) {
                dispatch(addLibraryBook(res.data));
            };
        });
    };
};
