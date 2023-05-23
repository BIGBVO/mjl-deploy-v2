import {
    GETTING_ALL_SUPPLIERS_NAME,
    GET_ALL_SUPPLIERS_NAME_SUCCESS,
    GET_ALL_SUPPLIERS_NAME_FAIL,
    ADD_SUPPLIER,
    ADD_SUPPLIER_SUCCESS,
    ADD_SUPPLIER_FAIL,
} from '../actions/types.js';

//products reducer
const initialState = {
    suppliers_name: [],
    isLoading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {

    case ADD_SUPPLIER:
    case GETTING_ALL_SUPPLIERS_NAME:
        return {
        ...state,
        isLoading: true,
        };

    case GET_ALL_SUPPLIERS_NAME_SUCCESS:
        return {
        ...state,
        suppliers_name: action.payload,
        isLoading: false,
        };

    case ADD_SUPPLIER_SUCCESS:
    case ADD_SUPPLIER_FAIL:
    case GET_ALL_SUPPLIERS_NAME_FAIL:
        return {
        ...state,
        isLoading: false,
        }

    default:
        return state;
    }
}
