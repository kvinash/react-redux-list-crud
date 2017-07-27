import React, { Component } from "react";
import DataService from "../middlewares/dataService";
import Constant from "../constant";

import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Grid, Row, Col, Button, Modal } from "react-bootstrap";
import "../style/header.css";
import "../style/react-bootstrap-table.css";
import "bootstrap/dist/css/bootstrap.css"; // Put any other imports below so that CSS from your
import "bootstrap/dist/css/bootstrap-theme.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//import products from './products'
/**redux functionalities */
import { connect } from "react-redux";
import { allProduct, deleteProduct } from "../actions";
import * as TgridReducer from "../reducers";

class Tgrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Product Data",
      products: [],
      deleteId: "",
      isOpen: false
    };
    this.priceFormatter = this.priceFormatter.bind(this);
    console.log('c0',this.props)
  }

  componentDidMount() {
    //data that require after component load will goes here
       const { dispatch } = this.props;
    console.log('componentDidMount',this.props)
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.hasOwnProperty("delete_bool")){
      if (nextProps.delete_bool) this.props.get_allpro();
    }
 }

  componentWillUpdate(){
    console.log('componentWillUpdate',this.props)
    if(this.props.delete_bool){
      this.props.get_allpro()
    }
  }

  shouldComponentUpdate(){
     const { dispatch } = this.props;
    console.log('shouldComponentUpdate',this.props)
    return true
  }
  componentWillMount() {
    const { dispatch } = this.props;
    this.props.get_allpro();
    console.log('componentWillMount',this.props)
    // this.getProducts();
  }

  priceFormatter(cell, row) {
    return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
  }

  dateFormatter(date) {
    return new Date(date.toString()).toLocaleTimeString();
  }

  deleteConfirm(event) {
    this.setState({
      deleteId: event.target.getAttribute("data-id"),
      isOpen: true
    });
  }

  closeConfirmBox() {
    this.setState({
      deleteId: "",
      isOpen: false
    });
  }

  cellButton(cell, row, enumObject, rowIndex) {
    console.log("cell", row._id);
    return (
      <div>
        <Link className="formLink" to={"/edit/" + row._id}>
          Edit
        </Link>
        <a
          className="formLink"
          href="javascript:;"
          data-id={row._id}
          onClick={this.deleteConfirm.bind(this)}
        >
          Delete
        </a>
      </div>
    );
  }

  render() {
    const options = {
      sizePerPageList: [
        {
          text: "5",
          value: 5
        },
        {
          text: "10",
          value: 10
        },
        {
          text: "15",
          value: 15
        },
        {
          text: "20",
          value: 20
        },
        {
          text: "All",
          value: this.state.products.length
        }
      ],
      sizePerPage: 5
    };
console.log('this.props.products',this.props)
    return (
      <div>
        <label>
          {" "}{this.state.title}{" "}
        </label>
        <BootstrapTable
          data={this.props.products}
          pagination={true}
          options={options}
          striped={true}
          hover={true}
        >
          <TableHeaderColumn
            dataField="_id"
            isKey={true}
            dataAlign="center"
            dataSort={true}
          >
            Product ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="name" dataSort={true}>
            Product Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="desc" dataSort={true}>
            Product Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="price" dataFormat={this.priceFormatter}>
            Product Price
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="created_date"
            dataFormat={this.dateFormatter}
          >
            Product Price
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="button"
            dataFormat={this.cellButton.bind(this)}
          />
        </BootstrapTable>
        {this.state.isOpen
          ? <ConfirmModel
              open={this.state.isOpen}
              id={this.state.deleteId}
              refresh={this.props.get_allpro.bind(this)}
              close={this.closeConfirmBox.bind(this)}
              delete={this.props.delete_pro.bind(this,this.state.deleteId)}
            />
          : ""}
      </div>
    );
  }
}

class TableRow extends Component {
  render() {
    return (
      <tr>
        <td>
          {this.props.data.id}
        </td>
        <td>
          {this.props.data.name}
        </td>
        <td>
          {this.props.data.age}
        </td>
      </tr>
    );
  }
}

class ConfirmModel extends Component {
  constructor(props) {
    super(props);
    console.log("====>", props);
  }

  closeMe() {
    this.props.close();
  }
  refresh_list(){
    this.props.refresh()
  }

  deleteRecord() {
    this.props.delete();
   this.props.close();
   
  }

  render() {
    return (
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Delete Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure want to delete product?</Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeMe.bind(this)}>No</Button>
            <Button bsStyle="primary" onClick={this.deleteRecord.bind(this)}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  }
}
const mapStateToProps = state => {
    
    const products = TgridReducer.getEntityByKey(state, "products");
    const delete_bool  = TgridReducer.getEntityByKey(state, "delete_bool");
    
    return {
     products,
     delete_bool
    }
    
};

const mapDispatchToProps = dispatch => {
  return {
    get_allpro:()=>dispatch(allProduct()),
    delete_pro:(id)=>dispatch(deleteProduct(id))
  };
};
Tgrid = connect(mapStateToProps, mapDispatchToProps)(Tgrid);
export default Tgrid;
