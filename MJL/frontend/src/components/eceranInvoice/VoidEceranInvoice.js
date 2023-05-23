import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Container} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {getAllProductsCode, getSpecificProductS} from '../../actions/productAction';
import {createEceranInvoice, finalisedNotaEceran} from '../../actions/eceranInvoiceAction';
import { getErrors } from '../../actions/alertAction'
import {Spinner} from 'react-bootstrap';
import Select from 'react-select';
import ReactToPrint from 'react-to-print';

import '../styles/product.css';
import '../styles/invoice.css';
import '../styles/print.css';

export class VoidEceranInvoice extends Component {

  constructor(props){
      super(props);
      this.state = {
        confirmed: false,
        printed: false,
        view: false,
        buckets: [],
        quantity: '',
        kode: '',
        tipe: 'VOID',
        catatan: '',
        harga: 0,
        total_belanja: 0
      }   
      this.formatNumber = this.formatNumber.bind(this);
      this.changeProduct = this.changeProduct.bind(this);
      this.changePrice = this.changePrice.bind(this);
      this.addProduct = this.addProduct.bind(this);
      this.deleteProduct = this.deleteProduct.bind(this);
      this.afterPrint = this.afterPrint.bind(this);
      this.confirmProduct = this.confirmProduct.bind(this);
      this.finalisedInvoice = this.finalisedInvoice.bind(this);
      this.back1 = this.back1.bind(this);
  }

  static propTypes = {
    user: PropTypes.object.isRequired,
    productIsLoading: PropTypes.bool.isRequired,
    invoiceIsLoading: PropTypes.bool.isRequired,
    products: PropTypes.array.isRequired,
    getAllProductsCode: PropTypes.func.isRequired,
    getSpecificProductS: PropTypes.func.isRequired,
    finalisedNotaEceran: PropTypes.func.isRequired
  };

  componentDidMount(){
    this.props.getAllProductsCode(this.props.user.id);
  }

  back1(){
    this.setState({
      view: false,
      kode: '',
      quantity: ''
    })
  }

  afterPrint(){
    this.setState({
      printed: true
    })
  }

  finalisedInvoice(){
    this.props.finalisedNotaEceran();
    this.setState({
      confirmed: false,
      printed: false,
      view: false,
      buckets: [],
      quantity: '',
      kode: '',
      harga: 0,
      total_belanja: 0
    })
  }

  confirmProduct(){

    const barang = this.state.buckets
    if (barang.length != 0){
      const total = this.state.total_belanja
      const id = this.props.user.id
      const terminal  = this.props.terminal
      const tipe = this.state.tipe
      const catatan = this.state.catatan

      if (catatan != ''){
        const invoice = JSON.stringify({ barang, total, id, terminal, tipe, catatan });

        this.props.createEceranInvoice(invoice)
  
        this.setState({
          confirmed: true
        })
      }
    }
  }

  addProduct = (e) => {
    e.preventDefault(); // prevent the case where no input has been made
    const {kode, quantity, buckets, total_belanja} = this.state
    const nama = this.props.product.kategori
    var harga = 0;

    if (this.state.harga != 0 && this.state.harga < this.props.product.harga_S){
      console.log("price too cheap")
    } else {
      if (this.state.harga == 0) {
        harga = this.props.product.harga_B
      } else {
        harga = this.state.harga
      }

      var exist = false
      const length = buckets.length
      var index = 0

      while (index < length && exist == false){
        if(buckets[index].kode == kode && buckets[index].harga == harga){
            exist = true
        } else {
          index += 1
        }
      }

      if (exist){
        buckets[index].quantity = parseInt(buckets[index].quantity) + parseInt(quantity)

        const total =  buckets[index].harga *  buckets[index].quantity
        const total_bel = parseInt(total_belanja) + (parseInt(quantity) * parseInt(buckets[index].harga))

        buckets[index].total = total
        this.setState({
          total_belanja : total_bel
        })

      } else {
          const total = harga*quantity
          const product = {
            'kode' : kode,
            'nama' : nama,
            'harga': harga,
            'quantity' : quantity,
            'total' : total
          }

          const total_bel = total_belanja + total

          var newBuckets;
          
          if (buckets.length == 0){
            newBuckets = [product]
          } else {
            newBuckets = [...buckets, product]
            newBuckets.sort((a,b) => (a.kode > b.kode) ? 1 : -1)
          }
          

          this.setState({
            buckets: newBuckets,
            total_belanja : total_bel
          })
        }

      this.setState({
        view: false,
        quantity: '',
        kode: '',
        harga: 0
      })
    }
  };

  deleteProduct(index){
    const {buckets, total_belanja} = this.state

    const total_bel = total_belanja - buckets[index].total

    buckets.splice(index,1)
    this.setState({
        buckets: buckets,
        total_belanja: total_bel
    })
  }

  changePrice(e){
    this.setState({
      harga: e.target.value
    })
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault(); // prevent the case where no input has been made
    const {kode} = this.state
    if (kode != ''){
      this.props.getSpecificProductS(kode, this.props.user.id)
      this.setState({
        view: true
      })
    }
  };

  changeProduct(e){
    this.setState({
      kode: e.kode
    })
  }

  formatNumber(total){
    return ("Rp. " + total.toLocaleString());
  }

  render() {
    const {view, buckets, quantity, confirmed, printed, total_belanja, catatan} = this.state;
    const productIsLoading = this.props.productIsLoading;
    const invoiceIsLoading = this.props.invoiceIsLoading;
    const products = this.props.products;
    const product = this.props.product;
    const invoice = this.props.invoice;
    const style = { position: "fixed", top: "50%", left: "50%"};

    if (productIsLoading){
      return (
          <Spinner animation="border" role="status" variant="primary" style={style}>
              <span className="visually-hidden"></span>
          </Spinner>
      )
    } else { // if finished loading
        if (confirmed){
          if (invoiceIsLoading){
            return (
              <Spinner animation="border" role="status" variant="primary" style={style}>
                  <span className="visually-hidden"></span>
              </Spinner>
          )
          } else {
            return (
                  <div>
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <span className="pageText" style={{"color" : "red"}}>
                      <strong> Nota Eceran Void </strong>
                    </span>
                    <div>
                        <div className="navbar-collapse navigationBar" id="navbarTogglerDemo01">
                          <ul className=" pageNavigation navbar-nav ">
                          <li>
                          <ReactToPrint
                            trigger={() => {
                                return <button className=" confirmInvoiceButton" >Print</button>;
                            }}
                            content={() => this.componentRef}
                            onAfterPrint={() => this.afterPrint()}
                          />
                          </li>
                          </ul>
                        </div>
                    </div>
                    </nav>
                    <div className="headerLine"> </div>
                    <Container className="eceranInvoiceWidth" ref={el => (this.componentRef = el)}>
                      <div className="center">
                        {printed ? (
                          <div className="center">
                            <h2> **COPY** </h2>
                            <h1> VOID </h1>
                          </div>
                          ): (
                          <div className="center">
                            <h1 classname="tittleT"> L&P </h1>
                            <h1> VOID </h1>
                          </div>
                        )}
                        <div className="tagline center"></div>
                      </div>
                      
                      <Container className="invoiceInformationGrid">
                        <div className="">
                          <label className="largeFont">{invoice.nomor}</label>
                        </div>

                        <div className="">
                          <label className="largeFont">{invoice.tanggal}</label>
                        </div>

                        <div className="">
                          <label className="largeFont">{invoice.jam} </label>
                        </div>

                        <div className="">
                          <label className="largeFont">{invoice.nama} </label>
                        </div>
                      </Container>
                      <div className="container customerList">
                        <table className="table table-bordered mediumFont tableHeight" style={{'border':'2px solid black'}}>
                          <thead>
                            <tr>
                              <th style={{'border':'2px solid black'}}>No</th>
                              <th style={{'border':'2px solid black'}}>Nama</th>
                              <th style={{'border':'2px solid black'}}>Kode</th>
                              <th style={{'border':'2px solid black'}}>Qty</th>
                              <th style={{'border':'2px solid black'}}>Harga</th>
                              <th style={{'border':'2px solid black'}}>Cek</th>
                              <th style={{'border':'2px solid black'}}>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {invoice.barang.map((product, index) => (
                              <tr key={index}>
                                  <td style={{'border':'2px solid black'}}>{index + 1}</td>
                                  <td style={{'border':'2px solid black'}}>{product.nama}</td>
                                  <td style={{'border':'2px solid black'}}>{product.kode}</td>
                                  <td style={{'border':'2px solid black'}}>{product.quantity}</td>
                                  <td style={{'border':'2px solid black'}}>{this.formatNumber(product.harga)}</td>
                                  <td style={{'border':'2px solid black'}}>{}</td>
                                  <td style={{'border':'2px solid black'}}>{this.formatNumber(product.total)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="footDiv">
                        <div className="border footNote">
                          <div>
                            <label className="mediumFont">Catatan:</label>
                          </div>
                          <div>
                            <label className="mediumFont">{invoice.catatan}</label>
                          </div>
                        </div>
                        <div className="right">
                          <label className="largeFont">Total : {this.formatNumber(invoice.total)}</label>
                        </div>
                      </div>
                    </Container>
                    <Container className = "eceranInvoiceWidth">
                      <div style={{textAlign:"right", marginTop:"20px"}}>
                        <button
                          className=" finalisedInvoiceButton"
                          onClick={() => this.finalisedInvoice()}
                        >
                            Finalised
                        </button>
                      </div>
                    </Container>
                  </div>
                )
          }
        } else {
          return (
            <div>
              <div>
                <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <span className="pageText" style={{"color" : "red"}}>
                  <strong> Nota Eceran Void </strong>
                </span>
                </nav>
                <div className="headerLine"> </div>
                <div className="invoiceProductDiv card card-body container">
                  <div className="invoiceGrid">
                    <div className="container borders" >
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Kode</th>
                            <th>Kategori</th>
                            <th>Qty</th>
                            <th>Harga</th>
                            <th>Total</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {buckets.map((product, index) => (
                              <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{product.kode}</td>
                                  <td>{product.nama}</td>
                                  <td>{product.quantity}</td>
                                  <td>{this.formatNumber(product.harga)}</td>
                                  <td>{this.formatNumber(product.total)}</td>
                                  <td>
                                      <button
                                        className=" deleteInvoiceProductButton"
                                        onClick={() => this.deleteProduct(index)}
                                      >
                                          Delete
                                      </button>
                                  </td>
                              </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="splitLine"> </div>
                    <div className="container">
                      {view ? (
                        <div>
                          <div>
                            <button className="backButton"
                              onClick={() => this.back1()}>
                                Back
                            </button>
                          </div>
                          <div className="container center border imgDiv">                  
                            <img
                              src = {product.gambar}
                              alt="Image"
                              className="imageSize"
                            >
                            </img>
                          </div>
                          <div className="invoiceProductSerchDiv">
                            <div>
                                <label>Nama: </label>
                            </div>    
                            <div>
                                <label>{product.kategori} </label>
                            </div>
                          </div>
                          <div className="invoiceProductSerchDiv">
                            <div>
                                <label>Isi: </label>
                            </div>    
                            <div>
                                <label>{product.quantity}</label>
                            </div>
                          </div>
                          <div className="invoiceProductSerchDiv">
                            <div>
                                <label>Harga Grosir: </label>
                            </div>    
                            <div>
                                <label>{this.formatNumber(product.harga_A)} </label>
                            </div>
                          </div>
                          <form onSubmit={this.addProduct}>
                            <div className="invoiceProductSerchDiv">
                              <div>
                                  <label>Harga: </label>
                              </div>
                              
                              <div className="">
                                  <input
                                  className="invoiceProductField"
                                  type="number"
                                  defaultValue = {product.harga_B}
                                  name="harga"
                                  onChange={this.changePrice}
                                  required ={true}
                                  />
                              </div>
                            </div>
                            <div className="center">
                            <button type="submit"
                                className=" searchInvoiceProductButton"
                              >
                                Add
                              </button>
                            </div>
                          </form>
                        </div>
                      ) : (
                        <div className="searchMargin">
                        <form onSubmit={this.onSubmit}>
                          <div className="invoiceProductSerchDiv">
                            <div>
                                <label>Quantity: </label>
                            </div>
                            
                            <div className="">
                                <input
                                className="invoiceProductField"
                                type="number"
                                name="quantity"
                                onChange={this.onChange}
                                value={quantity}
                                required ={true}
                                />
                            </div>
                          </div>
                          <div className="invoiceProductSerchDiv">
                            <div>
                                <label>Kode: </label>
                            </div>
                            
                            <div className="">
                              <Select
                                  className="basic-single invoiceProductField"
                                  classNamePrefix="select"
                                  options={products}
                                  isClearable={true}
                                  isSearchable={true}
                                  placeholder="---------"
                                  onChange={this.changeProduct}
                                  getOptionLabel={(x) => x.kode}
                                  getOptionValue={(x) => x.kode}
                                  required={true}
                              />
                            </div>
                          </div>

                          <div className="center" style={{'marginTop':'35px'}}>
                              <button type="submit"
                                className=" searchInvoiceProductButton"
                              >
                                Search
                              </button>
                          </div>

                          </form>
                      </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="invoiceProductSerchDiv1 card card-body container" style={{"marginTop" : "-2px", "marginBottom" : "5px"}}>
                <div style={{"marginTop" : "5px", "marginBottom" : "5px"}}>
                  Catatan:
                </div>
                <div style={{"marginTop" : "5px", "marginBottom" : "5px"}}>
                  <input
                    className="invoiceProductField1"
                    type="text"
                    name="catatan"
                    onChange={this.onChange}
                    value={catatan}
                    required ={true}
                    />
                </div>
              </div>
              <div className="invoiceProductSerchDiv card card-body container">
                <div >
                  <label className="tableFont" style={{marginTop:"20px"}}> Total Belanja:  {this.formatNumber(total_belanja)}</label>
                </div>
                <div style={{textAlign:"right"}}>
                  <button
                    className=" finalisedInvoiceButton"
                    onClick={() => this.confirmProduct()}
                  >
                      Confirm
                  </button>
                </div>
              </div>
            </div>
          )
        }
      }
    }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  terminal: state.auth.terminal,
  productIsLoading: state.product.isLoading,
  products: state.product.products_code,
  product: state.product.product,
  invoiceIsLoading: state.eceranInvoice.isLoading,
  invoice: state.eceranInvoice.invoice,
});

export default connect(mapStateToProps, {getAllProductsCode, getSpecificProductS, 
  createEceranInvoice, finalisedNotaEceran, getErrors})(VoidEceranInvoice);


