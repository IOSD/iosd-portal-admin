import React, {Component} from 'react';
import {Card, Row, Col, Form, Input, Button, Select, Upload, Icon, Divider} from 'antd' ;

const FormItem = Form.Item;

class AddVideo extends Component {
   
    handleVideoSubmit = (e) => {
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	    	if (!err) {
                this.props.submitVideo(values);
            }
	    });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>

                <h3>Add Videos</h3>

                <Row>
                    <Col>
                        <Form onSubmit={this.handleVideoSubmit}>
                            <Row>
                                <Col span={12}>
                                    <FormItem
                                        label="Video Title"
                                        colon={true}
                                        wrapperCol={{span: 24}}
                                    >
                                    {getFieldDecorator('title', {
                                        rules: [{ required: true, message: 'Please Input video title!' }],
                                    })(
                                        <Input placeholder="title" />
                                    )}
                                    </FormItem>
                                </Col>
                                
                                <Col span={12}>
                                    <FormItem
                                        label="Video Url"
                                        colon={true}
                                        wrapperCol={{span: 24}}
                                    >
                                    {getFieldDecorator('url', {
                                        rules: [{ required: true, message: 'Please Input video url' }],
                                    })(
                                        <Input placeholder="video url" />
                                    )}
                                    </FormItem>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={12}>
                                    <FormItem
                                        label="Video Section"
                                        colon={true}
                                        wrapperCol={{span: 24}}
                                    >
                                    {getFieldDecorator('section', {
                                        rules: [{ required: true, message: 'Please Input video section!' }],
                                    })(
                                        <Input placeholder="section" />
                                    )}
                                    </FormItem>
                                </Col>
                                
                                <Col span={12}>
                                    <FormItem
                                        label="duration"
                                        colon={true}
                                        wrapperCol={{span: 24}}
                                    >
                                    {getFieldDecorator('duration', {
                                        rules: [{ required: true, message: 'Please Input duration' }],
                                    })(
                                        <Input placeholder="video duration" type="number"/>
                                    )}
                                    </FormItem>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={8} offset={16}>
                                    <FormItem>
                                        <Button
                                            style={{marginRight: '1.2rem'}}
                                            type="primary"
                                            htmlType="submit"
                                        >
                                            Add Video
                                        </Button>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </Col>			
                </Row>
                <Divider/>
            </div>
        )
    };
};

const AddVideoForm = Form.create()(AddVideo);
export default AddVideoForm;