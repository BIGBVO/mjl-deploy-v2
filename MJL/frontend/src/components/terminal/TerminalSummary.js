import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Container} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {getSummary} from '../../actions/terminalAction';
import {Spinner} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';

import '../styles/terminal.css';

export class TerminalSummary extends Component {
    constructor(props){
        super(props);
        this.state = {
            reset:false
        }
        this.reset = this.reset.bind(this);
        this.formatNumber = this.formatNumber.bind(this);
    }

    static propTypes = {
        user: PropTypes.object.isRequired,
        isLoading: PropTypes.bool.isRequired,
        getSummary: PropTypes.func.isRequired,
        terminal: PropTypes.string.isRequired,
        report: PropTypes.object.isRequired
    }

    formatNumber(total){
        return ("Rp. " + total.toLocaleString());

    }
    
    reset(){
        this.setState({
            reset:true
        })
    }
    componentDidMount(){
        this.props.getSummary(this.props.user.id, this.props.terminal)
    }

    render(){
        const isLoading = this.props.isLoading;
        const style = { position: "fixed", top: "50%", left: "50%"};
        const report = this.props.report
        const reset = this.state.reset
        if (isLoading){
            return (
                <Spinner animation="border" role="status" variant="primary" style={style}>
                    <span className="visually-hidden"></span>
                </Spinner>
            )
        } else {
            if (reset){
                return <Redirect to= "/terminal-reset" />
            } else {
                return (
                <div>
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                        <span className="pageText">
                        <strong> Terminal Summary </strong>
                        </span>
                        <div>
                            <div className="navbar-collapse navigationBar" id="navbarTogglerDemo01">
                                <button
                                    onClick={() => this.reset()}
                                    className="resetButton"
                                    >
                                    Reset
                                </button>
                            </div>
                        </div>
                    </nav>
                    <div className="headerLine"> </div>
                    <Container className = "terminalSummaryWidth" style={{'marginTop' : '30px'}}>
                        <div className="terminalSummaryGrid border">
                            <div>                                 
                                <div className="terminalSumDetailsGrid">
                                    <div>
                                        <label>Terminal ID:</label>
                                    </div>
                                    <div>
                                        <label> {report.terminal} </label>
                                    </div>
                                </div>
                                <div className="terminalSumDetailsGrid">
                                    <div>
                                        <label>Saldo Awal:</label>
                                    </div>
                                    <div>
                                        <label> {this.formatNumber(report.saldo_awal)} </label>
                                    </div>
                                </div>
                                <div className="terminalSumDetailsGrid">
                                    <div>
                                        <label>Saldo Akhir:</label>
                                    </div>
                                    <div>
                                        <label> {this.formatNumber(report.saldo_akhir)} </label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="terminalSumDetailsGrid">
                                    <div>
                                        <label>Total Penjualan:</label>
                                    </div>
                                    <div>
                                        <label> {this.formatNumber(report.total_regular)} </label>
                                    </div>
                                </div>
                                <div className="terminalSumDetailsGrid">
                                    <div>
                                        <label>Total Void:</label>
                                    </div>
                                    <div>
                                        <label> {this.formatNumber(report.total_void)} </label>
                                    </div>
                                </div>
                                <div className="terminalSumDetailsGrid">
                                    <div>
                                        <label>Total Transfer:</label>
                                    </div>
                                    <div>
                                        <label> {this.formatNumber(report.total_transfer)} </label>
                                    </div>
                                </div>
                            </div>
                            <div>

                            </div>
                        </div>

                        <Container>
                            <div style={{marginTop:'20px'}}>
                                <span className="kepala">
                                    <strong> Void List: </strong>
                                </span>
                            </div>
                            <div className="container customerList">
                                    <table className="table table-striped tableFont">
                                        <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Nota</th>
                                            <th>Jam</th>
                                            <th>Total</th>
                                            <th>Terminal</th>
                                            <th>User</th>
                                            <th>Catatan</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.props.void_invoices.map((invoice, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{invoice.nomor}</td>
                                                <td>{invoice.jam}</td>
                                                <td>{invoice.total}</td>
                                                <td>{invoice.terminal_id}</td>
                                                <td>{invoice.nama}</td>
                                                <td>{invoice.catatan}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                        </Container>
                    </Container>
                </div>
                )
            }
        }
    }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  terminal: state.auth.terminal,
  report: state.terminal.report.report,
  void_invoices: state.terminal.report.void_invoices,
  isLoading: state.terminal.isLoading,
})

export default connect(mapStateToProps, {getSummary})(TerminalSummary);