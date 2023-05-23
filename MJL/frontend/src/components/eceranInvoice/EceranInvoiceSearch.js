import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Container, Spinner} from 'react-bootstrap';
import {getSpecificEceranInvoice} from '../../actions/eceranInvoiceAction';
import '../styles/product.css';

export class EceranInvoiceSearch extends Component {

  constructor(props){
      super(props);
      this.state = {
        nomor: '',
        view: false
      }   
  }

  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    getSpecificEceranInvoice: PropTypes.func.isRequired
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault(); // prevent the case where no input has been made
    const {nomor} = this.state
    if (nomor != ''){
      const nomor_nota = "RE-" + nomor
      this.props.getSpecificEceranInvoice(nomor_nota, this.props.user.id)
      this.setState({
        view: true
      })
    }
  };

  render() {
    const {view, nomor} = this.state;
    const isLoading = this.props.isLoading;
    const style = { position: "fixed", top: "50%", left: "50%"};
    if (isLoading){
        return (
            <Spinner animation="border" role="status" variant="primary" style={style}>
                <span className="visually-hidden"></span>
            </Spinner>
        )
    } else {
        if (view){
            return <Redirect to= "/eceran-invoice-details" />
        } else {
            return (
                <div>
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <span className="pageText">
                        <strong> Eceran Invoice Search </strong>
                    </span>
                    </nav>
                    <div className="headerLine"> </div>
                    <Container className="productFormDiv border" style={{'width' : '400px'}}>
                        <form onSubmit={this.onSubmit} style={{'marginTop':"10px", 'marginBottom':'10px'}}>
                            <div className="ProductSerchDiv">
                                <div>
                                    <label>No Nota (RE-): </label>
                                </div>
                            
                                <div className="">
                                <input
                                    className="supplierFormInput"
                                    type="text"
                                    name="nomor"
                                    onChange={this.onChange}
                                    value={nomor}
                                />
                                </div>
                            </div>
    
                            <div className="center" style={{'marginTop':'35px'}}>
                                <button type="submit"
                                className=" viewProductButton"
                                >
                                Search
                                </button>
                            </div>
                        </form>
                    </Container>
                </div>
                )   
        }
    }
  }
}

const mapStateToProps = (state) => ({
    isLoading: state.eceranInvoice.isLoading,
    user: state.auth.user,
});

export default connect(mapStateToProps, {getSpecificEceranInvoice})(EceranInvoiceSearch);
