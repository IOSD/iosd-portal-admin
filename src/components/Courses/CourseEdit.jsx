import React from 'react';
import { connect } from 'react-redux';
import { message, Row, Col } from 'antd';
// import { startEditCourse } from '../../actions/courseActions';

import CourseNewForm from './CourseNewForm';

class CourseEdit extends React.Component {

    onSubmit = (updates) => {
        // this.props.startEditCourse(this.props.course._id, updates).then(() => {
        //     this.props.history.push('/courses/list');
        //     message.success(`Course ${updates.title} successfully edited`, 3);
        // })
    };

    render() {
        return (
            <div>
               <CourseNewForm course={this.props.course} onSubmit={this.onSubmit} />
            </div>
        );
    };
};

const mapStateToProps = ({courses}, props) => ({
    course: courses.find(course => course._id === props.match.params.id)
})

const mapDispatchToProps = (dispatch) => ({
    // startEditCourse: (id, updates) => dispatch(startEditCourse(id, updates))
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseEdit);

