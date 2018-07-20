import React, { Component } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import { Card, Row, Col, Form, Input, Button, Upload, Icon, Divider, message } from 'antd' ;

const FormItem = Form.Item;
const {TextArea} = Input;

const props = {
	name: 'file',
	action: 'http://localhost:5000/api/v1/uploads'
};

class EventForm extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
        	college: props.event ? props.event.college : '',
        	image: props.event ? props.event.image : '',
            description: props.event ? props.event.description : '',
            date: props.event ? moment(props.event.date) : moment(),
            title: props.event ? props.event.title : '',
			link: props.event ? props.event.link : ''
        };
    };


    // handleBeforeUpload = (file, fileList) => {
    // 	if (fileList.length >= 1) {
    // 		return false;
    // 	} else {
    // 		return true;
    // 	}
    // }

    handleUpload = (info) => {
	    if (info.file.status !== 'uploading') {
	      console.log(info.file, info.fileList);
	    }
	    if (info.file.status === 'done') {
	      message.success(`${info.file.name} file uploaded successfully`);
	      this.setState({image: info.file.response.url});

	    } else if (info.file.status === 'error') {
	      message.error(`${info.file.name} file upload failed.`);
	    }
	};

	componentDidMount() {
        const { setFieldsValue } = this.props.form;
    	setFieldsValue({
			title: this.state.title,
			description: this.state.description,
            college: this.state.college,
            date: this.state.date,
            link: this.state.link 
		});	
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (!err) {
                console.log('Received values of form: ', fieldsValue);
                const values = {
                    ...fieldsValue,
                    'date': new Date(fieldsValue['date'].format('DD-MM-YYYY')),
                    'image': this.state.image
                }
                console.log(values);
                this.props.onSubmit(values);
				this.props.form.resetFields();	
            };
        });
    }

    renderCard(values, image) {
        const formEmpty = Object.values(values).every(x => (x === '' || x === undefined));
        return (
            <Card>
				<Row>
					<Col>
						<h4>Preview</h4>
					</Col>
                </Row>
                
                <Divider />
                {
                    formEmpty ? <h3>Start filling the form to see the preview</h3>
                    :<div className="card-media">
                        <div className="card-media-object-container">
                            <div className="card-media-object"
                                style={{
                                    backgroundImage: `url(${image})`
                                }}/>
                        </div>
                        <div className="card-media-body">
                            <div className="card-media-body-top">
                                <span className="subtle">{values.date.format('DD-MM-YYYY')}</span>
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
                            <span className="card-media-body-heading">{values.title}</span>
                            <div className="card-media-body-supporting-bottom">
                                <span className="card-media-body-supporting-bottom-text subtle">
                                    {values.college}
                                </span>
                            </div>
                            <div
                                className="card-media-body-supporting-bottom card-media-body-supporting-bottom-reveal">
                                <a 
                                    href={values.link} 
                                    target='_blank'
                                    className="card-media-body-supporting-bottom-text card-media-link u-float-right"
                                >
                                    KNOW MORE
                                </a>
                            </div>
                        </div>
                    </div>
                }
            </Card>

            
        )

    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Row className='my-4'>
                    <Col>
                        <Card>
                            <Form layout="inline" onSubmit={this.handleSubmit}>
                                <Row>
                                    <Col>
                                        {this.props.events ? <h4>Edit Event</h4> : <h4>Add New Event</h4>}
                                    </Col>
                                </Row>

                                <Divider />

                                <Row>
                                    <Col span={12}>
                                        <FormItem
                                                className= "eventtitle"
                                                label="Event Title"
                                                colon={true}
                                                wrapperCol={{span: 24}}
                                            >
                                            {getFieldDecorator('title', {
                                                rules: [{ required: true, message: 'Please input Event Title!' }],
                                            })(
                                                <Input placeholder="Event Title" />
                                            )}
                                        </FormItem>
                                    </Col>
                                    
                                    <Col span={12}>
                                        <FormItem
                                            className= "college"
                                            label="College Name"
                                            colon={true}
                                            wrapperCol={{span: 24}}
                                        >
                                        {getFieldDecorator('college', {
                                            rules: [{ required: true, message: 'Please input College Name!' }],
                                        })(
                                            <Input placeholder="College Name" />
                                        )}
                                        </FormItem>       
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={12}>
                                        <FormItem
                                            label= "Select Event Date"
                                            colon={true}
                                            wrapperCol={{span: 24}}
                                        >
                                        {getFieldDecorator('date', {
                                            rules:[{type: 'object', required: true, message: "Please select a Event Date"}]
                                            })(
                                                <DatePicker/>
                                        )}
                                        </FormItem>
                                    </Col>
                                                                            
                                    <Col span={12}>
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
                                    <Col span={12}>
                                        <FormItem
                                            className= "eventdescription"
                                            label="Event Description"
                                            colon={true}
                                            wrapperCol={{span: 23}}
                                        >
                                        {getFieldDecorator('description',{
                                            rules: [{ required: true, message: 'Please input Event Description!' }],
                                        })(
                                            <TextArea 
                                                placeholder="Event Description" 
                                                autosize={{ minRows: 2, maxRows: 10 }} 
                                            />
                                        )}
                                        </FormItem>
                                    </Col>
                                </Row>
                                    
                                <Divider />

                                <Row>
                                    <Col span={12}>
                                        <Upload {...props} onChange={this.handleUpload}>
                                            <Button className='btn btn-sm btn-outline-primary'>
                                                <Icon type="upload" />
                                                    Upload Event Poster
                                            </Button>
                                        </Upload>
                                    </Col>
                                    <Col span={12}>
                                        <div className="pull-right">
                                            <FormItem>
                                                <Button
                                                    className="mr-2"
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
                        {this.renderCard(this.props.form.getFieldsValue(), this.state.image)}
                    </Col>
                </Row>
            </div>
        );
    }
}

const EventNewForm = Form.create()(EventForm);
export default EventNewForm;
