import React, {Component} from 'react';
import BookNewForm from './BookNewForm';
import { startAddLibraryBook } from '../../actions/libraryActions';
import { connect } from 'react-redux';

class BookAdd extends Component {

	onSubmit = (book) => {
		this.props.startAddLibraryBook(book);
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