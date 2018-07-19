import React, {Component} from 'react';
import BookNewForm from './BookNewForm';
import { message } from 'antd';
import { startEditLibraryBook, fetchLibraryBooks } from '../../actions/libraryActions';
import { connect } from 'react-redux';

class BookEdit extends Component {

	onSubmit = (updates) => {
		this.props.startEditLibraryBook(this.props.book._id, updates);
		if(updates.category !== this.props.book.category) {
			this.props.fetchLibraryBooks().then(() => this.props.history.push('/library/list'))
		}
		this.props.history.push('/library/list');
		message.success(`Book ${updates.name} successfully edited`, 3);
	};

    render() {
    	console.log("book", this.props.book);
		return (
			<div>
            	<BookNewForm book={this.props.book} onSubmit={this.onSubmit}/>
            </div>
        );
    }       
}


const mapStateToProps = ({library}, props) => {
	return {
		book: library.books.find(book => book._id === props.match.params.id)
   	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchLibraryBooks: () => dispatch(fetchLibraryBooks()),
		startEditLibraryBook: (id, updates) => dispatch(startEditLibraryBook(id, updates)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(BookEdit);
