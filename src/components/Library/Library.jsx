import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchLibraryBooks } from '../../actions/libraryActions';
import {Route , Switch , Redirect} from 'react-router-dom' ;
import LibraryBookList from "./LibraryBookList";
import BookAdd from "./BookAdd";
import BookEdit from "./BookEdit";

class Library extends Component {
        
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    };

    componentWillMount() {
        if(this.props.library.books.length === 0) {
            this.props.fetchLibraryBooks()
            .then(() => this.setState({loading: false}));  
        } else {
            this.setState({loading: false});
        }    
    };

    render() {
        if(this.state.loading) {
            return <h1>Loading</h1>;
        }
        return(
            <div className='container'>
                <Switch>
                    <Route path='/library/list' component={LibraryBookList}/>
                    <Route path='/library/book/new' component={BookAdd}/>
                    <Route path='/library/book/:id' component={BookEdit}/>
                    <Route path='/library' component={()=><Redirect to='/library/list'/>}/>
                </Switch>
            </div>
        );   
    };
};

const mapStateToProps = ({library}) => {
    return {
        library
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchLibraryBooks: () => dispatch(fetchLibraryBooks())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Library);
