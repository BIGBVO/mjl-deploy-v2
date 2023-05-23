import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Container, Spinner} from 'react-bootstrap';
import {getAllTerminals, setTerminal} from '../../actions/terminalAction';
import Select from 'react-select';

import '../styles/product.css';

export class SetTerminal extends Component {

  constructor(props){
      super(props);
      this.state = {
        terminal: '',
      }   
      this.changeTerminal = this.changeTerminal.bind(this);
  }

  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    terminals: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired, 
    getAllTerminals: PropTypes.func.isRequired,
    setTerminal: PropTypes.func.isRequired,
  };

  changeTerminal(e){
    this.setState({
      terminal: e.nama
    })
  }

  componentDidMount(){ 
      this.props.getAllTerminals(this.props.user.id)
  }

  onSubmit = (e) => {
    e.preventDefault(); // prevent the case where no input has been made
    const {terminal} = this.state
    if (terminal != ''){
      this.props.setTerminal(terminal)
      this.setState({
          terminal : '',
      })
    }
  };

  render() {
    const isLoading = this.props.isLoading;
    const terminals = this.props.terminals;
    const style = { position: "fixed", top: "50%", left: "50%"};
    if (isLoading){
        return (
            <Spinner animation="border" role="status" variant="primary" style={style}>
                <span className="visually-hidden"></span>
            </Spinner>
        )
    } else {
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <span className="pageText">
                    <strong> Set Terminal </strong>
                </span>
                </nav>
                <div className="headerLine"> </div>
                <Container className="productFormDiv border" style={{'width' : '400px'}}>
                    <form onSubmit={this.onSubmit} style={{'marginTop':"10px", 'marginBottom':'10px'}}>
                        <div className="ProductSerchDiv">
                            <div>
                                <label>Terminal: </label>
                            </div>
                            <div className="">
                                <Select
                                    className="basic-single invoiceProductField"
                                    classNamePrefix="select"
                                    options={terminals}
                                    isClearable={true}
                                    isSearchable={true}
                                    placeholder="---------"
                                    onChange={this.changeTerminal}
                                    getOptionLabel={(x) => x.nama}
                                    getOptionValue={(x) => x.nama}
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className="center" style={{'marginTop':'35px'}}>
                            <button type="submit"
                            className=" viewProductButton"
                            >
                            Set
                            </button>
                        </div>
                    </form>
                </Container>
            </div>
        )   
    }
  }
}

const mapStateToProps = (state) => ({
    isLoading: state.terminal.isLoading,
    terminals: state.terminal.terminals,
    user: state.auth.user,
});

export default connect(mapStateToProps, {getAllTerminals, setTerminal})(SetTerminal);
