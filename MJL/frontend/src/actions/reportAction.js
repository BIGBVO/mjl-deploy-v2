import axios from 'axios';
import {getErrors} from './alertAction'
import { tokenConfig } from './authAction';
import {CREATING_REPORT, CREATE_REPORT_SUCCESS, 
        CREATE_REPORT_FAILED} from './types'

export const createReport = (data) => (dispatch, getState) => {
    dispatch({type: CREATING_REPORT})
    axios
    .post(`/api/eceran-daily-report/create`, data, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: CREATE_REPORT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: CREATE_REPORT_FAILED,
      })
      dispatch(getErrors(err.response.data, err.response.status))});
}