import {
    SET_TERMINAL,
    GETTING_ALL_TERMINAL,
    GET_ALL_TERMINAL_SUCCESS,
    GET_ALL_TERMINAL_FAILED,
    GET_SPECIFIC_TERMINAL,
    GET_SPECIFIC_TERMINAL_SUCCESS,
    GET_SPECIFIC_TERMINAL_FAILED,
    GETTING_TERMINAL_SUMMARY,
    GET_SUMMARY_SUCCESS,
    GET_SUMAMRY_FAILED,
} from '../actions/types';

const temp = {terminal : '', saldo_awal : '', saldo_akhir: '',
             total_regular: '', total_void: '', total_transfer: ''}
const report = {report: temp, void_invoices: []}

const initialState = {
    
    terminal : localStorage.getItem('terminal'),
    terminals : [],
    isLoading : false,
    report: report,
};

export default function (state = initialState, action) {
    switch (action.type) {

        case SET_TERMINAL:
            localStorage.setItem('terminal', action.payload)
            return {
                ...state
            }

        case GETTING_TERMINAL_SUMMARY:
        case GETTING_ALL_TERMINAL:
        case GET_SPECIFIC_TERMINAL:
            return {
                ...state,
                isLoading: true
            }
    
        case GET_SUMMARY_SUCCESS:
            return {
                ...state,
                report: action.payload.report,
                isLoading: false,
            }

        case GET_ALL_TERMINAL_SUCCESS:
            return{
                ...state,
                terminals: action.payload,
                isLoading: false
            }

        case GET_SPECIFIC_TERMINAL_SUCCESS:
            return{
                ...state,
                terminal: action.payload,
                isLoading: false,
            }

        case GET_ALL_TERMINAL_FAILED:
        case GET_SUMAMRY_FAILED:
        case GET_SPECIFIC_TERMINAL_FAILED:
            return{
                ...state,
                isLoading: false
            }

        default:
            return state;
    }
}