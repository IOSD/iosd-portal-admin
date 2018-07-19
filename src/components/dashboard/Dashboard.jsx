import React , {Component} from 'react' ;
import { Row, Col , Card } from 'antd';
import LibrarySummaryCard from "./LibrarySummaryCard";
import Blogs from "./Blogs";
import Courses from "./Courses";
import Events from "./Events";
import Mentor from "./Mentor";
import Project from "./Project";
import TotalUser from "./TotalUser";

class Dashboard extends Component {
    render(){
        return (
            <div className='container dashboard'>
                <Row gutter={16}>
                    <Col span={8}>
                        <LibrarySummaryCard />
                    </Col>
                    <Col span={8}>
                        <Blogs />
                    </Col>
                    <Col span={8}>
                        <Courses />
                    </Col>
                    <Col span={8}>
                        <Events />
                    </Col>
                    <Col span={8}>
                        <Mentor />
                    </Col>
                    <Col span={8}>
                        <Project />
                    </Col>
                    <Col span={8}>
                        <TotalUser />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Dashboard;