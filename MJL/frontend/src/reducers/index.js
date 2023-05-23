import { combineReducers } from 'redux';
import auth from './auth';
import message from './alerts/message';
import error from './alerts/error';
import product from './product';
import supplier from './supplier';
import eceranInvoice from './eceranInvoice';
import terminal from './terminal';
import report from './report';

//Index page to combine all reducers to state
export default combineReducers({
    auth,
    message,
    error,
    product,
    supplier,
    eceranInvoice,
    terminal,
    report
});
