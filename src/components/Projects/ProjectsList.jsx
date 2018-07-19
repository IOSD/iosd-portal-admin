import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startDeleteProject } from '../../actions/projectActions';
import {Row, Col, Card, Button, Modal, Avatar } from 'antd';

class ProjectsList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            project : {
                prerequisites : []
            },
            visible : false
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this)
        this.handleDelete = this.handleDelete.bind(this);
    };

    handleClick(project) {
        console.log(project , "Project");
        this.setState({
            visible: true,
            project
        })
    };

    handleCancel() {
        this.setState({
            visible: false
        })
    };
    
    handleDelete(id) {
        this.props.startDeleteProject(id).then(() => {
            this.setState({
                visible: false
            });
        })
    };

    renderRepos() {
        return (
            <div className='repo-list'>
                {
                    this.props.projects.map((project, i) => {
                        return (
                            <Col span={6} key={i}>
                                <Card>
                                    <div className="repo" onClick={()=> {
                                        this.handleClick(project)
                                    }}>
                                        <div className='repo-icon'>
                                            <Avatar size="large" icon="user" src={project.image}/>
                                        </div>
                                        <div className='repo-desc'>
                                            <strong>{project.name}</strong>
                                            <p>{project.caption}</p>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        )
                    })
                }
            </div>
        )
    }

    render() {
        
        let selectedProject = this.state.project;
        
        return (
            <div>
                <Row>
                    {this.renderRepos()}
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
                    <article className="item-pane" style={{alignItems : "flex-start"}}>
                        <div className="item-preview">
                            <img className='img-responsive' src={selectedProject.image} alt=""/>
                        </div>
                        <div className="item-details">
                            <h1>{selectedProject.name}</h1><span className="subtitle">{selectedProject.caption}</span>
                            <div className="pane__section">
                                <p>
                                    {selectedProject.description}
                                </p>
                                <h3>Pre-Requisities</h3>
                                <ul>
                                    {
                                        selectedProject.prerequisites.map((item, i) => <li key={i}>{item}</li>)
                                    }
                                </ul>
                            </div>
                            <div className="pane__section clearfix">
                                <div className='pull-right'>
                                    <Link to={`/projects/${selectedProject._id}`}>
                                        <Button size='large' className='button-solid mr-1'>
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button size='large' className='button-solid' onClick={(id) => this.handleDelete(selectedProject._id)}>
                                        Delete
                                    </Button>
                                </div>
                                <Button size='large' className='button-solid mr-2'>
                                    <a href={selectedProject.github}>Visit Github</a>
                                </Button>
                            </div>
                        </div>
                    </article>
                </Modal>
            </div>
        );
    }

}

const mapStateToProps = ({ projects }) => {
    return ({
        projects
    })
}

const mapDispatchToProps = (dispatch) => {
    return {
        startDeleteProject: (id) => dispatch(startDeleteProject(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);
