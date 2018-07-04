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

	  renderCard(values) {
        console.log(values)
        return (
           <Card style={{ width:700}}> 
		   <article className="item-pane" style={{alignItems : "flex-start"}}>
		   <div className="item-preview">
			   <img className='img-responsive' alt=""/>
		   </div>
		   <div className="item-details">
			   <h1>{values.mentorname}</h1>
			   <h2>{values.mentorID}</h2>
			   <div className="pane__section">
				<p>
				 {values.mentordescription}
				</p>
				<p>
				 {values.selectmentorcoreTechnology}
				</p>
				<p>
				 {values.institutename}
				</p>
				<p>
				  {values.number}
				</p>
								   
			   </div>
			   <div className="pane__section clearfix">
			   
				   <Button size='large' className='button-solid'>
				   <a href={values.link} target='_blank'
			   className="card-media-body-supporting-bottom-text card-media-link u-float-right">Github  Link
					  </a>
					   
				   </Button>
			   </div>
			   <div className="pane__section clearfix">
			   
				   <Button size='large' className='button-solid'>
				   <a href={values.link1} target='_blank'
			   className="card-media-body-supporting-bottom-text card-media-link u-float-right">LinkedIn Link
					  </a>
					   
				   </Button>
			   </div>
			   		   </div>
	   </article>

            </Card>
        )

    }
	render() {
		const { getFieldDecorator } = this.props.form;
		return (

            <div>
			
			<Card className="my-4" style={{ width:700, }}>
				<Form layout="inline" onSubmit={this.handleSubmit}>
					<Row>
						<Col span={8}>
							<h4>Add New Mentors</h4>
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
                                className= "mentorName"
						        label="Mentor Name"
						        colon={true}
						        wrapperCol={{span: 24}}
						    >
						    {getFieldDecorator('mentorname', {
					         	rules: [{ required: true, message: 'Please input Mentor name!' }],
						    })(
						        <Input placeholder="Mentor Name" />
						    )}
                            </FormItem>
                    
						</Col>

                        
						<Col span={11} >
                            <FormItem
                                className= "MentorID"
						        label="Mentor ID"
						        colon={true}
						        wrapperCol={{span: 24}}
						    >
						    {getFieldDecorator('mentorID', {
                                rules: [{ required: true, message: 'Please input Mentor ID!' }],
                           })(
						        <Input placeholder="Mentor ID" />
						    )}
						    </FormItem>
						</Col>
                        </Row>

                        <Row>
						<Col span={11}>
                        <FormItem
                        className= "mentordescription"
                        label="Mentor Description"
                        colon={true}
                        wrapperCol={{span: 24}}
                    >
                    {getFieldDecorator('mentordescription',{
                    rules: [{ required: true, message: 'Please input Mentor Description!' }],
                   })
                (
<TextArea placeholder="MentorDescription" autosize={{ minRows: 1, maxRows: 10 }} style={{width: '100%'}}/>
)}
                    </FormItem>
                        </Col>

                        <Col span={11}>
							<FormItem
						        label= "Select Mentor Core Technology"
						        colon={true}
						        wrapperCol={{span: 24}}
						    >
						    {getFieldDecorator('selectmentorcoreTechnology', {
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
                        </Row>


                        <Row>
						<Col span={11}>
							<FormItem
						        label="Institute Name"
						        colon={true}
						        wrapperCol={{span: 24}}
						    >
						    {getFieldDecorator('institutename', {
                                rules: [{ required: true, message: 'Please Input Institute Name!' }],
                           })(
						        <Input placeholder="Institute Name" />
						    )}
						    </FormItem>
                        </Col>
                        
					
                        <Col span={11}>
							<FormItem
						        label="Mentor Contact No."
						        colon={true}
						        wrapperCol={{span: 24}}
						    >
						    {getFieldDecorator('number', {
                                rules: [{ required: true, message: 'Please Input Contact No.!' }],
                           })(
						        <Input placeholder="Contact Number" />
						    )}
						    </FormItem>
                        </Col>
                        
						</Row>
						<Row>
						<Col span={11}>
							<FormItem
						        label="Mentor Github ID"
						        colon={true}
						        wrapperCol={{span: 24}}
						    >
						    {getFieldDecorator('link', {
                                rules: [{ required: true, message: 'Please Input Github ID!' }],
                           })(
						        <Input placeholder="gi@github.com" />
						    )}
						    </FormItem>
                        </Col>
						
					
						<Col span={11}>
							<FormItem
						        label="LinkedIn ID"
						        colon={true}
						        wrapperCol={{span: 24}}
						    >
						    {getFieldDecorator('link1', {
                                rules: [{ required: true, message: 'Please Input LinkedIn ID!' }],
                           })(
						        <Input placeholder="LinkedIn@.com" />
						    )}
						    </FormItem>
                        </Col>
                        

                    </Row>    
                    </Form>
					</Card>
					
					{this.renderCard(this.props.form.getFieldsValue())}
				
					
</div>


        );
    }
}
const MentorNewForm = Form.create()(WorkoutAdd);
export default MentorNewForm;