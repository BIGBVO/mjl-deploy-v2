import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Spinner} from 'react-bootstrap';
import Select from 'react-select';
import CurrencyInput from 'react-currency-input-field';
import ImageUploader from "react-images-upload";
import {Link, Redirect} from 'react-router-dom';

import 'react-datepicker/dist/react-datepicker.css'

import {getAllSuppliersName} from '../../actions/supplierAction';
import {getAllProductCategories, editProduct, deleteProduct} from '../../actions/productAction'

import '../styles/layout.css'
import '../styles/product.css'

export class EditProduct extends Component {

  constructor(props){
      super(props);
      // set default state
      this.state = {
        kode : this.props.product.kode,
        kode_baru : this.props.product.kode,
        nama : this.props.product.nama,
        kategori: this.props.product.kategori,
        quantity: this.props.product.quantity,
        supplier: this.props.product.supplier,
        modal: this.props.product.modal,
        pengangkutan: this.props.product.pengangkutan,
        harga_S: this.props.product.harga_S,
        harga_A: this.props.product.harga_A,
        harga_B: this.props.product.harga_B,
        gambar: this.props.product.gambar,
        gambar_baru: '',
        back : false,
        view: false,
        del: false,
      }

      this.changeCategory = this.changeCategory.bind(this)
      this.changeSupplier = this.changeSupplier.bind(this)
      this.changeModal = this.changeModal.bind(this)
      this.changePengangkutan = this.changePengangkutan.bind(this)
      this.changeHargaS = this.changeHargaS.bind(this)
      this.changeHargaA = this.changeHargaA.bind(this)
      this.changeHargaB = this.changeHargaB.bind(this)
      this.onDrop = this.onDrop.bind(this)
      this.formatNumber = this.formatNumber.bind(this)
      this.back = this.back.bind(this)
      this.changeView = this.changeView.bind(this)
      this.deleteProduct = this.deleteProduct.bind(this)
  } 

    static propTypes = {
        // declare the necessary variables and functions
        user: PropTypes.object.isRequired,
        suppliers: PropTypes.array.isRequired,
        categories: PropTypes.array.isRequired,
        //product: PropTypes.object.isRequired,
        productIsLoading: PropTypes.bool.isRequired,
        supplierIsLoading: PropTypes.bool.isRequired,
        getAllSuppliersName: PropTypes.func.isRequired,
        getAllProductCategories: PropTypes.func.isRequired,
        editProduct: PropTypes.func.isRequired,
        deleteProduct: PropTypes.func.isRequired,
    };
  
  componentDidMount(){
    this.props.getAllProductCategories(this.props.user.id);
    this.props.getAllSuppliersName(this.props.user.id);
  }

  back(){
      this.setState({
          back:true
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

 deleteProduct(){
    const kode = this.state.kode
    this.props.deleteProduct(kode, this.props.user.id)
    this.setState({
        del: true,
        }
    )
 }

  changeCategory(e){
    this.setState({
      kategori: e.nama
    })
  }

  formatNumber(total){
    return ("Rp. " + total.toLocaleString());
    }

  changeSupplier(e){
    this.setState({
      supplier: e.nama_supplier
    })
  }

  changeModal(e){
    this.setState({
      modal:e
    })
  }

  changePengangkutan(e){
    this.setState({
      pengangkutan:e
    })
  }

  changeHargaS(e){
    this.setState({
      harga_S:e
    })
  }

  changeHargaA(e){
    this.setState({
      harga_A:e
    })
  }

  changeHargaB(e){
    this.setState({
      harga_B:e
    })
  }

  onDrop(pictureFiles, pictureDataURLs) {
    this.setState({
      gambar_baru: pictureFiles[0]
    });
  }

  onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
  }
  
  onSubmit = (e) => {
    e.preventDefault(); // prevent the case where no input has been made
    const { kode, kode_baru, nama, kategori, quantity, supplier,
            modal, pengangkutan, harga_S, harga_A, harga_B, 
            gambar_baru, back} = this.state;

    let product = new FormData();
    product.append("kode", kode);
    product.append("kode_baru", kode_baru)
    product.append("nama", nama);
    product.append("kategori", kategori);
    product.append("quantity", quantity);
    product.append("supplier", supplier);
    product.append("modal", modal);
    product.append("pengangkutan", pengangkutan);
    product.append("harga_S", harga_S);
    product.append("harga_A", harga_A);
    product.append("harga_B", harga_B);
    product.append("gambar", gambar_baru);

    this.props.editProduct(product, this.props.user.id); // call add product function
  };

  render() {
    const productIsLoading = this.props.productIsLoading;
    const invoiceIsLoading = this.props.invoiceIsLoading;
    const groups = this.props.user.groups;
    const product = this.props.product;
    const suppliers = this.props.suppliers;
    const categories = this.props.categories;
    const {back,kode_baru,nama,kategori,quantity,
            supplier,modal, pengangkutan, harga_S,
            harga_A, harga_B, view, del} = this.state;

    if (productIsLoading || invoiceIsLoading){
      const style = { position: "fixed", top: "50%", left: "50%"};
      return (
          <Spinner animation="border" role="status" variant="primary" style={style}>
              <span className="visually-hidden"></span>
          </Spinner>
      )
    } else { // if finished loading
        if (back){
            return <Redirect to= "/product-details" />
        } else if (del){
            return <Redirect to ="/" />
        }else {
            return (
                <div>
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <span className="pageText">
                          <strong> Edit Product </strong>
                    </span>
                    {groups.includes("admin") ? (
                    <div>
                        {view == true ? (
                            <div className="navbar-collapse navigationBar" id="navbarTogglerDemo01">
                                <button
                                    onClick={() => this.changeView()}
                                    className="addProductButton"
                                    >
                                    Edit View
                                </button>
                            </div>
                        ) : (
                            <div className="navbar-collapse navigationBar" id="navbarTogglerDemo01">
                                <button
                                    onClick={() => this.changeView()}
                                    className="editProductButton"
                                    >
                                    Del View
                                </button>
                            </div>
                        )}
                    </div>
                    ):(
                    <div>
    
                    </div>
                    )}
                    </nav>
                    <div className="headerLine"> </div>
                    <div className="container half" style={{'width': '550px', 'marginTop' : '20px'}}>
                          <div style = {{textAlign:"left"}}>
                              <button 
                                  className="backButton"                                  
                                  onClick={() => this.back()}>
                                  Back
                              </button>
                          </div>
                            {view == true ? (
                                <div className="navbar-collapse navigationBar" 
                                      id="navbarTogglerDemo01"
                                      style={{'marginTop' : "10px"}}>
                                    <button
                                            onClick={() => this.deleteProduct()}
                                            className="editProductButton"
                                            >
                                            Delete
                                    </button>
                                </div>
                            ) : (
                                <div>
                                </div>
                            )}
                    </div>
        
                    <div className="productFormDiv card card-body container" style={{'marginTop' : '-15px'}}>
        
                        <div className="imageBorder">
                            <img
                            style={{'width':'250px', 'height':'auto'}}
                            src = {product.gambar}
                            alt="Image"
                            >
                            </img>
                        </div>
        
                        <form onSubmit={this.onSubmit}>

                        <div className="productForm">
                            <div>
                                <label>Kode: </label>
                            </div>
                            
                            <div>
                                <input
                                className="productField"
                                type="text"
                                name="kode_baru"
                                onChange={this.onChange}
                                value={kode_baru}
                                />
                            </div>
                        </div>

                        <div className="productForm">
                            <div>
                                <label>Nama: </label>
                            </div>
                            
                            <div>
                                <input
                                className="productField"
                                type="text"
                                name="nama"
                                onChange={this.onChange}
                                value={nama}
                                />
                            </div>
                        </div>
        
                        <div className="productForm">
                            <div >
                                <label>Kategori : </label>
                            </div>
        
                            <div>
                                <Select
                                    className="basic-single productField"
                                    classNamePrefix="select"
                                    options={categories}
                                    isClearable={true}
                                    isSearchable={true}
                                    placeholder={kategori}
                                    onChange={this.changeCategory}
                                    getOptionLabel={(x) => x.nama}
                                    getOptionValue={(x) => x.nama}
                                    required={true}
                                />
                            </div>
                        </div>
        
                        <div className="productForm">
                            <div>
                                <label>Quantity: </label>
                            </div>
                            
                            <div>
                                <input
                                className="productField"
                                type="number"
                                min = "0"
                                name="quantity"
                                onChange={this.onChange}
                                value={quantity}
                                />
                            </div>
                        </div>
        
        
                        <div className="productForm">
                            <div >
                                <label>Supplier : </label>
                            </div>
        
                            <div>
                                <Select
                                    className="basic-single productField"
                                    classNamePrefix="select"
                                    options={suppliers}
                                    isClearable={true}
                                    isSearchable={true}
                                    placeholder={supplier}
                                    onChange={this.changeSupplier}
                                    getOptionLabel={(x) => x.nama_supplier}
                                    getOptionValue={(x) => x.nama_supplier}
                                    required={true}
                                />
                            </div>
                        </div>
        
                        <div className="productForm">
                            <div>
                                <label>Modal: </label>
                            </div>
                            <div>
                                <input
                                className="productField"
                                type="number"
                                min = "0"
                                name="modal"
                                onChange={this.onChange}
                                value={modal}
                                />
                            </div>
                        </div>
        
                        <div className="productForm">
                            <div>
                                <label>Pengangkutan: </label>
                            </div>
                            <div>
                                <input
                                className="productField"
                                type="number"
                                min = "0"
                                name="pengangkutan"
                                onChange={this.onChange}
                                value={pengangkutan}
                                />
                            </div>
                        </div>
        
                        <div className="productForm">
                            <div>
                                <label>Harga S: </label>
                            </div>
                            <div>
                                <input
                                className="productField"
                                type="number"
                                min = "0"
                                name="harga_S"
                                onChange={this.onChange}
                                value={harga_S}
                                />
                            </div>
                        </div>
        
                        <div className="productForm">
                            <div>
                                <label>Harga A: </label>
                            </div>
                            <div>
                                <input
                                className="productField"
                                type="number"
                                min = "0"
                                name="harga_A"
                                onChange={this.onChange}
                                value={harga_A}
                                />
                            </div>
                        </div>
        
                        <div className="productForm">
                            <div>
                                <label>Harga B: </label>
                            </div>
                            <div>
                                <input
                                className="productField"
                                type="number"
                                min = "0"
                                name="harga_B"
                                onChange={this.onChange}
                                value={harga_B}
                                />
                            </div>
                        </div>
        
                        <div className="productForm">
                            <div>
                                <label>Foto: </label>
                            </div>
                            <div>
                            <ImageUploader
                                className="imageField"
                                withIcon={false}
                                withPreview={true}
                                buttonText="Choose images"
                                onChange={this.onDrop}
                                imgExtension={[".jpg", ".jpeg", ".png"]}
                                maxFileSize={5242880}
                                label="Max file size: 5mb, accepted: jpg, jpeg, png"
                              />
                            </div>
                        </div>
                        
                        <div className="center">
                            <button type="submit" 
                                    className="addProductButton mt-3">
                                Save
                            </button>
                        </div>
                        </form>
                    </div>
                </div>
              );
        }
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  suppliers: state.supplier.suppliers_name,
  supplierIsLoading: state.supplier.isLoading,
  categories: state.product.categories,
  productIsLoading: state.product.isLoading,
  product: state.product.product
});

export default connect(mapStateToProps, {getAllSuppliersName, 
    getAllProductCategories, editProduct, deleteProduct})(EditProduct);
