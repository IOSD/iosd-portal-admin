import React from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { startEditEvent } from '../../actions/eventActions';
import EventNewForm from './EventNewForm';

class EventEdit extends React.Component {

    onSubmit = (updates) => {
        this.props.startEditEvent(this.props.event._id, updates).then(() => {
            this.props.history.push('/events/list');
            message.success(`Event ${updates.title} successfully edited`, 3);
        })
    };

    render() {
        return (
            <div>
                <EventNewForm event={this.props.event} onSubmit={this.onSubmit}/>
            </div>
        );
    };
};

const mapStateToProps = ({events}, props) => ({
    event: events.find(event => event._id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
    startEditEvent: (id, updates) => dispatch(startEditEvent(id, updates))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventEdit);