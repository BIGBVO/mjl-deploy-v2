import axios from 'axios';
import {getErrors, createMessage} from './alertAction'
import { tokenConfig } from './authAction';
import {GETTING_ALL_TERMINAL, GET_ALL_TERMINAL_SUCCESS, 
        GET_ALL_TERMINAL_FAILED, SET_TERMINAL,
        GETTING_TERMINAL_SUMMARY, GET_SUMMARY_SUCCESS, 
        GET_SUMAMRY_FAILED} from './types'

export const getAllTerminals = (userId) => (dispatch, getState) => {
    dispatch({type: GETTING_ALL_TERMINAL});
    axios
    .get(`/api/terminal/all-name?id=${userId}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_ALL_TERMINAL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
        dispatch({type: GET_ALL_TERMINALS_FAILED})
        dispatch(getErrors(err.response.data, err.response.status))
    });
};

export const setTerminal = (terminal) => (dispatch) => {
  dispatch({
    type: SET_TERMINAL,
    payload: terminal,
  })
  dispatch(
    createMessage({terminalSet : 'Terminal Set'})
  )
}

export const getSummary = (userId, terminal) => (dispatch, getState) => {
  dispatch({type: GETTING_TERMINAL_SUMMARY});
  axios
  .get(`/api/terminal/summary?id=${userId}&terminal=${terminal}`, tokenConfig(getState))
  .then((res) => {
    dispatch({
      type: GET_SUMMARY_SUCCESS,
      payload: res.data,
    });
  })
  .catch((err) => {
      dispatch({type: GET_SUMAMRY_FAILED})
      dispatch(getErrors(err.response.data, err.response.status))
  });
};
