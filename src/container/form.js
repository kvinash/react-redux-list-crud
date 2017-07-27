import React from 'react';
import DataService from '../middlewares/dataService';
import Constant from '../constant';

import { Form, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'bootstrap/dist/css/bootstrap.css';// Put any other imports below so that CSS from your
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'react-notifications/lib/notifications.css';

/**Redux Functionality*/
import { addProduct, editProduct} from '../actions';
import { connect } from 'react-redux';

let productNameSuccessFlag = false;
let descriptionSuccessFlag = false;
const errorMsg = {
	color: 'red'
};

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class NameForm extends React.Component {
	constructor(props) {
		//console.log('props',props.match.params.id)
		super(props);
		this.state = {
			productName: '', 
			price: '10', 
			desc: '',
			productNameError: null,
			productNameRequireError: false,
			productNameMinMaxError: false,
			productNameValidError: false,
			descriptionError: null,
			descriptionRequireError: false,
			descriptionMinMaxError: false,
			isFormSubmit: false
		};
	}

	componentDidMount() {
		if (this.props.match.params && this.props.match.params.id) {
			const _this = this;
			console.log("compo:",this.props.products)
			let product = this.props.products.find(product=>{return product._id ===  this.props.match.params.id })
			console.log(product);
			         _this.setState({
	                	id: product._id,
	                    productName: product.name, 
	                    price: product.price, 
	                    desc: product.desc
	                })
		}
	}

	resetForm() {
		this.setState({
			productName: '', 
			price: '10', 
			desc: '',
			productNameError: null,
			productNameRequireError: false,
			productNameMinMaxError: false,
			productNameValidError: false,
			descriptionError: null,
			descriptionRequireError: false,
			descriptionMinMaxError: false
		});
	}

	handleChange(event) {
		const val = event.target.value;
		const name = event.target.name;
		this.setState({ 
			[name]: val 
		});

	}

	/**
	 * Form product description validation
	 */
	validateDescription(event) {
		descriptionSuccessFlag = false;
		this.setState({
			descriptionRequireError: false,
			descriptionMinMaxError: false
		});

		if (this.state.desc.replace(/^\s+|\s+$/g, "") == "") {
			this.setState({ descriptionRequireError: true, descriptionError: 'error' });
		} else if (this.state.desc.replace(/^\s+|\s+$/g, "").length < Constant.descriptionMin || this.state.desc.replace(/^\s+|\s+$/g, "").length > Constant.descriptionMax) {
			this.setState({ descriptionMinMaxError: true, descriptionError: 'error' });
		} else {
			this.setState({ descriptionError: 'success' });
			descriptionSuccessFlag = true;
		}
	}

	/**
	 * Form product name validation
	 */
	validateName(event) {
		productNameSuccessFlag = false;
		this.setState({
			productNameRequireError: false,
			productNameMinMaxError: false,
			productNameValidError: false
		});

		if (this.state.productName.replace(/^\s+|\s+$/g, "") == "") {
			this.setState({ productNameRequireError: true, productNameError: 'error' });
		} else if (this.state.productName.replace(/^\s+|\s+$/g, "").length < Constant.productNameMin || this.state.productName.replace(/^\s+|\s+$/g, "").length > Constant.productNameMax) {
			this.setState({ productNameMinMaxError: true, productNameError: 'error' });
		} else if (!/^[a-z\d\-_\s]+$/i.test(this.state.productName)) {
			this.setState({ productNameValidError: true, productNameError: 'error' });
		} else {
			this.setState({ productNameError: 'success' }, function() {
				console.log('=>',this.state.productNameError)
			});
			productNameSuccessFlag = true;
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		const self = this;
		let isEdit = false;
		self.setState({ isFormSubmit: true })

		//validate form before submit
		self.validateName();
		self.validateDescription();
		//alert('Name submitted : '+ this.state.productName + ' Description ' + this.state.desc + ' and Drop Down is ' + this.state.price);
		let url = Constant.saveProductUrl;
		let data = {
			'name': self.state.productName,
			'desc': self.state.desc,
			'price': self.state.price
		};

		if (self.props.match.params && self.props.match.params.id) {
			data.id = self.props.match.params.id
			//url = Constant.updateProductUrl;
			this.props.edit_pro_details(data);
			isEdit = true;
		}

		if (self.state.productNameError == 'success' && self.state.descriptionError == 'success') {
			this.props.add_pro_details(data);
        } else {
        	self.setState({ isFormSubmit: false });
        }
	}

	render() {
		return (
			<div>
				<Form horizontal onSubmit={this.handleSubmit.bind(this)}>

				    <FormGroup controlId="formValidationWarning1" validationState={this.state.productNameError}>
				      <ControlLabel>Product Name</ControlLabel>
				      <FormControl type="text" placeholder="Enter Name" 
				      	name="productName" 
				      	value={this.state.productName} 
				      	onChange={this.handleChange.bind(this)}
				      	onBlur={this.validateName.bind(this)} />
				      <div style={errorMsg}>
				      	{this.state.productNameRequireError ? Constant.productNameRequireMsg : ''}
				      	{this.state.productNameMinMaxError ? Constant.productNameMinMaxMsg + ' ' + Constant.productNameMin +' to '+ Constant.productNameMax : ''}
				      	{this.state.productNameValidError ? Constant.productNameValidMsg : ''}
				      </div>
				    </FormGroup>

				    <FormGroup controlId="formControlsTextarea" validationState={this.state.descriptionError}>
				      <ControlLabel>Product Description</ControlLabel>
				      <FormControl componentClass="textarea" placeholder="Description here.." 
				      	name="desc" 
				      	value={this.state.desc} 
				      	onChange={this.handleChange.bind(this)}
				      	onBlur={this.validateDescription.bind(this)} />
				      <div style={errorMsg}>
				      	{this.state.descriptionRequireError ? Constant.descriptionRequireMsg : ''}
				      	{this.state.descriptionMinMaxError ? Constant.descriptionMinMaxMsg + ' ' + Constant.descriptionMin +' to '+ Constant.descriptionMax : ''}
				      </div>
				    </FormGroup>

				    <FormGroup controlId="formControlsSelect">
				      <ControlLabel>Product Price</ControlLabel>
				      <FormControl componentClass="select" placeholder="Select Price" name="price" value={this.state.price} onChange={this.handleChange.bind(this)}>
				        <option value="10">$10</option>
			            <option value="20">$20</option>
			            <option value="30">$30</option>
			            <option value="40">$40</option>
			            <option value="50">$50</option>
			            <option value="60">$60</option>
			            <option value="70">$70</option>
			            <option value="80">$80</option>
			            <option value="90">$90</option>
			            <option value="100">$100</option>
				      </FormControl>
				    </FormGroup>
					
					<FormGroup>
						<Button disabled={this.state.isFormSubmit} type="submit">
					      {this.props.match.params.id ? 'Edit' : 'Add'}
					    </Button>
				    </FormGroup>
				</Form>
			<NotificationContainer/>
			</div>
		);
	}
}
const mapStateToProps=(state)=>{
	console.log("productshe product", state)
	var products = state ? state.data :[]
    return {products}
}
const mapDispatchToProps = dispatch => {
  return {
    add_pro_details: (product) => {
      dispatch(addProduct(product));
	},
	edit_pro_details: (product) => {
      dispatch(editProduct(product));
	},
  };
};
NameForm = connect( mapStateToProps, mapDispatchToProps)(NameForm);
export default NameForm;