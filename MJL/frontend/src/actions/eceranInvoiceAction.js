import axios from 'axios';
import { getErrors, createMessage } from './alertAction'

import {CREATING_ECERAN_INVOICE, 
        CREATE_ECERAN_INVOICE_SUCCESS, 
        CREATE_ECERAN_INVOICE_FAIL, 
        ECERAN_INVOICE_FINALISED,
        GETTING_SPECIFIC_ECERAN_INVOICE,
        GET_SPECIFIC_ECERAN_INVOICE_SUCCESS,
        GET_SPECIFIC_ECERAN_INVOICE_FAIL} from './types'

import { tokenConfig } from './authAction';

export const createEceranInvoice = (invoice) => (dispatch, getState) => {
    dispatch({type: CREATING_ECERAN_INVOICE})
    axios
    .post('/api/veceran-invoiceo/create', invoice, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ ecereanInvoiceAdded: 'Invoice Created Successfully' }));
      dispatch({
        type: CREATE_ECERAN_INVOICE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({type: CREATE_ECERAN_INVOICE_FAIL});
      dispatch(getErrors(err.response.data, err.response.status))
    });
};

export const finalisedNotaEceran = () => (dispatch) => {
  dispatch({type: ECERAN_INVOICE_FINALISED})
}

export const getSpecificEceranInvoice = (nomor, userId) => (dispatch, getState) => {
  dispatch({type: GETTING_SPECIFIC_ECERAN_INVOICE});
  axios
  .get(`/api/veceran-invoiceo/get?nomor=${nomor}&id=${userId}`, tokenConfig(getState))
  .then((res) => {
    dispatch({
      type: GET_SPECIFIC_ECERAN_INVOICE_SUCCESS,
      payload: res.data,
    });
  })
  .catch((err) => {
      dispatch({type: GET_SPECIFIC_ECERAN_INVOICE_FAIL})
      dispatch(getErrors(err.response.data, err.response.status))
  });
}