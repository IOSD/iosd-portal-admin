import React, {Component} from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { startAddEvent } from '../../actions/eventActions';
import EventNewForm from './EventNewForm';

class EventAdd extends Component {
    
    onSubmit = (event) => {
        this.props.startAddEvent(event);
        message.success(`Event ${event.title} successfully added`, 3);
    };
    
    render() {
        return (
            <div>
                <EventNewForm onSubmit={this.onSubmit} />
            </div>
        );
    };
};

const mapDispatchToProps = (dispatch) => ({
    startAddEvent: (event) => dispatch(startAddEvent(event))
})

export default connect(undefined, mapDispatchToProps)(EventAdd);