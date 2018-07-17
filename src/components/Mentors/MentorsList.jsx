import React, {Component} from 'react' ;
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import {Card, Popover, Icon, Row, Col, message} from 'antd' ;
import { startDeleteMentor } from '../../actions/mentorActions';

class MentorItem extends Component {
    state = {
        visible: false
    };

    hide = () => {
        this.setState({
            visible: false,
        });
    };

    handleVisibleChange = (visible) => {
        this.setState({visible});
    };

    render() {
        let mentor = this.props.mentor;
        return (
            <Popover
                content={
                    <div style={{padding : 10}}>
                        <Icon  style={{ fontSize: 18, color: '#08c' }} type="facebook"/> {mentor.facebook} <br/>
                        <Icon  style={{ fontSize: 18, color: '#08c' }} type="linkedin"/> {mentor.linkedIn} <br/>
                        <Icon  style={{ fontSize: 18, color: '#08c' }} type="contacts"/> {mentor.mobile} <br/>
                        <br/>
                        <a onClick={this.hide}>Close</a>
                    </div>
                }
                trigger="click"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
            >
                <Card>
                    <div className="repo">
                        <div className='repo-icon'>
                            <img src={mentor.image} alt="mentor" className="repo-image"/>
                        </div>
                        <div>
                            <div>
                                <Link to={`/mentors/${this.props.mentor._id}`} className='mr-2'><Icon type="edit" /></Link>
                                <Icon type="delete" onClick={(id, name) => this.props.handleDelete(this.props.mentor._id, this.props.mentor.name)}/>
                            </div>
                            <div className='repo-desc'>
                                <strong>{mentor.name}</strong>
                                <p>{mentor.specialization}</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </Popover>
        )
    }

}

class MentorList extends Component {
    
    handleDelete = (id, name) => {
        this.props.startDeleteMentor(id).then(() => {
            message.success(`Mentor ${name} successfully deleted!`);
        })
    };

    renderMentors() {
        return (
            <div className='repo-list'>
                <Row gutter={24} className="my-4">
                {
                    this.props.mentors.map(mentor => {
                        return (
                            <Col span={6} key={mentor._id}>
                                <MentorItem mentor={mentor} handleDelete={this.handleDelete}/>
                            </Col>
                        )
                    })
                }
                </Row>
            </div>
        )
    };

    render() {
        return (
            <div>
                {this.renderMentors()}
            </div>
        );
    };

};

const mapStateToProps = ({mentors}) => ({
    mentors
});

const mapDispatchToProps = (dispatch) => ({
    startDeleteMentor: (id) => dispatch(startDeleteMentor(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MentorList);
