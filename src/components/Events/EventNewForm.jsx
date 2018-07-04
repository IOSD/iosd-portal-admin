import {DatePicker} from 'antd';
import moment from 'moment';
import React, {Component} from 'react';
import {Card, Row, Col, Form, Input, Button,Upload,Icon} from 'antd' ;

const FormItem = Form.Item;

const dateFormat = 'YYYY/MM/DD';
const {TextArea} = Input;

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
            <div className="card-media">
                <div className="card-media-object-container">
                    <div className="card-media-object"
                         style={{
     backgroundImage: `url(https://static.wixstatic.com/media/7f1245_09e84c14cced44979b63767073289ccc~mv2.jpg)`
                         }}/>

                </div>
                <div className="card-media-body">
                    <div className="card-media-body-top">
                        <span className="subtle">{values.selecteventdate}</span>
                        <div className="card-media-body-top-icons u-float-right">
                            <svg fill="#888888" height="16" viewBox="0 0 24 24" width="16"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0h24v24H0z" fill="none"/>
                                <path
                                    d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                            </svg>
                            <svg fill="#888888" height="16" viewBox="0 0 24 24" width="16"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                                <path d="M0 0h24v24H0z" fill="none"/>
                            </svg>
                        </div>
                    </div>
                    <span className="card-media-body-heading">{values.EventTitle}</span>
                    <div className="card-media-body-supporting-bottom">
                        <span
                            className="card-media-body-supporting-bottom-text subtle">{values.CollegeName}</span>
                    </div>
                    <div
                        className="card-media-body-supporting-bottom card-media-body-supporting-bottom-reveal">
                        <a href={values.link} target='_blank'
                           className="card-media-body-supporting-bottom-text card-media-link u-float-right">KNOW
                            MORE</a>
                    </div>
                </div>
            </div>
        )

    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (

            <div>

			<Card className="my-4" style={{ width:700, }}>
			
				<Form layout="vertical" onSubmit={this.handleSubmit}>
					<Row>
						<Col span={8}>
							<h4>Add New Events</h4>
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
                        <FormItem
                                className= "eventtitle"
						        label="Event Title"
						        colon={true}
						        wrapperCol={{span: 24}}
						    >
						    {getFieldDecorator('EventTitle', {
					         	rules: [{ required: true, message: 'Please input Event Title!' }],
						    })(
						        <Input placeholder="Event Title" />
						    )}
                            </FormItem>
                    
					</Row>

                        <Row>
						
                            <FormItem
                                className= "college"
						        label="College Name"
						        colon={true}
						        wrapperCol={{span: 24}}
						    >
						    {getFieldDecorator('CollegeName', {
                                rules: [{ required: true, message: 'Please input College Name!' }],
                           })(
						        <Input placeholder="College Name" />
						    )}
						    </FormItem>
					
                        </Row>

                        <Row>
						
                            <FormItem
                                className= "eventdescription"
						        label="Event Description"
						        colon={true}
						        wrapperCol={{span: 23}}
						    >
                            {getFieldDecorator('EventDescription',{
                            rules: [{ required: true, message: 'Please input Event Description!' }],
                           })
                        (
      <TextArea placeholder="Event Description" autosize={{ minRows: 1, maxRows: 10 }} style={{width: '100%'}}/>
    )}
						    </FormItem>
                    
						</Row>
                        <Row>
						<Col>
							<FormItem
						        label="Event Link"
						        colon={true}
						        wrapperCol={{span: 24}}
						    >
						    {getFieldDecorator('link', {
                                rules: [{ required: true, message: 'Please Input Event Link!' }],
                           })(
						        <Input placeholder="link" />
						    )}
						    </FormItem>
                        </Col>
                            </Row>
                        
						<Row>
						
						<FormItem
						   label= "Select Event Date"
						   colon={true}
						   wrapperCol={{span: 24}}
					   >
					   {getFieldDecorator('selecteventdate', {
						   initialValue: "Select",
						   rules:[{required: true, message: "Please select a Event Date"}]
						})(
						<div>
							<DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />
						</div>
					   )}
					   </FormItem>
				   
                        </Row>


                        
						
						<Row className='text-center'>
						<Col>
						<Upload>
    					<Button className='btn btn-sm btn-outline-primary'>
						<Icon type="upload" />
							 Upload Event Poster
    					</Button>
						</Upload>
						</Col>
						</Row>
                                        
                    </Form>


                </Card>

                <Row>
                    <Col span={12}>
                        {this.renderCard(this.props.form.getFieldsValue())}
                    </Col>
                </Row>


            </div>


        );
    }
}

const EventNewForm = Form.create()(WorkoutAdd);
export default EventNewForm;
