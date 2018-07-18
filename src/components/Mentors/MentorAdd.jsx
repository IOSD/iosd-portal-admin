import React, {Component} from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { startAddMentor } from '../../actions/mentorActions';
import MentorNewForm from './MentorNewForm';

class MentorAdd extends Component {
    
    onSubmit = (mentor) => {
        this.props.startAddMentor(mentor);
        message.success(`Mentor ${mentor.name} successfully added`, 3);
    };
    
    render() {
        return (
            <div>
                <MentorNewForm onSubmit={this.onSubmit} />
            </div>
        );
    };
};

const mapDispatchToProps = (dispatch) => ({
    startAddMentor: (mentor) => dispatch(startAddMentor(mentor))
})

export default connect(undefined, mapDispatchToProps)(MentorAdd);
