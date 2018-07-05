import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchLibraryBooks, addNewLibraryBook } from '../../actions/libraryActions';
import {Card, Row, Col, Form, Input, Button, Upload, Icon, Divider } from 'antd' ;
const FormItem = Form.Item;
const { TextArea } = Input;

class BookForm extends Component {
	
	handleSubmit = (e) => {
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	    	if (!err) {
	        	console.log('Received values of form: ', values);
	        	if (this.props.library.books.length > 0) {
	        		this.props.dispatch(addNewLibraryBook(values)).then(() => {
	        			this.props.form.resetFields();
	        		})
	        	} else {
	        		this.props.dispatch(fetchLibraryBooks()).then(() => {
	        			this.props.dispatch(addNewLibraryBook(values)).then(() => {
	        				this.props.form.resetFields();
	        			})
	        		}).catch(err => console.log("Could not connect to database"));
	        	}
	      	};
	    });
	};

	renderCard(values) {
		const isEmpty = Object.values(values).every(x => (x === null || x === undefined));
        return (
           	<Card>
           		<Row>
					<Col>
						<h4>Preview</h4>
					</Col>
				</Row>
           		<Divider/>
			{isEmpty ? <h3>Start Filling the form to see the preview</h3> 
			    :<article className="item-pane">
                    <div className="item-preview">
                    {values.image && 
                        <div className="book" style={
                            {
                                background: `url('${values.image}')`,
                                '--before-bg' : `${values.colour}`

                            }} data-color={values.colour}>
                        </div>
                    }
                    </div>
                    <div className="item-details">
                        <h1>{values.name}</h1><span className="subtitle">{values.author}</span>
                        {values.description && 
                        <div className="pane__section">
                            <p>
                                {values.description}
                            </p>
                        </div>
                    }
                        <div className="pane__section clearfix">
                            <Button size='large' className='button-solid'>
                                Download
                            </Button>
                        </div>
                    </div>
                </article>
            }
        	</Card>
        );
    };
	
	
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div>
				 <Row gutter={16}>
					<Col xl={12} lg={12} md={24}>
						<Card className="my-4">
							<Form layout="inline" onSubmit={this.handleSubmit}>
								<Row>
									<Col>
										<h4>Add New Book</h4>
									</Col>
								</Row>

								<Divider/>

								<Row>
									<Col span={12}>
										<FormItem
											label="Book Name"
											colon={true}
											wrapperCol={{span: 24}}
										>
										{getFieldDecorator('name', {
											rules: [{ required: true, message: 'Please input your Book name!' }],
										})(
											<Input placeholder="Book Name" />
										)}
										</FormItem>
									</Col>
								
									<Col span={12} >
										<FormItem
											label="Author Name"
											colon={true}
											wrapperCol={{span: 24}}
										>
										{getFieldDecorator('author', {
											rules: [{ required: true, message: 'Please input Author name!' }],
										})(
											<Input placeholder="Author name" />
										)}
										</FormItem>
									</Col>
								</Row>
								
								<Row>
									<Col span={12}>
										<FormItem
											label="Book Description"
											colon={true}
											wrapperCol={{span: 24}}
										>
										{getFieldDecorator('description',{
										rules: [{ required: true, message: 'Please input book description!' }],
										})(
											<TextArea placeholder="description" autosize={{ minRows: 2, maxRows: 10 }}/>
										)}
										</FormItem>
									</Col>

									<Col span={12}>
										<FormItem
											label= "Select Publication Year"
											colon={true}
											wrapperCol={{span: 24}}
										>
										{getFieldDecorator('year', {
											rules:[{required: true, message: "Please select a Publication date"}]
										})(
											<Input placeholder='year' type='number'/>
										)}
										</FormItem>
									</Col>
								</Row>
								
								<Row>
								
									<Col span={12}>
										<FormItem
											label="Book Category"
											colon={true}
											wrapperCol={{span: 24}}
										>
										{getFieldDecorator('category', {
											rules: [{ required: true, message: 'Please Input Book Category' }],
										})(
											<Input placeholder="Category" />
										)}
										</FormItem>
									</Col>
									
									<Col span={12}>
										<FormItem
											label="Book Colour"
											colon={true}
											wrapperCol={{span: 24}}
										>
										{getFieldDecorator('colour', {
											rules: [{ required: true, message: 'Please Input Book Colour' }],
										})(
											<Input placeholder="Colour" />
										)}
										</FormItem>
									</Col>
								</Row>
								<Row>
									<Col span={12}>
										<FormItem
											label="Book Link"
											colon={true}
											wrapperCol={{span: 24}}
										>
										{getFieldDecorator('image', {
											rules: [{ required: true, message: 'Please Input Access link!' }],
										})(
											<Input placeholder="Link" />
										)}
										</FormItem>
									</Col>	
								</Row>
								
								<Divider />
								
								<Row className=''>
									<Col span={8}>
										<Upload>
											<Button className='btn btn-sm btn-outline-primary'>
												<Icon type="upload" />
													Upload Book
											</Button>
										</Upload>
									</Col>
									<Col span={16}>
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
					<Col xl={12} lg={12} md={24}>
						<div className="my-4">
							{this.renderCard(this.props.form.getFieldsValue())}
						</div>
					</Col>		
				</Row>
			</div>
        );
    }
};

const BookNewForm = Form.create()(BookForm);

const mapStateToProps = ({library}) => {
	return {
		library
	}
}

export default connect(mapStateToProps)(BookNewForm);