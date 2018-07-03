import { DatePicker } from 'antd';
import moment from 'moment';
import React, {Component} from 'react';
import {Card, Row, Col, Form, Input, Button, Select,Upload,Icon } from 'antd' ;
const FormItem = Form.Item;

const { TextArea } = Input;
const dateFormat = 'YYYY/MM/DD';

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
							<h4>Add New Books</h4>
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
                                className= "bookName"
						        label="Book Name"
						        colon={true}
						        wrapperCol={{span: 23}}
						    >
						    {getFieldDecorator('bookName', {
					         	rules: [{ required: true, message: 'Please input your Book name!' }],
						    })(
						        <Input placeholder="Book Name" />
						    )}
                            </FormItem>
                    
						</Col>

                        
						<Col span={11} >
                            <FormItem
                                className= "authorname"
						        label="Author Name"
						        colon={true}
						        wrapperCol={{span: 23}}
						    >
						    {getFieldDecorator('authorname', {
                                rules: [{ required: true, message: 'Please input Author name!' }],
                           })(
						        <Input placeholder="Author name" />
						    )}
						    </FormItem>
						</Col>
                        </Row>

                        <Row>
						<Col span={11}>
                            <FormItem
                                className= "bookpreface"
						        label="Book Preface"
						        colon={true}
						        wrapperCol={{span: 24}}
						    >
                            {getFieldDecorator('bookpreface',{
                            rules: [{ required: true, message: 'Please input Book Preface!' }],
                           })
                        (
      <TextArea placeholder="Book Preface" autosize={{ minRows: 1, maxRows: 10 }} style={{width: '100%'}}/>
    )}
						    </FormItem>
                        </Col>

                        
							
						    
							 <Col span={11}>
							 <FormItem
						        label= "Select Publication Date"
						        colon={true}
						        wrapperCol={{span: 24}}
							>
							{getFieldDecorator('selectpublicationdate', {
						    	initialValue: "Select",
						    	rules:[{required: true, message: "Please select a Publication date"}]
							 })(
							 <div>
								 <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />
							 </div>
						    )}
						    </FormItem>
						</Col>
                        </Row>


                        <Row>
						<Col span={11}>
							<FormItem
						        label="Book ISBN"
						        colon={true}
						        wrapperCol={{span: 24}}
						    >
						    {getFieldDecorator('number', {
                                rules: [{ required: true, message: 'Please Input Book ISBN!' }],
                           })(
						        <Input placeholder="Book ISBN" />
						    )}
						    </FormItem>
                        </Col>
                        <Col span={11}>
							<FormItem
						        label="Publisher Name"
						        colon={true}
						        wrapperCol={{span: 24}}
						    >
						    {getFieldDecorator('publishername', {
                                rules: [{ required: true, message: 'Please Input Publisher Name' }],
                           })(
						        <Input placeholder="Publisher Name" />
						    )}
						    </FormItem>
						</Col>
						<Col span={11}>
							<FormItem
						        label="Book Category"
						        colon={true}
						        wrapperCol={{span: 22}}
						    >
						    {getFieldDecorator('bookcategory', {
                                rules: [{ required: true, message: 'Please Input Book Category' }],
                           })(
						        <Input placeholder="Category" />
						    )}
						    </FormItem>
						</Col>
						
						<Col span={11}>
							<FormItem
						        label="Book Colour"
						        colon={true}
						        wrapperCol={{span: 24}}
						    >
						    {getFieldDecorator('bookcolour', {
                                rules: [{ required: true, message: 'Please Input Book Colour' }],
                           })(
						        <Input placeholder="Colour" />
						    )}
						    </FormItem>
						</Col>

                        <Col span={11}>
							<FormItem
						        label="Book Link"
						        colon={true}
						        wrapperCol={{span: 24}}
						    >
						    {getFieldDecorator('link', {
                                rules: [{ required: true, message: 'Please Input Access link!' }],
                           })(
						        <Input placeholder="Link" />
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
							 Upload Books
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
const BookNewForm = Form.create()(WorkoutAdd);
export default BookNewForm;