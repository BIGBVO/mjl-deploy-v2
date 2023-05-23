import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addSupplier } from '../../actions/supplierAction';
import {Spinner} from 'react-bootstrap';
import {Link, Redirect} from 'react-router-dom';

import '../styles/layout.css'
import '../styles/supplier.css'

export class AddSupplier extends Component {

  constructor(props){
      super(props);
      // set default state
      this.state = {
        supplier_name : '',
        back: false
      }
      this.back = this.back.bind(this);
  } 

  static propTypes = {
    // declare the necessary variables and functions
    user: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    addSupplier: PropTypes.func.isRequired,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault(); // prevent the case where no input has been made
    const {supplier_name} = this.state;
    const nama_supplier = supplier_name
    const supplier = {nama_supplier};
    this.props.addSupplier(supplier, this.props.user.id); // call add product function

    this.setState({
      supplier_name : '',
    })
  };

  back(){
    this.setState({
      back:true
    })
  }
  render() {
    const { supplier_name, back } = this.state;
    const isLoading = this.props.isLoading;
    
    if (!isLoading){ // if finished loading
      if (back){
        return <Redirect to= "/add-product" />
      } else {
        return (
          <div>
                  <nav className="navbar navbar-expand-sm navbar-light bg-light">
                  <span className="pageText">
                      <strong> Add Supplier </strong>
                  </span>
                  </nav>
              <div className="headerLine"> </div>
              <div className="container" style={{'width': '550px', 'marginTop' : '20px'}}>
                  <div style = {{textAlign:"left"}}>
                      <button className="backButton"
                          onClick={() => this.back()}>
                          Back
                      </button>
                  </div>
                </div>


              <div className="supplierFormDiv card card-body container" style={{'marginTop':'10px'}}>
                  <form onSubmit={this.onSubmit}>
                  <div className="supplierForm">
                      <label>Supplier Name: </label>
                      <input
                        className="supplierFormInput"
                        type="text"
                        name="supplier_name"
                        onChange={this.onChange}
                        value={supplier_name}
                      />
                  </div>

                  <div className="center">
                      <button type="submit" 
                              className="addSupplierButton mt-3">
                          Add Supplier
                      </button>
                  </div>
                  </form>
              </div>

          </div>
        )
      }
    } else {
        const style = { position: "fixed", top: "50%", left: "50%"};
        return (
            <Spinner animation="border" role="status" variant="primary" style={style}>
                <span className="visually-hidden"></span>
            </Spinner>
        )
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isLoading: state.supplier.isLoading,
});

export default connect(mapStateToProps, { addSupplier })(AddSupplier);
