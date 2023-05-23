import axios from 'axios';
import { getErrors, createMessage } from './alertAction'
import {GETTING_ALL_SUPPLIERS_NAME, GET_ALL_SUPPLIERS_NAME_SUCCESS, GET_ALL_SUPPLIERS_NAME_FAIL} from './types'
import {ADD_SUPPLIER, ADD_SUPPLIER_SUCCESS, ADD_SUPPLIER_FAIL} from './types'


import { tokenConfig } from './authAction';

export const addSupplier = (supplier, userId) => (dispatch, getState) => {
  
  dispatch({type: ADD_SUPPLIER})
  axios
  .post(`/api/vsuppliero/add?id=${userId}`, supplier, tokenConfig(getState))
  .then((res) => {
    dispatch(createMessage({ supplierCreated: 'Supplier Added Successfully' }));
    dispatch({
      type: ADD_SUPPLIER_SUCCESS,
      payload: res.data,
    });
  })
  .catch((err) => {
    dispatch({
      type: ADD_SUPPLIER_FAIL,
    })
    dispatch(getErrors(err.response.data, err.response.status))});
};

export const getAllSuppliersName = (userId) => (dispatch, getState) => {
  
    dispatch({type: GETTING_ALL_SUPPLIERS_NAME});
    axios
    .get(`/api/vsuppliero/all-name?id=${userId}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_ALL_SUPPLIERS_NAME_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
        dispatch({type: GET_ALL_SUPPLIERS_NAME_FAIL})
        dispatch(getErrors(err.response.data, err.response.status))
    });
};
