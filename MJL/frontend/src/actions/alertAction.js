import { GET_ERRORS, CREATE_MESSAGE } from './types';

export const getErrors = (msg) => {
    return {
      type: GET_ERRORS,
      payload: msg,
    };
  };

export const createMessage = (msg) => {
  return {
    type: CREATE_MESSAGE,
    payload: msg,
  };
};


