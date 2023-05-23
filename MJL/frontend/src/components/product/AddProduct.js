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
import {getAllProductCategories ,addProduct} from '../../actions/productAction'

import '../styles/layout.css'
import '../styles/product.css'

export class AddProduct extends Component {

  constructor(props){
      super(props);
      // set default state
      this.state = {
        kode : '',
        nama : '',
        kategori: '',
        quantity: '',
        supplier: '',
        modal: '',
        pengangkutan: '',
        harga_S: '',
        harga_A: '',
        harga_B: '',
        gambar: '',
      }

      this.changeCategory = this.changeCategory.bind(this)
      this.changeSupplier = this.changeSupplier.bind(this)
      this.changeModal = this.changeModal.bind(this)
      this.changePengangkutan = this.changePengangkutan.bind(this)
      this.changeHargaS = this.changeHargaS.bind(this)
      this.changeHargaA = this.changeHargaA.bind(this)
      this.changeHargaB = this.changeHargaB.bind(this)
      this.onDrop = this.onDrop.bind(this)
  } 

    static propTypes = {
        // declare the necessary variables and functions
        suppliers: PropTypes.array.isRequired,
        productIsLoading: PropTypes.bool.isRequired,
        supplierIsLoading: PropTypes.bool.isRequired,
        getAllSuppliersName: PropTypes.func.isRequired,
        addProduct: PropTypes.func.isRequired
    };
  
  componentDidMount(){
    this.props.getAllProductCategories(this.props.user.id);
    this.props.getAllSuppliersName(this.props.user.id);
  }

  changeCategory(e){
    this.setState({
      kategori: e.nama
    })
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
      gambar: pictureFiles[0]
    });
  }

  onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
  }
  
  onSubmit = (e) => {
    e.preventDefault(); // prevent the case where no input has been made
    const { kode, nama, kategori, quantity, supplier,
            modal, pengangkutan, harga_S, harga_A, harga_B, gambar} = this.state;

    let product = new FormData();
    product.append("kode", kode);
    product.append("nama", nama);
    product.append("kategori", kategori);
    product.append("quantity", quantity);
    product.append("supplier", supplier);
    product.append("modal", modal);
    product.append("pengangkutan", pengangkutan);
    product.append("harga_S", harga_S);
    product.append("harga_A", harga_A);
    product.append("harga_B", harga_B);
    product.append("gambar", gambar);

    this.props.addProduct(product); // call add product function

    this.setState({
      kode : '',
      nama : '',
      kategori: '',
      quantity: '',
      supplier: '',
      modal: '',
      pengangkutan: '',
      harga_S: '',
      harga_A: '',
      harga_B: '',
      gambar: ''
    })

  };

  render() {
    const productIsLoading = this.props.productIsLoading;
    const invoiceIsLoading = this.props.invoiceIsLoading;
    const suppliers = this.props.suppliers;
    const categories = this.props.categories;
    const {kode,nama,quantity} = this.state;

    if (productIsLoading || invoiceIsLoading){
      const style = { position: "fixed", top: "50%", left: "50%"};
      return (
          <Spinner animation="border" role="status" variant="primary" style={style}>
              <span className="visually-hidden"></span>
          </Spinner>
      )
    } else { // if finished loading
      return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <span className="pageText">
                  <strong> Add New Product </strong>
            </span>
            <div>
                  <div className="navbar-collapse navigationBar" id="navbarTogglerDemo01">
                      <ul className=" pageNavigation navbar-nav ">
                      <li>
                          <Link to="/add-category" className=" pageNavigationItem nav-link ">
                          Add Product Category
                          </Link>
                      </li>
                      <li>
                          <Link to="/add-supplier" className=" pageNavigationItem nav-link ">
                          Add Supplier
                          </Link>
                      </li>
                      </ul>
                  </div>
            </div>
            </nav>
            <div className="headerLine"> </div>

            <div className="productFormDiv card card-body container">
                <form onSubmit={this.onSubmit}>
                
                <div className="productForm">
                    <div>
                        <label>Kode: </label>
                    </div>
                    
                    <div>
                        <input
                        className="productField"
                        type="text"
                        name="kode"
                        onChange={this.onChange}
                        value={kode}
                        required ={true}
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
                        required ={true}
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
                            placeholder="---------"
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
                        required ={true}
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
                            placeholder="---------"
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
                        <CurrencyInput className="productField"
                            name="modal"
                            placeholder="0"
                            prefix={'Rp. '}
                            allowDecimals={false}
                            onValueChange={this.changeModal}
                            required={true}
                        />
                    </div>
                </div>

                <div className="productForm">
                    <div>
                        <label>Pengangkutan: </label>
                    </div>
                    <div>
                        <CurrencyInput className="productField"
                            name="pengangkutan"
                            placeholder="0"
                            prefix={'Rp. '}
                            allowDecimals={false}
                            onValueChange={this.changePengangkutan}
                            required={true}
                        />
                    </div>
                </div>

                <div className="productForm">
                    <div>
                        <label>Harga S: </label>
                    </div>
                    <div>
                        <CurrencyInput className="productField"
                            name="harga_S"
                            placeholder="0"
                            prefix={'Rp. '}
                            allowDecimals={false}
                            onValueChange={this.changeHargaS}
                            required={true}
                        />
                    </div>
                </div>

                <div className="productForm">
                    <div>
                        <label>Harga A: </label>
                    </div>
                    <div>
                        <CurrencyInput className="productField"
                            name="harga_A"
                            placeholder="0"
                            prefix={'Rp. '}
                            allowDecimals={false}
                            onValueChange={this.changeHargaA}
                            required={true}
                        />
                    </div>
                </div>

                <div className="productForm">
                    <div>
                        <label>Harga B: </label>
                    </div>
                    <div>
                        <CurrencyInput className="productField"
                            name="harga_B"
                            placeholder="0"
                            prefix={'Rp. '}
                            allowDecimals={false}
                            onValueChange={this.changeHargaB}
                            required={true}
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

                <div className="productForm">
                    <button type="submit" 
                            className="addProductButton float-right mt-3">
                        Add Product
                    </button>
                </div>

                </form>
            </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  suppliers: state.supplier.suppliers_name,
  supplierIsLoading: state.supplier.isLoading,
  categories: state.product.categories,
  productIsLoading: state.product.isLoading,
});

export default connect(mapStateToProps, {getAllSuppliersName, getAllProductCategories, 
  addProduct })(AddProduct);
