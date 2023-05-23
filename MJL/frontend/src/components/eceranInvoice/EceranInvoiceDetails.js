import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Container} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {Spinner} from 'react-bootstrap';
import ReactToPrint from 'react-to-print';
import {Redirect} from 'react-router-dom';

import '../styles/product.css';
import '../styles/invoice.css';
import '../styles/print.css';

export class EceranInvoiceDetails extends Component {

  constructor(props){
      super(props);
      this.state = {
        back:false
      }   
      this.formatNumber = this.formatNumber.bind(this);
      this.back = this.back.bind(this);
  }

  static propTypes = {
    user: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    invoice: PropTypes.object.isRequired
  };

  back(){
    this.setState({
        back: true
    })
  }

  formatNumber(total){
    return ("Rp. " + total.toLocaleString());
  }

  render() {
    const {back} = this.state;
    const isLoading = this.props.isLoading;
    const invoice = this.props.invoice;
    const style = { position: "fixed", top: "50%", left: "50%"};

    if (isLoading){
      return (
          <Spinner animation="border" role="status" variant="primary" style={style}>
              <span className="visually-hidden"></span>
          </Spinner>
      )
    } else {
        if (back) {
            return <Redirect to= "/eceran-invoice-search" />
        } else {
            return (
                    <div>
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <span className="pageText">
                        <strong> Eceran Regular Details</strong>
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
                            />
                            </li>
                            </ul>
                        </div>
                    </div>
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
                    <Container className="eceranInvoiceWidth" ref={el => (this.componentRef = el)}>
                        <div className="center">
                            <div className="center">
                            <h1 className="tittleT"> **REG COPY** </h1>
                            <h1> TERIMA KASIH</h1>
                            </div>
                        <div className="tagline center"></div>
                        </div>
                        
                        <Container className="invoiceInformationGrid" style={{"marginTop" : "-2px"}}>
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
                        <div className="container customerList" style={{'marginTop':'-10px'}}>
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
                        {invoice.catatan != "" ? (
                             <div className="footDiv">
                                <div className="footNote tableBorder">
                                    <div>
                                        <label className="mediumFont">Catatan:</label>
                                    </div>
                                    <div>
                                    <label className="mediumFont">{invoice.catatan}</label>
                                </div>
                                </div>
                            </div>
                            ):(
                                <div/>
                            )}
                        <div className="footDiv">
                            <div className="footNote tableBorder">
                                <div>
                                    <label className="mediumFont">Catatan:</label>
                                </div>
                                <div>
                                    <label className="mediumFont">1. Tidak Menerima Komplain Lebih Dari 7 Hari Dari Tanggal Nota.</label>
                                    <label className="mediumFont" style={{"marginTop":"-4px"}}>2. Sertakan Nota Dalam Komplain.</label>
                                </div>
                            </div>
                            <div className="right">
                                <label className="mediumFont">Total : {this.formatNumber(invoice.total)}</label>
                            </div>
                        </div>
                    </Container>
                    </div>
                )
        }
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isLoading: state.eceranInvoice.isLoading,
  invoice: state.eceranInvoice.invoice,
});

export default connect(mapStateToProps, {})(EceranInvoiceDetails);


