import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchMentors, addNewMentor } from '../../actions/mentorActions';
import {Card, Row, Col, Form, Input, Button, Select, Divider } from 'antd' ;

const FormItem = Form.Item;
const Option = Select.Option;

class MentorForm extends Component {
	
	handleSubmit = (e) => {
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	    	if (!err) {
	        	console.log('Received values of form: ', values);
	        	if(this.props.mentors.length > 0) {
	        		this.props.dispatch(addNewMentor(values)).then(() => {
	        			this.props.form.resetFields();
	        		});
	        	} else {
	        		this.props.dispatch(fetchMentors()).then(() => {
	        			this.props.dispatch(addNewMentor(values)).then(() => {
	        				this.props.form.resetFields();
	        			})
	        		}).catch(err => console.log("could not connect to database"));
	        	};
	      	};
	    });
	};

	renderCard(values) {
		const isEmpty = Object.values(values).every(x => (x === '' || x === undefined));
        return (
			<Card>
				<Row>
					<Col>
						<h4>Preview</h4>
					</Col>
				</Row>

           		<Divider/>
				
				{isEmpty ? <h3>Start Filling the form to see the preview</h3>
		   		:<article className="item-pane" style={{alignItems : "flex-start"}}>
		   			<div className="mentor-image mr-5" style={{background: `url('${values.image}')`}}></div>
		   			<div className="item-details">
						<h1>{values.name}</h1>
						<div className="pane__section">
							<p>
							{values.specialization}
							</p>
							<p>
							{values.mobile}
							</p>
						</div>
						<div className="pane__section clearfix">
							{values.facebook  &&
								<Button size='large' className='button-solid mr-4'>
									<a 
										href={values.facebook} 
										target='_blank'
										className="card-media-body-supporting-bottom-text card-media-link u-float-right"
									>
										Facebook Profile
									</a>
							   </Button>
							}
							{values.linkedIn &&
								<Button size='large' className='button-solid'>
									<a 
										href={values.linkedIn} 
										target='_blank'
										className="card-media-body-supporting-bottom-text card-media-link u-float-right"
									>
										LinkedIn Profile
									</a>
								</Button>
							}
			   			</div>
			   		</div>
	   			</article>
	   			}	
            </Card>
        )
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
										<h4>Add New Mentor</h4>
									</Col>
								</Row>

								<Divider />

								<Row>
									<Col span={12}>
										<FormItem
											className= "mentorName"
											label="Mentor Name"
											colon={true}
											wrapperCol={{span: 24}}
										>
										{getFieldDecorator('name', {
											rules: [{ required: true, message: 'Please input Mentor name!' }],
										})(
											<Input placeholder="Mentor Name" />
										)}
										</FormItem>
								
									</Col>

									<Col span={12} >
										<FormItem
											label="Mentor image link"
											colon={true}
											wrapperCol={{span: 24}}
										>
										{getFieldDecorator('image', {
											rules: [{ required: true, message: 'Please input Mentor ID!' }],
										})(
											<Input placeholder="Mentor ID" />
										)}
										</FormItem>
									</Col>
								</Row>
								<Row>
									<Col span={12}>
										<FormItem
											label= "Select Mentor Core Technology"
											colon={true}
											wrapperCol={{span: 24}}
										>
										{getFieldDecorator('specialization', {
											initialValue: "",
											rules:[{required: true, message: "Please select a CoreTechnology"}]
										})(
											<Select>
												<Option value="Machine Learning">Machine Learning</Option>
												<Option value="Python">Python</Option>
												<Option value="IOT">IOT</Option>
												<Option value="React JS">React JS</Option>
											</Select>
										)}
										</FormItem>
									</Col>

									<Col span={12}>
										<FormItem
											label="Mentor Contact No."
											colon={true}
											wrapperCol={{span: 24}}
										>
										{getFieldDecorator('mobile', {
											rules: [{ required: true, message: 'Please Input Contact No.!' }],
										})(
											<Input placeholder="Contact Number" />
										)}
										</FormItem>
									</Col>
								</Row>
							
								<Row>
									<Col span={12}>
										<FormItem
											label="Facebook Profile"
											colon={true}
											wrapperCol={{span: 24}}
										>
										{getFieldDecorator('facebook', {
											rules: [{ required: true, message: 'Please Input Facebook profile link!' }],
										})(
											<Input placeholder="Facebook profile link" />
										)}
										</FormItem>
									</Col>
									
									<Col span={12}>
										<FormItem
											label="LinkedIn Profile"
											colon={true}
											wrapperCol={{span: 24}}
										>
										{getFieldDecorator('linkedIn', {
											rules: [{ required: true, message: 'Please Input LinkedIn ID!' }],
										})(
											<Input placeholder="Linkedin profile link" />
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
						</Card>
					</Col>
					<Col>
						<div>
							{ this.renderCard(this.props.form.getFieldsValue()) }
						</div>
					</Col>
				</Row>
			</div>
        );
    };
};

const MentorNewForm = Form.create()(MentorForm);

const mapStateToProps = ({ mentors }) => {
	return {
		mentors
	};
};

export default connect(mapStateToProps)(MentorNewForm);