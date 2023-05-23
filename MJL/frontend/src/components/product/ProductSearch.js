import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Container, Spinner} from 'react-bootstrap';
import {getAllProductsCode, getSpecificProductX} from '../../actions/productAction';
import Select from 'react-select';

import '../styles/product.css';

export class ProductSearch extends Component {

  constructor(props){
      super(props);
      this.state = {
        kode: '',
        view: false
      }   
      this.viewProduct = this.viewProduct.bind(this);
      this.changeProduct = this.changeProduct.bind(this);
  }

  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    products_code: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    getAllProductsCode: PropTypes.func.isRequired,
    getSpecificProductX: PropTypes.func.isRequired,
    };

  viewProduct(code){
    this.props.getSpecificProductX(code, this.props.user.id)
    this.setState({
      view: true
    })
  }

  changeProduct(e){
    this.setState({
      kode: e.kode
    })
  }

  componentDidMount(){
      this.props.getAllProductsCode(this.props.user.id);
  }

  onSubmit = (e) => {
    e.preventDefault(); // prevent the case where no input has been made
    const {kode} = this.state
    if (kode != ''){
      this.props.getSpecificProductX(kode, this.props.user.id)
      this.setState({
        view: true
      })
    }
  };

  render() {
    const {view} = this.state;
    const isLoading = this.props.isLoading;
    const products_code = this.props.products_code;
    const groups = this.props.user.groups
    const style = { position: "fixed", top: "50%", left: "50%"};
    if (isLoading){
        return (
            <Spinner animation="border" role="status" variant="primary" style={style}>
                <span className="visually-hidden"></span>
            </Spinner>
        )
    } else {
        if (view){
            return <Redirect to= "/product-details" />
        } else {
            return (
                <div>
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <span className="pageText">
                        <strong> Product Search </strong>
                    </span>
                    {this.props.user.groups.includes("manager") ? (
                      <div>
                      <div className="navbar-collapse navigationBar" id="navbarTogglerDemo01">
                          <ul className=" pageNavigation navbar-nav ">
                          <li>
                              <Link to="/add-product" className=" pageNavigationItem nav-link ">
                              Add Product
                              </Link>
                          </li>
                          </ul>
                      </div>
                      </div>
                    ):(
                      <div/>
                    )}
                  
                    </nav>
                    <div className="headerLine"> </div>
                    <Container className="productFormDiv border" style={{'width' : '400px'}}>
                        <form onSubmit={this.onSubmit} style={{'marginTop':"10px", 'marginBottom':'10px'}}>
                            <div className="ProductSerchDiv">
                                <div>
                                    <label>Kode: </label>
                                </div>
                            
                                <div className="">
                                    <Select
                                        className="basic-single invoiceProductField"
                                        classNamePrefix="select"
                                        options={products_code}
                                        isClearable={true}
                                        isSearchable={true}
                                        placeholder="---------"
                                        onChange={this.changeProduct}
                                        getOptionLabel={(x) => x.kode}
                                        getOptionValue={(x) => x.kode}
                                        required={true}
                                    />
                                </div>
                            </div>
    
                            <div className="center" style={{'marginTop':'35px'}}>
                                <button type="submit"
                                className=" viewProductButton"
                                >
                                Search
                                </button>
                            </div>
    
                        </form>
                    </Container>
                </div>
                )   
        }
    }
  }
}

const mapStateToProps = (state) => ({
    isLoading: state.product.isLoading,
    products_code: state.product.products_code,
    user: state.auth.user,
});

export default connect(mapStateToProps, {getAllProductsCode, getSpecificProductX})(ProductSearch);
