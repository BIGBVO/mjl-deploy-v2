import React from "react";
import {Link, Redirect} from 'react-router-dom';

const SideBar = ({ openClass }) => {
  return (
    <nav className={openClass === "open" ? "openSidebar nav" : "nav"}>
      <ul className="navlist">
        <li className="dpdwn">
          <a>Eceran</a>
          <ul>
            <li>
              <Link to="/regular-eceran-invoice" className=" menu-item  ">
                - Regular
              </Link>
            </li>
            <li>
              <Link to="/void-eceran-invoice" className=" menu-item  ">
                - Void
              </Link>
            </li>
            <li>
              <Link to="/eceran-invoice-search" className=" menu-item  ">
                - Search
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
