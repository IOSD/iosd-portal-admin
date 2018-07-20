import React, {Component} from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { startAddProject } from '../../actions/projectActions';
import ProjectNewForm from './ProjectNewForm';

class ProjectAdd extends Component {
    
    onSubmit = (project) => {
        this.props.dispatch(startAddProject(project));
        message.success(`Project ${project.name} successfully added`, 3);
    };
    
    render() {
        return (
            <div>
                <ProjectNewForm onSubmit={this.onSubmit} />
            </div>
        );
    };
};

export default connect()(ProjectAdd);
