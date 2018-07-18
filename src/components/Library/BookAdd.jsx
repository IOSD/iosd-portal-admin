import React, {Component} from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import BookNewForm from './BookNewForm';
import { startAddLibraryBook } from '../../actions/libraryActions';

class BookAdd extends Component {

	onSubmit = (book) => {
		this.props.startAddLibraryBook(book);
		message.success(`Book ${book.name} successfully added`, 3);
	};

    render() {
		return (
            <div>
            	<BookNewForm onSubmit={this.onSubmit}/>
            </div>
        );
    }       
};


const mapDispatchToProps = (dispatch) => {
	return {
		startAddLibraryBook: (book) => dispatch(startAddLibraryBook(book)),
	}
}

export default connect(undefined, mapDispatchToProps)(BookAdd);