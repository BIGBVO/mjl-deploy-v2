import {
    CREATING_ECERAN_INVOICE,
    CREATE_ECERAN_INVOICE_SUCCESS,
    CREATE_ECERAN_INVOICE_FAIL,
    ECERAN_INVOICE_FINALISED,
    GETTING_SPECIFIC_ECERAN_INVOICE,
    GET_SPECIFIC_ECERAN_INVOICE_SUCCESS,
    GET_SPECIFIC_ECERAN_INVOICE_FAIL
} from '../actions/types.js';


//products reducer
const initialState = {
    invoice: null,
    isLoading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {

    case GETTING_SPECIFIC_ECERAN_INVOICE:
    case CREATING_ECERAN_INVOICE:
        return {
        ...state,
        isLoading: true,
        };

    case GET_SPECIFIC_ECERAN_INVOICE_SUCCESS:
    case CREATE_ECERAN_INVOICE_SUCCESS:
        return {
        ...state,
        invoice: action.payload.invoice,
        isLoading: false,
        };

    case GET_SPECIFIC_ECERAN_INVOICE_FAIL:
    case CREATE_ECERAN_INVOICE_FAIL:
        return {
        ...state,
        isLoading: false,
        }

    case ECERAN_INVOICE_FINALISED:
        return {
        ...state,
        invoice: null,
        isLoading: false
        }
    default:
        return state;
    }
}
