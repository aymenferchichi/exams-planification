import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../App.css";
import DashboardSupervisor from "../components/dashboard/supervisor/dashboardSupervisor";
import store from "../store";
import setAuthToken from "../utils/setAuthToken";
import LoginS from "../components/auth/Supervisor/Login";
import PrivateRoute from "../routing/privateroute";
import { Provider } from "react-redux";
import { loadUserS } from "../actions/authS";
import RegisterS from "../components/auth/Supervisor/Register";

if (localStorage.tokenS) {
  setAuthToken(localStorage.tokenS);
}
const Supervisor = () => {
  useEffect(() => {
    store.dispatch(loadUserS());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path="/supervisor/login" component={LoginS} />
            <Route exact path="/supervisor/register" component={RegisterS} />
            <PrivateRoute
              exact
              path="/supervisor/dashboard"
              component={DashboardSupervisor}
            />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default Supervisor;
