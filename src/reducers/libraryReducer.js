import { SET_LIBRARY_BOOKS, ADD_LIBRARY_BOOK, EDIT_LIBRARY_BOOK, DELETE_LIBRARY_BOOK } from '../actions/types';

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

        case EDIT_LIBRARY_BOOK:
            if (action.updates.category) {
                if (state.categories.indexOf(action.updates.category) === -1) {
                    categories = [
                        ...state.categories,
                        action.updates.category
                    ]    
                } else {
                    categories = state.categories
                }   
            } else {
                categories = state.categories
            }
            
            return {
                books: state.books.map(book =>{
                        if (book._id === action.id) {
                            return {
                                ...book,
                                ...action.updates
                            };
                        } else {
                            return book;
                        }
                    }),
                categories
            }

        case DELETE_LIBRARY_BOOK:
            return {
                books: state.books.filter(book => book._id !== action.id),
                categories : state.categories
            };

        default: return state;
    }
}
