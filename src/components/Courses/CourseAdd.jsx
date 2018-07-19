import React, {Component} from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { startAddCourse } from '../../actions/courseActions';
import CourseNewForm from './CourseNewForm';

class CourseAdd extends Component {
    
    onSubmit = (course) => {
        this.props.startAddCourse(course);
        message.success(`Course ${course.title} successfully added`, 3);
    };
    
    render() {
        return (
            <div>
                <CourseNewForm onSubmit={this.onSubmit} />
            </div>
        );
    };
};

const mapDispatchToProps = (dispatch) => ({
    startAddCourse: (course) => dispatch(startAddCourse(course))
})

export default connect(undefined, mapDispatchToProps)(CourseAdd);
