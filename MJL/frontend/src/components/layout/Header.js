import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../styles/layout.css'

import SideBar from "./Sidebar";
import { FaList } from "react-icons/fa";

export class Header extends Component {
  
    constructor(props){
        super(props);
        this.state = {
            on : false
        }
        this.handleOn = this.handleOn.bind(this)
    }

    handleOn(){
        const {on} = this.state
        if (on){
            this.setState({
                on: false
            })
        } else {
            this.setState({
                on: true
            })
        }
    }
    static propTypes = {
    // set prop variables and functions that is needed
    auth: PropTypes.object.isRequired,
    };

  
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const {on} = this.state

    if (!isAuthenticated){ // if user is not authenticated
      return(
        <div className="titleText">
            <a className="titleT">
            MJL Super
            </a>     
            <div className="headerLine"> </div>     
        </div>
        
      )
    } else {
        return(
        <div>
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <div>
                    <aside className={on ? "to-right" : ""}>
                        <a onClick={this.handleOn}>
                            <FaList size="35" />
                        </a>
                            </aside>
                        {on && <SideBar openClass="open" />}
                </div>
                <div className="titleText">
                    <a href="#" className="titleT">
                        MJL
                    </a>    
                </div>
            </nav>
            <div className="headerLine"> </div>           
        </div>  
        )
    }
    }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { })(Header);
