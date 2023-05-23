import axios from 'axios';
import { getErrors, createMessage } from './alertAction'

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from './types';

function getCookie(name) {
  let cookieValue = null;

  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();

          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));

              break;
          }
      }
  }

  return cookieValue;
}

//Perform API call for login to backend
export const login = (username, password, terminal) => (dispatch) => {
  
  const csrftoken = getCookie('csrftoken');

  // configuration needed for sending JSON when making API call to backend
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken
    },
  };

  const body = JSON.stringify({username, password, terminal });

  axios
    .post('/api/auth/login', body, config)
    .then((res) => {
      dispatch(createMessage({ loginSuccess: 'Login Successfully' }));
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(getErrors(err.response.data));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};


/*
Return the configuration needed to perform API calls that need authentication.
This function also set the configuration needed to send JSON File.
*/
export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.token;
  const csrftoken = getCookie('csrftoken');

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;
};
