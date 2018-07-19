import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Icon, message } from 'antd' ;
import { connect } from 'react-redux' ;
import { startDeleteEvent } from '../../actions/eventActions';

class EventsList extends Component {

    handleDelete = (id, title) => {
        this.props.startDeleteEvent(id).then(() => {
            message.success(`Event ${title} successfully deleted!`);
        }).catch(err => console.log(err, "could not delete"))
    };


    // TODO : Enable Share Button
    renderCard(event = {}, handleDelete) {
        console.log(event);
        return (
            <div className="card-media">
                <div className="card-media-object-container">
                    <div className="card-media-object"
                         style={{
                             backgroundImage: `url(${event.image})`
                         }}/>
                </div>
                <div className="card-media-body">
                    <div className="card-media-body-top">
                        <span className="subtle">{}</span>
                        <div className="card-media-body-top-icons u-float-right">
                            <svg fill="#888888" height="16" viewBox="0 0 24 24" width="16"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0h24v24H0z" fill="none"/>
                                <path
                                    d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                            </svg>
                            <svg fill="#888888" height="16" viewBox="0 0 24 24" width="16"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                                <path d="M0 0h24v24H0z" fill="none"/>
                            </svg>
                            <span>
                                <Link to={`/events/${event._id}`} className='mr-2'><Icon type="edit" /></Link>
                                <Icon type="delete" onClick={(id, name) => handleDelete(event._id, event.title)}/>
                            </span>
                        </div>
                    </div>
                    <span className="card-media-body-heading">{event.title}</span>
                    <div className="card-media-body-supporting-bottom">
                        <span
                            className="card-media-body-supporting-bottom-text subtle">{event.college}</span>
                    </div>
                    <div
                        className="card-media-body-supporting-bottom card-media-body-supporting-bottom-reveal">
                        <a href={event.link} target='_blank'
                           className="card-media-body-supporting-bottom-text card-media-link u-float-right">KNOW MORE</a>
                    </div>
                </div>
            </div>
        );
    };


    render() {
        let clg = "DTU";
        let myClg = this.props.events.filter(event => {
            return (event.college.toLowerCase() === clg.toLowerCase())
        });

        let notMyClg = this.props.events.filter(event => {
            return (event.college !== clg)
        });
        console.log("events", this.props.events.events);
        console.log("myClg", myClg);
        console.log('notMyClg', notMyClg);

        return (
            <div className='container'>
                <Row gutter={16}>
                    <h2>Event from your College</h2>
                    {
                        myClg.length === 0 ? <p className="my-4">No events</p>
                        : (
                            myClg.map((event, i) => {
                                return (
                                    <Col span={12} key={i}>
                                        {this.renderCard(event, this.handleDelete)}
                                    </Col>
                                )
                            })
                        )
                    }
                </Row>

                <Row gutter={16}>
                    <h2>Event from other colleges</h2>
                    {
                        notMyClg.length === 0 ? <p className="my-4">No events</p>
                        : (
                            notMyClg.map((event, i) => {
                                return (
                                    <Col span={12} key={i}>
                                        {this.renderCard(event, this.handleDelete)}
                                    </Col>
                                )
                            })
                        )
                        
                    }

                </Row>
            </div>
        );
    }
}

const mapStateToProps = ({events}) => ({
    events
});

const mapDispatchToProps = (dispatch) => ({
    startDeleteEvent: (id) => dispatch(startDeleteEvent(id))
});

export default connect(mapStateToProps,mapDispatchToProps)(EventsList);
