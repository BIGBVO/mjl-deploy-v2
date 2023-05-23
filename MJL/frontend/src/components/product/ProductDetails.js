import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Spinner} from 'react-bootstrap';
import Select from 'react-select';
import {getSpecificProductX} from '../../actions/productAction'
import {Redirect} from 'react-router-dom';

import '../styles/layout.css'
import '../styles/product.css'

export class ProductDetails extends Component {

  constructor(props){
      super(props);
      // set default state
      this.state = {
          view : false,
          edit : false
      }
      this.changeView = this.changeView.bind(this); 
      this.editItem = this.editItem.bind(this);
  } 

    static propTypes = {
        // declare the necessary variables and functions
        product: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        isLoading: PropTypes.bool.isRequired,
        getSpecificProductX: PropTypes.func.isRequired,
    };
  
    editItem(){
        this.setState({
            edit:true
        })
    }
    changeView(){
        if (this.state.view){
            this.setState({
                view:false
            })
        } else {
            this.setState({
                view:true
            })          
        }
    }
  
  formatNumber(total){
    return ("Rp. " + total.toLocaleString());
    }

  render() {
    const isLoading = this.props.isLoading;
    const groups = this.props.user.groups;
    const product = this.props.product;
    const view = this.state.view;
    const edit = this.state.edit;

    if (isLoading){
      const style = { position: "fixed", top: "50%", left: "50%"};
      return (
          <Spinner animation="border" role="status" variant="primary" style={style}>
              <span className="visually-hidden"></span>
          </Spinner>
      )
    } else { // if finished loading
      if (edit){
        return <Redirect to= "/edit-product" />
      } else {
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <span className="pageText">
                        <strong> Product Details</strong>
                    </span>
                    {groups.includes("admin") ? (
                    <div>
                        <div className="navbar-collapse navigationBar" id="navbarTogglerDemo01">
                            <button
                                    onClick={() => this.changeView()}
                                    className="viewProductButton"
                                    >
                                    View
                            </button>
                        </div>
                    </div>
                    ):(
                    <div>
    
                    </div>
                    )}
                </nav>
    
                <div className="headerLine"> </div>
    
                <div className="prodFormDiv card card-body container">
                    <div className="imageBorder">
                        <img
                        style={{'width':'250px', 'height':'auto'}}
                        src = {product.gambar}
                        alt="Image"
                        >
                        </img>
                    </div>
                    <div className="productDetailsForm">
                        <div>
                            <label>Kode: </label>
                        </div>
                        
                        <div>
                            <label>{product.kode} </label>
                        </div>
                    </div>
                    <div className="productDetailsForm">
                        <div>
                            <label>Nama: </label>
                        </div>
                        
                        <div>
                            <label>{product.nama} </label>
                        </div>
                    </div>
                    <div className="productDetailsForm">
                        <div>
                            <label>Kategori: </label>
                        </div>
                        
                        <div>
                            <label>{product.kategori} </label>
                        </div>
                    </div>
                    <div className="productDetailsForm">
                        <div>
                            <label>Quantity: </label>
                        </div>
                        
                        <div>
                            <label>{product.quantity + " Pcs"} </label>
                        </div>
                    </div>
                    {view ? (
                    <div>
                        <div className="productDetailsForm">
                            <div>
                                <label>Supplier: </label>
                            </div>
                            
                            <div>
                                <label>{product.supplier} </label>
                            </div>
                        </div>
                        <div className="productDetailsForm">
                            <div>
                                <label>Modal: </label>
                            </div>
                            
                            <div>
                                <label>{this.formatNumber(product.modal)} </label>
                            </div>
                        </div>
                        <div className="productDetailsForm">
                            <div>
                                <label>Pengangkutan: </label>
                            </div>
                            
                            <div>
                                <label>{this.formatNumber(product.pengangkutan)} </label>
                            </div>
                        </div>
                        <div className="productDetailsForm">
                            <div>
                                <label>Harga S: </label>
                            </div>
                            
                            <div>
                                <label>{this.formatNumber(product.harga_S)} </label>
                            </div>
                        </div>
                    </div>
                    ) : (
                        <div>
                        </div>
                    )}
                    <div className="productDetailsForm">
                        <div>
                            <label>Harga Grosir: </label>
                        </div>
                        
                        <div>
                            <label>{this.formatNumber(product.harga_A)} </label>
                        </div>
                    </div>
                    <div className="productDetailsForm">
                        <div>
                            <label>Harga Toko: </label>
                        </div>
                        
                        <div>
                            <label>{this.formatNumber(product.harga_B)} </label>
                        </div>
                    </div>
    
                    {groups.includes("manager") ? (
                    <div>
                        <div className="center">
                          <button 
                            className="editProductButton"
                            onClick={() => this.editItem()}>
                              Edit
                          </button>
                        </div>
                    </div>
                    ):(
                    <div>
    
                    </div>
                    )}
                    
    
                </div>
            </div>
          );
      }
    }
  }
}

const mapStateToProps = (state) => ({
    product: state.product.product,
    user: state.auth.user,
    isLoading: state.product.isLoading,
});

export default connect(mapStateToProps, { getSpecificProductX })(ProductDetails);
