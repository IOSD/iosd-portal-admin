import React, {Component} from 'react';
import {Row, Col, Modal, Button} from 'antd' ;
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchLibraryBooks, startDeleteLibraryBook } from '../../actions/libraryActions'

class LibraryComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            book: {}
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleClick(book) {
        console.log(book);
        this.setState({
            visible: true,
            book: book
        })
    };

    handleCancel() {
        this.setState({
            visible: false
        })
    };

    handleDelete(id) {
        this.props.startDeleteLibraryBook(id).then(() => {
            this.setState({
                visible: false
            });
            this.props.fetchLibraryBooks();
        })
    }

    render() {
        let selectedBook = this.state.book;
        const { books } = this.props.library;
        console.log(this.props.library);
        return (
            <div>
                <Row className='container'>
                    {
                        books.map((item, i) => {
                            return (
                                <Col id={item._id} key={i} span={4} className='book-card' onClick={() => {
                                    this.handleClick(item);
                                }}>
                                    <div className="cover">
                                        <img className='img-responsive' src={item.image} alt=""/>
                                    </div>
                                </Col>
                            )
                        })
                    }

                </Row>
                <Modal
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    width={'1000 shitty pixels'}
                    style={{
                        display: 'table'
                    }}
                    wrapClassName="vertical-center-modal"
                >
                    <article className="item-pane">
                        <div className="item-preview">
                            <div className="book" style={
                                {
                                    background: `url('${selectedBook.image}')`,
                                    '--before-bg' : `${selectedBook.color}`

                                }} data-color={selectedBook.color}>

                            </div>
                        </div>
                        <div className="item-details">
                            <h1>{selectedBook.name}</h1><span className="subtitle">{selectedBook.author}</span>
                            <div className="pane__section">
                                <p>
                                    {selectedBook.description}
                                </p>
                            </div>
                            <div className="pane__section clearfix">
                                <Button size='large' className='button-solid'>
                                    Download
                                </Button>
                                <div className='pull-right'>
                                    <Link to={`/library/book/${selectedBook._id}`}>
                                        <Button size='large' className='button-solid mr-4'>
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button size='large' className='button-solid' onClick={(id) => this.handleDelete(selectedBook._id)}>
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </article>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = ({library}) => {
    return ({
        library
    })
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchLibraryBooks: () => dispatch(fetchLibraryBooks()),
        startDeleteLibraryBook: (id) => dispatch(startDeleteLibraryBook(id))
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(LibraryComponent);
