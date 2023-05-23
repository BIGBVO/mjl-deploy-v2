import axios from 'axios';
import { getErrors, createMessage } from './alertAction'

import {GETTING_SPECIFIC_PRODUCT, GET_SPECIFIC_PRODUCT_SUCCESS,
        GET_SPECIFIC_PRODUCT_FAIL} from './types'
import {GETTING_ALL_PRODUCTS_CODE, GET_ALL_PRODUCTS_CODE_SUCCESS,
        GET_ALL_PRODUCTS_CODE_FAIL} from './types'
import {ADD_PRODUCT_CATEGORY, ADD_PRODUCT_CATEGORY_SUCCESS,
        ADD_PRODUCT_CATEGORY_FAIL} from './types'
import {ADD_PRODUCT, ADD_PRODUCT_SUCCESS, 
        ADD_PRODUCT_FAIL} from './types'
import {GETTING_PRODUCT_CATEGORIES, GET_PRODUCT_CATEGORIES_SUCCESS,
        GET_PRODUCT_CATEGORIES_FAIL} from './types'
import {EDIT_PRODUCT, EDIT_PRODUCT_SUCCESS, 
        EDIT_PRODUCT_FAIL} from './types'
import {DELETE_PRODUCT, DELETE_PRODUCT_SUCCESS, 
        DELETE_PRODUCT_FAIL} from './types'
import { tokenConfig } from './authAction';

export const addProductCategory = (category, userId) => (dispatch, getState) => {

  dispatch({type: ADD_PRODUCT_CATEGORY})
  axios
  .post(`/api/vproducto/add-category?id=${userId}`, category, tokenConfig(getState))
  .then((res) => {
    dispatch(createMessage({ categoryCreated: 'Product Category Added Successfully' }));
    dispatch({
      type: ADD_PRODUCT_CATEGORY_SUCCESS,
      payload: res.data,
    });
  })
  .catch((err) => {
    dispatch({
      type: ADD_PRODUCT_CATEGORY_FAIL,
    })
    dispatch(getErrors(err.response.data, err.response.status))});
};

export const getAllProductCategories = (userId) => (dispatch, getState) => {
  
  dispatch({type: GETTING_PRODUCT_CATEGORIES});
  axios
  .get(`/api/vproducto/all-category?id=${userId}`, tokenConfig(getState))
  .then((res) => {
    dispatch({
      type: GET_PRODUCT_CATEGORIES_SUCCESS,
      payload: res.data,
    });
  })
  .catch((err) => {
      dispatch({type: GET_PRODUCT_CATEGORIES_FAIL})
      dispatch(getErrors(err.response.data, err.response.status))
  });
};


export const addProduct = (product, userId) => (dispatch, getState) => {

  dispatch({type: ADD_PRODUCT});
  axios
  .post(`/api/vproducto/add?id=${userId}`, product, tokenConfig(getState))
  .then((res) => {
    dispatch(createMessage({ productAdded: 'Product Added Successfully' }));
    dispatch({
      type: ADD_PRODUCT_SUCCESS,
      payload: res.data,
    });
  })
  .catch((err) => {
    dispatch({type: ADD_PRODUCT_FAIL});
    dispatch(getErrors(err.response.data, err.response.status))
  });
};

export const deleteProduct = (kode, userId) => (dispatch, getState) => {

  dispatch({type: DELETE_PRODUCT});
  const config = tokenConfig(getState)
  axios
  .delete(`/api/vproducto/delete?id=${userId}`, 
    {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': config.headers['X-CSRFToken'],
        'Authorization': config.headers['Authorization']
      },
      data:{
        'kode':kode
      }
    })
  .then((res) => {
    dispatch(createMessage({productDeleted: 'Product Deleted Successfully' }));
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
    });
  })
  .catch((err) => {
    dispatch({type: DELETE_PRODUCT_FAIL});
    dispatch(getErrors(err.response.data, err.response.status))
  });
};

export const editProduct = (product, userId) => (dispatch, getState) => {

  dispatch({type: EDIT_PRODUCT});
  axios
  .post(`/api/vproducto/edit?id=${userId}`, product, tokenConfig(getState))
  .then((res) => {
    dispatch(createMessage({ productEdited: 'Product Edited Successfully' }));
    dispatch({
      type: EDIT_PRODUCT_SUCCESS,
      payload: res.data,
    });
  })
  .catch((err) => {
    dispatch({type: EDIT_PRODUCT_FAIL});
    dispatch(getErrors(err.response.data, err.response.status))
  });
};


export const getAllProductsCode = (userId) => (dispatch, getState) => {
    dispatch({type: GETTING_ALL_PRODUCTS_CODE});
    axios
    .get(`/api/vproducto/all-code?id=${userId}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_ALL_PRODUCTS_CODE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
        dispatch({type: GET_ALL_PRODUCTS_CODE_FAIL})
        dispatch(getErrors(err.response.data, err.response.status))
    });
  };

export const getSpecificProductX = (kode, userId) => (dispatch, getState) => {
  dispatch({type: GETTING_SPECIFIC_PRODUCT});
  axios
  .get(`/api/vproducto/codeX?kode=${kode}&id=${userId}`, tokenConfig(getState))
  .then((res) => {
    dispatch({
      type: GET_SPECIFIC_PRODUCT_SUCCESS,
      payload: res.data,
    });
  })
  .catch((err) => {
      dispatch({type: GET_SPECIFIC_PRODUCT_FAIL})
      dispatch(getErrors(err.response.data, err.response.status))
  });
}

export const getSpecificProductS = (kode, userId) => (dispatch, getState) => {
  dispatch({type: GETTING_SPECIFIC_PRODUCT});
  axios
  .get(`/api/vproducto/codeS?kode=${kode}&id=${userId}`, tokenConfig(getState))
  .then((res) => {
    dispatch({
      type: GET_SPECIFIC_PRODUCT_SUCCESS,
      payload: res.data,
    });
  })
  .catch((err) => {
      dispatch({type: GET_SPECIFIC_PRODUCT_FAIL})
      dispatch(createMessage({ failed: 'Get Product Failed' }));
      dispatch(getErrors(err.response.data, err.response.status))
  });
}

