import React, {Component} from 'react';
import {Card, Row, Col, Form, Input, Button, Select, Upload, Icon, Divider} from 'antd' ;

import EditableTable from './EditableTable'

import AddVideoForm from './AddVideoForm';

const FormItem = Form.Item;
const { TextArea } = Input;


const columnsInfo = [{
    title: 'Title',
    dataIndex: 'title',
    key: 'title'
}, {
    title: 'URL',
    dataIndex: 'url',
    key: 'url',
}, {
    title: 'Section',
    dataIndex: 'section',
    key: 'section',
}, {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'duration',
}];


class CourseAddForm extends Component {
	
	constructor(props) {
        super(props);
        
        this.state = {
        	title: props.course ? props.course.title : '',
        	sub_title: props.course ? props.course.sub_title : '',
            description: props.course ? props.course.description : '',
            image: props.course ? props.course.image : '',
            prerequisites: props.course ? props.course.prerequisites.join(',') : '',
			instructorName: props.course ? props.course.instructorName : '',
			instructorImage: props.course ? props.course.instructorImage : '',
			instructorAbout: props.course ? props.course.instructorAbout : '',
			instructorJob: props.course ? props.course.instructorJob : '',
			videos: [{
                key: '1',
                title: 'JS',
                url: 'youtube',
                section: 'web',
                duration: 1234
            }]
        };
    };


	componentDidMount() {
    	const { setFieldsValue } = this.props.form;
    	setFieldsValue({
			title: this.state.title,
			sub_title: this.state.sub_title,
            description: this.state.description,
            image: this.state.image,
            prerequisites: this.state.prerequisites,
			instructorName: this.state.instructorName, 
			instructorImage: this.state.instructorImage,
			instructorAbout: this.state.instructorAbout,
			instructorJob: this.state.instructorJob,
		});	
	}
	
	submitVideo = (video) => {
		this.setState({
			 videos: [...this.state.videos, video] 
		})
	};

	handleChange = (newAdditions) => {
        this.setState({
            videos: [...this.state.videos, ...newAdditions],
        })
    }

    onSave = (newData) => {
        this.setState({
            videos: newData,
        })
    };

	handleSubmit = (e) => {
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	    	if (!err) {
	        	values = {
					...values,
					prerequisites: values.prerequisites.split(/[ ,]+/).filter(Boolean)
				}
				this.props.onSubmit(values);
				this.props.form.resetFields();
	      	}
	    });
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div>
				<Row className="my-4">
					<Col>
						<Card>
							<Form layout="inline" onSubmit={this.handleSubmit}>
								<Row>
									<Col>
										{this.props.course ? <h4>Edit Course</h4> : <h4>Add New Course</h4>}
									</Col>
								</Row>

								<Divider />

								<Row>
									<Col span={12}>
										<FormItem
											className= "courseTitle"
											label="Title"
											colon={true}
											wrapperCol={{span: 24}}
										>
										{getFieldDecorator('title', {
											rules: [{ required: true, message: 'Please input course title!' }],
										})(
											<Input placeholder="Title" />
										)}
										</FormItem>
								
									</Col>

									<Col span={12} >
										<FormItem
											label="Sub Title"
											colon={true}
											wrapperCol={{span: 24}}
										>
										{getFieldDecorator('sub_title', {
											rules: [{ required: true, message: 'Please input course sub title!' }],
										})(
											<Input placeholder="Sub Title" />
										)}
										</FormItem>
									</Col>
								</Row>
								<Row>
									<Col span={12}>
										<FormItem
											label="Prerequisites"
											colon={true}
											wrapperCol={{span: 24}}
										>
										{getFieldDecorator('prerequisites', {
											rules: [{ required: true, message: 'Please input course prerequisites!' }],
										})(
											<Input placeholder="Prerequisites" />
										)}
										</FormItem>
									</Col>

									<Col span={12}>
										<FormItem
											label="Description"
											colon={true}
											wrapperCol={{span: 23}}
										>
										{getFieldDecorator('description',{
											rules: [{ required: true, message: 'Please input Description!' }],
										})(
											<TextArea 
												placeholder="Description" 
												autosize={{ minRows: 2, maxRows: 10 }} 
											/>
										)}
										</FormItem>
									</Col>
								</Row>

								<Divider/>
								<h5>Instructor Details</h5>
								<Row>
									<Col span={12}>
										<FormItem
											label="Instructor Name"
											colon={true}
											wrapperCol={{span: 24}}
										>
										{getFieldDecorator('instructorName', {
											rules: [{ required: true, message: 'Please Input instructor name!' }],
										})(
											<Input placeholder="Instructor Name" />
										)}
										</FormItem>
									</Col>
									
									<Col span={12}>
										<FormItem
											label="Instructor Job"
											colon={true}
											wrapperCol={{span: 24}}
										>
										{getFieldDecorator('instructorJob', {
											rules: [{ required: true, message: 'Please Input instructor job!' }],
										})(
											<Input placeholder="Instructor job" />
										)}
										</FormItem>
									</Col>
								</Row>

								<Row>
									<Col span={12}>
										<FormItem
											label="About"
											colon={true}
											wrapperCol={{span: 24}}
										>
										{getFieldDecorator('instructorAbout', {
											rules: [{ required: true, message: 'Please Input instructor description' }],
										})(
											<TextArea 
												placeholder="Description" 
												autosize={{ minRows: 2, maxRows: 10 }} 
											/>
										)}
										</FormItem>
									</Col>
									
									<Col span={12}>
										<FormItem
											label="Intructor Image"
											colon={true}
											wrapperCol={{span: 24}}
										>
										{getFieldDecorator('instructorImage', {
											rules: [{ required: true, message: 'Please Input instructor image link' }],
										})(
											<Input placeholder="Image Link" />
										)}
										</FormItem>
									</Col>
								</Row>

								<Divider/>

								<Row>
									<Col span={16} offset={8}>
										<div className="float-right">
											<FormItem>
												<Button
													style={{marginRight: '1.2rem'}}
													type="primary"
													htmlType="submit"
												>
													Submit
												</Button>
												<Button
													type="danger"
													onClick={() => this.props.field.resetFields()}
												>
													Reset
												</Button>
											</FormItem>
										</div>
									</Col>
								</Row>    
							</Form>
							{
								this.props.course && 
								(	
									<div>
										<AddVideoForm videos={this.state.videos} submitVideo={this.submitVideo}/>	
										<Row>
											<Col span={24}>
												<EditableTable
													columns={columnsInfo}
													rowKey='key'
													dataSource={this.state.videos}
													pagination={false}
													onChange={this.handleChange}
													onSave={this.onSave}
												/>
											</Col>
										</Row>
									</div>
								)
							}
						</Card>
					</Col>
				</Row>
			</div>
        );
    }
}
const CourseNewForm = Form.create()(CourseAddForm);
export default CourseNewForm;