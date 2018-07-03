import React, {Component} from 'react';
import {Card, Row, Col, Form, Input, Button, Select,Upload,Icon} from 'antd' ;
const FormItem = Form.Item;

const { TextArea } = Input;

class WorkoutAdd extends Component {
	
	handleSubmit = (e) => {
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	        console.log('Received values of form: ', values);
	      }
	    });
	  }

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div>
			<Card className="my-4" style={{ width:700, }}>
				<Form layout="inline" onSubmit={this.handleSubmit}>
			<Row>
			<Col span={8}>
				<h4>Add New Courses</h4>
			</Col>
			<Col span={8} offset={8}>
				<div className="float-right">
			<FormItem>
			<Button style={{marginRight: '1.2rem'}} type="primary" htmlType="submit">
				Submit
			</Button>
			<Button type="danger" htmlType="submit">
				Delete
			</Button>
			</FormItem>
				</div>
			</Col>
			</Row>
			<hr />
			<Row>
			<Col span={11}>
			<FormItem 
				className= "courseName" 
				label="Course Name"
				colon={true}
				wrapperCol={{span: 24}}
			>
			{getFieldDecorator('courseName',
			 {rules: [{ required: true, message: 'Please input Course name!' }],
			 })(
				<Input placeholder="Course Name" />
			   )}
            </FormItem>
			</Col>
			<Col span={11}>
			<FormItem
				className= "courseID"
			    label="Course ID"
				colon={true}
				wrapperCol={{span: 24}}
			>
						    {getFieldDecorator('courseID', {
                                rules: [{ required: true, message: 'Please input Course ID!' }],
                           })(
						        <Input placeholder="Course ID" />
						    )}
						    </FormItem>
						</Col>
                        </Row>

                        <Row>
						<Col span={11}>
                            <FormItem
                                className= "Course Description"
						        label="Course Description"
						        colon={true}
						        wrapperCol={{span: 24}}
						    >
                            {getFieldDecorator('course description',{
                            rules: [{ required: true, message: 'Please input Course Description!' }],
                           })
                        (
      <TextArea placeholder="Course Description" autosize={{ minRows: 1, maxRows: 10 }} style={{width: '100%'}}/>
    )}
						    </FormItem>
                        </Col>

						<Col span={11}>
							<FormItem
						        label="Course Link"
						        colon={true}
						        wrapperCol={{span: 24}}
						    >
						    {getFieldDecorator('link', {
                                rules: [{ required: true, message: 'Please Input Course Link!' }],
                           })(
						        <Input placeholder="Link" />
						    )}
						    </FormItem>
                        </Col>
                        </Row>
                        
                        <Row>
						<Col span={11}>
							<FormItem
						        label="Course Pre-Requisities"
						        colon={true}
						        wrapperCol={{span: 24}}
						    >
						    {getFieldDecorator('pre-requisities', {
                                rules: [{ required: true, message: 'Please Input Pre-Requisities!' }],
                           })(
						        <Input placeholder="Course Pre-Requisities" />
						    )}
						    </FormItem>
                        </Col>
                        <Col span={11}>
							<FormItem
						        label="Course Duration"
						        colon={true}
						        wrapperCol={{span: 24}}
						    >
						    {getFieldDecorator('duration', {
                                rules: [{ required: true, message: 'Please Input Course Duration!' }],
                           })(
						        <Input placeholder="Duration" />
						    )}
						    </FormItem>
						</Col>
						
						</Row>
						<hr />
						<Row className='text-center'>
						<Col>
						<Upload>
    					<Button className='btn btn-sm btn-outline-primary'>
						<Icon type="upload" />
							 Upload Courses
    					</Button>
						</Upload>
						</Col>
						</Row>
							
                
					</Form>
					
                    </Card>
				
					
</div>


        );
    }
}
const CourseNewForm = Form.create()(WorkoutAdd);
export default CourseNewForm;