import { SET_LIBRARY_BOOKS, ADD_LIBRARY_BOOK } from '../actions/types';

const initialState = {
    books : [] ,
    categories : []
};

export default (state = initialState, action = {}) => {
    switch(action.type) {
        case SET_LIBRARY_BOOKS :
            return {
                books : action.books,
                categories: action.categories
            };
            
        case ADD_LIBRARY_BOOK :
            let categories = [];
            if (state.categories.indexOf(action.book.category) === -1) {
                    categories = [
                    ...state.categories,
                    action.book.category
                ]    
            } else {
                categories = state.categories
            }
            return {
                books: [
                    ...state.books,
                    action.book
                ],
                categories: categories
                
            };

        default: return state;
    }
}
