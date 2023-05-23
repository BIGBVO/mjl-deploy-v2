import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addProductCategory } from '../../actions/productAction';
import {Spinner} from 'react-bootstrap';
import {Link, Redirect} from 'react-router-dom';

import '../styles/layout.css'
import '../styles/supplier.css'

export class AddProductCategory extends Component {

  constructor(props){
      super(props);
      // set default state
      this.state = {
        nama : '',
        back : false,
      }

      this.back = this.back.bind(this);
  } 

  static propTypes = {
    // declare the necessary variables and functions
    user: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    addProductCategory: PropTypes.func.isRequired,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault(); // prevent the case where no input has been made
    const {nama} = this.state;
    const category = {nama};
    this.props.addProductCategory(category, this.props.user.id); // call add product function

    this.setState({
      nama : '',
    })
  };

  back(){
    this.setState({
      back: true
    })
  }

  render() {
    const { nama, back } = this.state;
    const isLoading = this.props.isLoading;
  
    if (!isLoading){ // if finished loading
      if (back){
        return <Redirect to= "/add-product" />
    } else {
        return (
          <div>
                  <nav className="navbar navbar-expand-sm navbar-light bg-light">
                  <span className="pageText">
                      <strong> Add Product Category </strong>
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
                      <label>Category Name: </label>
                      <input
                        className="supplierFormInput"
                        type="text"
                        name="nama"
                        onChange={this.onChange}
                        value={nama}
                      />
                  </div>

                  <div className="center">
                      <button type="submit" 
                              className="addSupplierButton mt-3">
                          Add Category
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
  isLoading: state.product.isLoading,
});

export default connect(mapStateToProps, { addProductCategory })(AddProductCategory);
