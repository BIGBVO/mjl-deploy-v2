import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) { // execute this function when the page is first mounted
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
        if (error.msg.loginFail){ // handles username error
          alert.error(`${error.msg.loginFail}`);
        }  
        if (error.msg.nama_supplier){ // handles username error
          alert.error(`${error.msg.nama_supplier}`);
        }  
        if (error.msg.nama){ // handles username error
          alert.error(`${error.msg.nama}`);
        }
        if (error.msg.kode){
          alert.error(`${error.msg.kode}`);
        }  
        if (error.msg.productExist){
          alert.error(`${error.msg.productExist}`)
        }
        if (error.msg.notFound){
          alert.error(`${error.msg.notFound}`)
        }
    }

    if (message != prevProps.message){
        //success
        if (message.loginSuccess){
          alert.success(message.loginSuccess);
        }

        if (message.supplierCreated){
          alert.success(message.supplierCreated)
        }

        if (message.categoryCreated){
          alert.success(message.categoryCreated)
        }

        if (message.productAdded){
          alert.success(message.productAdded)
        }

        if (message.terminalSet){
          alert.success(message.terminalSet)
        }

        if (message.productEdited){
          alert.success(message.productEdited)
        }

        if (message.productDeleted){
          alert.success(message.productDeleted)
        }

        if (message.failed){
          alert.error(`${message.failed}`)
        }
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = (state) => ({
  error: state.error,
  message: state.message,
});

export default connect(mapStateToProps)(withAlert()(Alerts));