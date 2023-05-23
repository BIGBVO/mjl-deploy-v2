import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {createReport} from '../../actions/reportAction';
import {Spinner} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import CurrencyInput from 'react-currency-input-field';
import { Container} from 'react-bootstrap';

import '../styles/layout.css'
import '../styles/supplier.css'

export class ResetTerminal extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            amount : '',
            back : false,
            reset : false,
        }
        this.back = this.back.bind(this);
        this.changeAmount = this.changeAmount.bind(this);
        this.formatNumber = this.formatNumber.bind(this);
    }

    static propTypes = {
        user: PropTypes.object.isRequired,
        isLoading: PropTypes.bool.isRequired,
        createReport: PropTypes.func.isRequired,
        report: PropTypes.object.isRequired,
        terminal: PropTypes.string.isRequired,
    }


  formatNumber(total){
    return ("Rp. " + total.toLocaleString());
  }

  changeAmount(e){
      this.setState({
          amount:e
      })
  }

  back(){
      this.setState({
          back: true
      })
  }

  onSubmit = (e) => {
      e.preventDefault();

      const id = this.props.user.id
      const penarikan = this.state.amount
      const terminal = this.props.terminal

      if (penarikan <= this.props.report.saldo_akhir){
        const data = {id, penarikan, terminal}
        this.props.createReport(data)
        this.setState({
            reset: true
        })
      }
  }

  render() {
    const {back, reset } = this.state;
    const isLoading = this.props.isLoading;
    const report = this.props.report

    if (!isLoading){ // if finished loading
      if (back){
        return <Redirect to= "/terminal-summary" />
    } else {
        if (reset){
            return <Redirect to= "/report-details" />
        } else {
            return (
            <div>
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <span className="pageText">
                        <strong> Reset Terminal </strong>
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
                    <Container className="invoiceInformationGrid" style={{'width':'600px', "marginTop" : "-2px"}}>
                            <div className="">
                            <label className="largeFont">Terminal ID: {report.terminal}</label>
                            </div>

                            <div className="">
                            <label className="largeFont">Saldo Akhir: {this.formatNumber(report.saldo_akhir)}</label>
                            </div>
                    </Container>
                <div className="supplierFormDiv card card-body container" style={{'marginTop':'10px'}}>
                    <form onSubmit={this.onSubmit}>
                    <div className="supplierForm">
                        <label>Reset Amount: </label>
                        <CurrencyInput className="supplierFormInput"
                            name="amount"
                            placeholder="0"
                            prefix={'Rp. '}
                            allowDecimals={false}
                            onValueChange={this.changeAmount}
                            required={true}
                            />
                    </div>

                    <div className="center">
                        <button type="submit" 
                                className="addSupplierButton mt-3">
                            Reset Terminal
                        </button>
                    </div>
                    </form>
                </div>
            </div>
            )
        }
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
    isLoading: state.terminal.isLoading,
    report: state.terminal.report.report,
    terminal: state.auth.terminal,
});

export default connect(mapStateToProps, {createReport})(ResetTerminal);
