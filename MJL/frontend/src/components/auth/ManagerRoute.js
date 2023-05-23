import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const ManagerRoute = ({ component: Component, auth, ...rest }) => (
    // this route is for all logged in users, it defines the routes these users can access
  <Route
    {...rest}
    render={(props) => {
      if (auth.isLoading) {
        return <h2>Loading...</h2>;
      } else if (!auth.isAuthenticated) {
        return <Redirect to="/login709" />;
      } else if (auth.user.groups.includes("manager")){
        return <Component {...props} />;
      } else {
        return <Redirect to="/login709" />;
      }
    }}
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ManagerRoute);
