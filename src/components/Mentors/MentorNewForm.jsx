import React, { Component } from 'react';
import { Card, Row, Col, Form, Input, Button, Select, Divider, Icon } from 'antd' ;

const FormItem = Form.Item;
const Option = Select.Option;

class MentorForm extends Component {
	
	constructor(props) {
        super(props);
        
        this.state = {
        	name: props.mentor ? props.mentor.name : '',
        	image: props.mentor ? props.mentor.image : '',
            specialization: props.mentor ? props.mentor.specialization : '',
            mobile: props.mentor ? props.mentor.mobile : '',
            facebook: props.mentor ? props.mentor.facebook : '',
			linkedIn: props.mentor ? props.mentor.linkedIn : ''
        };
    };


	componentDidMount() {
    	const { setFieldsValue } = this.props.form;
    	setFieldsValue({
			name: this.state.name,
			specialization: this.state.specialization,
            mobile: this.state.mobile,
            image: this.state.image,
            facebook: this.state.facebook,
            linkedIn: this.state.linkedIn 
		});	
    }

	handleSubmit = (e) => {
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	    	if (!err) {
	        	console.log('Received values of form: ', values);
	        	this.props.onSubmit(values);
				this.props.form.resetFields();	
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
							<p>{values.specialization}</p>
						</div>
						<div className="pane__section clearfix">
							{values.mobile  &&
								<span className='mr-2'>
									<Icon  style={{ fontSize: 22, color: '#08c' }} type="contacts"/>
									<span> {values.mobile}</span>
								</span>
							}
							{values.facebook  &&
								<span className='mr-2'>
									<Icon  style={{ fontSize: 22, color: '#08c' }} type="facebook"/>
									<a href={values.facebook}> {values.facebook}</a>
								</span>
							}
							{values.linkedIn &&
								<span className='mr-2'>
									<Icon  style={{ fontSize: 22, color: '#08c' }} type="linkedin"/>
									<a href={values.linkedIn}> {values.linkedIn}</a>
								</span>
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
										{this.props.mentor ? <h4>Edit Mentor</h4> : <h4>Add New Mentro</h4>}
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
											<Input placeholder="image link" />
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
											rules:[{required: true, message: "Please select a Core Technology"}]
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

export default MentorNewForm;