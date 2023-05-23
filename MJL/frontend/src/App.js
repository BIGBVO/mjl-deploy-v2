import React, {Component, Fragment} from 'react';
import ReactDom from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import {Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import Header from './components/layout/Header';
import Alerts from './components/layout/Alerts';

import LoginK1 from './components/auth/LoginK1';
import SalesRoute from './components/auth/SalesRoute';
import ManagerRoute from './components/auth/ManagerRoute';

import ProductSearch from './components/product/ProductSearch';
import ProductDetails from './components/product/ProductDetails';
import AddProductCategory from './components/product/AddProductCategory';
import AddProduct from './components/product/AddProduct';
import EditProduct from './components/product/EditProduct';

import AddSupplier from './components/supplier/AddSupplier';

import RegularEceranInvoice from './components/eceranInvoice/RegularEceranInvoice';
import VoidEceranInvoice from './components/eceranInvoice/VoidEceranInvoice';
import EceranInvoiceSearch from './components/eceranInvoice/EceranInvoiceSearch'
import EceranInvoiceDetails from './components/eceranInvoice/EceranInvoiceDetails';

import SetTerminal from './components/terminal/SetTerminal';
import TerminalSummary from './components/terminal/TerminalSummary';
import ResetTerminal from './components/terminal/ResetTerminal';

import ReportDetails from './components/report/ReportDetails';

import { Provider } from 'react-redux';
import store from './store'

// Alert Options
const alertSettings = {
    timeout: 2500,
    position: 'top center',
  };

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertSettings}>
                <Router>
                    <Fragment>
                        <Header />
                        <Alerts />
                        <div>
                            <Switch>
                                <Route exact path="/login709" component={LoginK1} />     
                                <SalesRoute exact path="/" component={ProductSearch}/>
                                <SalesRoute exact path="/product-details" component={ProductDetails}/>
                                <SalesRoute exact path="/regular-eceran-invoice" component={RegularEceranInvoice}/>
                                <SalesRoute exact path="/void-eceran-invoice" component={VoidEceranInvoice}/>
                                <SalesRoute exact path="/eceran-invoice-search" component={EceranInvoiceSearch}/>
                                <SalesRoute exact path="/eceran-invoice-details" component={EceranInvoiceDetails}/>
                                <ManagerRoute exact path="/add-supplier" component={AddSupplier}/>
                                <ManagerRoute exact path="/add-category" component={AddProductCategory}/>
                                <ManagerRoute exact path="/add-product" component={AddProduct}/>
                                <ManagerRoute exact path="/edit-product" component={EditProduct}/>
                                <ManagerRoute exact path="/set-terminal" component={SetTerminal}/>
                                <ManagerRoute exact path="/terminal-summary" component={TerminalSummary}/>
                                <ManagerRoute exact path="/terminal-reset" component={ResetTerminal}/>
                                <ManagerRoute exact path="/report-details" component={ReportDetails}/>
                            </Switch>
                        </div>
                    </Fragment>
                </Router>
                </AlertProvider>
            </Provider>
        )
    }
}

ReactDom.render(<App />, document.getElementById('app'))