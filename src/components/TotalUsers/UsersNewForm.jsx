import React, {Component} from 'react';
import {Card, Row, Col, Form, Input, Button, Select } from 'antd' ;
const FormItem = Form.Item;
const Option = Select.Option;
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
			
			<Card className="my-4" style={{ width:700 }}>
				<Form layout="inline" onSubmit={this.handleSubmit}>
					<Row>
						<Col span={8}>
							<h4>Add New Users</h4>
						</Col>
						<Col span={8} offset={8}>
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
							            htmlType="submit"
							        >
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
                                className= "userName"
						        label="User Name"
						        colon={true}
						        wrapperCol={{span: 24}}
						    >
						    {getFieldDecorator('userName', {
					         	rules: [{ required: true, message: 'Please input User name!' }],
						    })(
						        <Input placeholder="User Name" />
						    )}
                            </FormItem>
                    
						</Col>

                        
						<Col span={11} >
                            <FormItem
                                className= "UserID"
						        label="User ID"
						        colon={true}
						        wrapperCol={{span: 24}}
						    >
						    {getFieldDecorator('userID', {
                                rules: [{ required: true, message: 'Please input User ID!' }],
                           })(
						        <Input placeholder="User ID" />
						    )}
						    </FormItem>
						</Col>
                        </Row>

                        <Row>
						<Col span={11}>
							<FormItem
						        label="User Description"
						        colon={true}
						        wrapperCol={{span: 24}}
						    >
						    {getFieldDecorator('userDescription')(
                                <TextArea placeholder="User Description" autosize={{ minRows: 1, maxRows: 10 }} style={{width: '100%'}}/>
						    )}
						    </FormItem>
                        </Col>

                        

                        
						<Col span={11}>
							<FormItem
						        label="Github ID"
						        colon={true}
						        wrapperCol={{span: 24}}
						    >
						    {getFieldDecorator('email', {
                                rules: [{ required: true, message: 'Please Input Github ID!' }],
                           })(
						        <Input placeholder="gi@github.com" />
						    )}
						    </FormItem>
						</Col>
						</Row>
						<Row>
                        <Col span={11}>
							<FormItem
						        label="Gmail ID"
						        colon={true}
						        wrapperCol={{span: 24}}
						    >
						    {getFieldDecorator('email', {
                                rules: [{ required: true, message: 'Please Input Gmail ID!' }],
                           })(
						        <Input placeholder="@gmail.com" />
						    )}
						    </FormItem>
                        </Col>
                        
                        <Col span={11}>
							<FormItem
						        label="Contact No."
						        colon={true}
						        wrapperCol={{span: 24}}
						    >
						    {getFieldDecorator('contactno', {
                                rules: [{ required: true, message: 'Please Input Contact No.!' }],
                           })(
						        <Input placeholder="Contact No." />
						    )}
						    </FormItem>
						</Col>
						</Row>
							
						<Row>
                        <Col span={11}>
							<FormItem
						        label="Country Name"
						        colon={true}
						        wrapperCol={{span: 24}}
						    >
						    {getFieldDecorator('country name', {
                                rules: [{ required: true, message: 'Please Input Country Name!' }],
                           })(
						        <Input placeholder="Country Name" />
						    )}
						    </FormItem>
                        </Col>
                        
                        <Col span={11}>
							<FormItem
						        label="City Name"
						        colon={true}
						        wrapperCol={{span: 24}}
						    >
						    {getFieldDecorator('cityname', {
                                rules: [{ required: true, message: 'Please Input City Name!' }],
                           })(
						        <Input placeholder="City Name" />
						    )}
						    </FormItem>
						</Col>
						</Row>

                        <Col span={11}>
                            <FormItem
                                className= "institutename"
						        label="Institute Name"
						        colon={true}
						        wrapperCol={{span: 24}}
						    >
						    {getFieldDecorator('institutename', {
					         	rules: [{ required: true, message: 'Please input Institute Name!' }],
						    })(
						        <Input placeholder="Institute Name" />
						    )}
                            </FormItem>
                    
						</Col>
                
                    </Form>
                    </Card>
				
					
</div>


        );
    }
}
const UsersNewForm = Form.create()(WorkoutAdd);
export default UsersNewForm;