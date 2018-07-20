import React, {Component} from 'react';
import {Card, Row, Col, Form, Input, Button, Divider } from 'antd' ;
const FormItem = Form.Item;
const { TextArea } = Input;

class ProjectForm extends Component {
	constructor(props) {
        super(props);
        
        this.state = {
        	name: props.project ? props.project.name : '',
        	caption: props.project ? props.project.caption : '',
            description: props.project ? props.project.description : '',
            github: props.project ? props.project.github : '',
            image: props.project ? props.project.image : '',
            prerequisites: props.project ? props.project.prerequisites.join(',') : ''
        };
    };

	handleSubmit = (e) => {
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	    	if (!err) {
				console.log('Received values of form: ', values);
				values = {
					...values,
					prerequisites: values.prerequisites.split(/[ ,]+/).filter(Boolean)
				}
	        	this.props.onSubmit(values);
				this.props.form.resetFields();
	        }
	    });
	};

	componentDidMount() {
    	const {setFieldsValue} = this.props.form;
		
    	setFieldsValue({
			name: this.state.name,
			caption: this.state.caption,
			description: this.state.description,
            image: this.state.image,
            github: this.state.github,
            prerequisites: this.state.prerequisites
		});	
    }

	renderCard(values) {
		const isEmpty = Object.values(values).every(x => (x === "" || x === undefined));

        return (
           	<Card>
           		<Row>
					<Col>
						<h4>Preview</h4>
					</Col>
				</Row>

				<Divider/>
				   
				{isEmpty ? <h3>Start Filling the form to see the preview</h3> 
			    : (
					<article className="item-pane" style={{alignItems : "flex-start"}}>
						<div className="item-preview">
							{values.image && <img className='img-responsive' src={values.image} alt="project"/>}
						</div>
						<div className="item-details">
							<h1>{values.name}</h1><span className="subtitle">{values.caption}</span>
							<div className="pane__section">
								<p>
									{values.description}
								</p>
								{values.prerequisites &&
									<div>
										<h3>Pre-Requisities</h3>
										<ul>
											{
												values.prerequisites.split(/[ ,]+/).filter(Boolean).map((item, i) => <li key={i}>{item}</li>)
											}
										</ul>
									</div>
								}
							</div>
							<div className="pane__section clearfix">
								<Button size='large' className='button-solid'>
									Visit Github
								</Button>
							</div>
						</div>
					</article>
				)
            }
        	</Card>
        );
    };
	
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div>
				<Row>
					<Col>
						<Card className="my-4">
							<Form layout="inline" onSubmit={this.handleSubmit}>
								<Row>
									<Col>
										<h4>{this.props.project ? 'Edit Project' : 'Add New Project'}</h4>
									</Col>
								</Row>

								<Divider/>

								<Row>
									<Col span={12}>
										<FormItem
											label="Name"
											colon={true}
											wrapperCol={{span: 24}}
										>
										{getFieldDecorator('name', {
											rules: [{ required: true, message: 'Please input your name!' }],
										})(
											<Input placeholder="Name" />
										)}
										</FormItem>
									</Col>
								
									<Col span={12} >
										<FormItem
											label="Caption"
											colon={true}
											wrapperCol={{span: 24}}
										>
										{getFieldDecorator('caption', {
											rules: [{ required: true, message: 'Please input caption!' }],
										})(
											<Input placeholder="Caption" />
										)}
										</FormItem>
									</Col>
								</Row>
								
								<Row>
									<Col span={12}>
										<FormItem
											label="Description"
											colon={true}
											wrapperCol={{span: 24}}
										>
										{getFieldDecorator('description',{
										rules: [{ required: true, message: 'Please input description!' }],
										})(
											<TextArea placeholder="description" autosize={{ minRows: 2, maxRows: 10 }}/>
										)}
										</FormItem>
									</Col>

									<Col span={12}>
										<FormItem
											label= "Image Link"
											colon={true}
											wrapperCol={{span: 24}}
										>
										{getFieldDecorator('image', {
											rules:[{required: true, message: "Please select an image link"}]
										})(
											<Input placeholder='image link'/>
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
											rules: [{ required: true, message: 'Please Input prerequisites' }],
										})(
											<Input placeholder="Prerequisites(comma separated)" />
										)}
										</FormItem>
									</Col>
									
									<Col span={12}>
										<FormItem
											label="Github Link"
											colon={true}
											wrapperCol={{span: 24}}
										>
										{getFieldDecorator('github', {
											rules: [{ required: true, message: 'Please Input Github Link' }],
										})(
											<Input placeholder="github link" />
										)}
										</FormItem>
									</Col>
								</Row>
								
								<Divider />
								
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
													onClick={() => this.props.form.resetFields()}
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
						<div className="my-4">
							{this.renderCard(this.props.form.getFieldsValue())}
						</div>
					</Col>		
				</Row>
			</div>
        );
    }
};

const ProjectNewForm = Form.create()(ProjectForm);
export default ProjectNewForm;