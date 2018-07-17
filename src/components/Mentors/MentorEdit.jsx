import React from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { startEditMentor } from '../../actions/mentorActions';
import MentorNewForm from './MentorNewForm';

class MentorEdit extends React.Component {

    onSubmit = (updates) => {
        this.props.startEditMentor(this.props.mentor._id, updates).then(() => {
            this.props.history.push('/mentors/list');
            message.success(`Mentor ${updates.name} successfully edited`, 3);
        })
    };

    render() {
        return (
            <div>
                <MentorNewForm mentor={this.props.mentor} onSubmit={this.onSubmit}/>
            </div>
        );
    };
};

const mapStateToProps = ({mentors}, props) => ({
    mentor: mentors.find(mentor => mentor._id === props.match.params.id)
})

const mapDispatchToProps = (dispatch) => ({
    startEditMentor: (id, updates) => dispatch(startEditMentor(id, updates))
});

export default connect(mapStateToProps, mapDispatchToProps)(MentorEdit);

