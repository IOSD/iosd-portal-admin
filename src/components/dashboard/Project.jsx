import React, {Component} from 'react';
import {Row, Col, Card, Button, Icon} from 'antd' ;
import {Link} from 'react-router-dom' ;

class Project extends Component {

    render() {

        let f = (
            <Row className='card-header'>
                <Col span={8} className='bulb'>
                    <img height="68px" src="http://danajfrank.com/assets/img/sidewalks/project_roles_icon.png" width="68px"
                         alt={'Random Text'}/>

                </Col>
                <Col span={16} className='header'>
                    Projects
                    <p>
                        Add, Update, Delete or View Projects
                    </p>
                </Col>
            </Row>
        )


        return (
            <div>
                <Card title={f}>
                    <Row className='text-center'>
                        <Col span={12}>
                            <Link to='/projects/list'>
                                <button className='btn btn-sm btn-outline-primary '>
                                    View Projects
                                </button>
                            </Link>
                        </Col>
                        <Col span={12}>
                            <Link to='/projects/new'>
                                <button className='btn btn-sm btn-outline-primary'>
                                    <Icon type="plus"/> Add Projects
                                </button>
                            </Link>
                        </Col>
                    </Row>
                </Card>
            </div>
        );
    }
}

export default Project;
