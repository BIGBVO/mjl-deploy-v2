import {
    CREATING_REPORT,
    CREATE_REPORT_SUCCESS,
    CREATE_REPORT_FAILED
} from '../actions/types';

const temp = {  id : '',
                user: '',
                terminal : '',
                jam: '',
                tanggal: '', 
                saldo_awal : '', 
                saldo_akhir: '',
                total_regular: '', 
                total_void: '',
                total_pengeluaran: '', 
                total_transfer: '',
                penarikan: ''}
                
const report = {report: temp, void_invoices: []}

const initialState = {
    isLoading : false,
    report: report,
};

export default function (state = initialState, action) {
    switch (action.type) {

        case CREATING_REPORT:
            return {
                ...state,
                isLoading: true
            }
    
        case CREATE_REPORT_SUCCESS:
            return {
                ...state,
                report: action.payload.report,
                isLoading: false,
            }

        case CREATE_REPORT_FAILED:
            return{
                ...state,
                isLoading: false
            }

        default:
            return state;
    }
}