import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SET_TERMINAL,
  } from '../actions/types';
  

//auth reducers
const initialState = {
  token: null,
  terminal: null,
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {

    case LOGIN_SUCCESS:
      return {
        ...state,
        terminal: action.payload.terminal,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        token: action.payload.token,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        terminal: null,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
    };
      
    default:
      return state;
  }
}
