import React from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { startEditProject } from '../../actions/projectActions';
import ProjectNewForm from './ProjectNewForm';

class ProjectEdit extends React.Component {

    onSubmit = (updates) => {
        this.props.startEditProject(this.props.project._id, updates).then(() => {
            this.props.history.push('/projects/list');
            message.success(`project ${updates.name} successfully edited`, 3);
        })
    };

    render() {
        return (
            <div>
                <ProjectNewForm project={this.props.project} onSubmit={this.onSubmit}/>
            </div>
        );
    };
};

const mapStateToProps = ({ projects }, props) => ({
    project: projects.find(project => project._id === props.match.params.id)
})

const mapDispatchToProps = (dispatch) => ({
    startEditProject: (id, updates) => dispatch(startEditProject(id, updates))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectEdit);