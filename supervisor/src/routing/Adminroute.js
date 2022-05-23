import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../App.css";
import LoginA from "../components/auth/Admin/Login";
import DashboardAdmin from "../components/dashboard/admin/dashboardAdmin";
import Calendrier from "../components/dashboard/admin/calendar/calendar";
import Examen from "../components/dashboard/admin/exam/examen";
import Addexam from "../components/dashboard/admin/exam/addexam";
import Editexam from "../components/dashboard/admin/exam/editexam";
import Group from "../components/dashboard/admin/group/group";
import Addgroup from "../components/dashboard/admin/group/addgroup";
import Editgroup from "../components/dashboard/admin/group/editgroup";
import Salle from "../components/dashboard/admin/salle/salle";
import Editsalle from "../components/dashboard/admin/salle/editsalle";
import Addsalle from "../components/dashboard/admin/salle/addsalle";
import Settings from "../components/dashboard/admin/settings/settings";
import store from "../store";
import RegisterA from "../components/auth/Admin/Register";
import { Provider } from "react-redux";
import setAuthToken from "../utils/setAuthToken";
import PrivateRoute from "../routing/privateroute";
import { loadUserA } from "../actions/authA";

if (localStorage.tokenA) {
  setAuthToken(localStorage.tokenA);
}
const Admin = () => {
  useEffect(() => {
    store.dispatch(loadUserA());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path="/admin/login" component={LoginA} />
            <Route exact path="/admin/register" component={RegisterA} />

            <PrivateRoute
              exact
              path="/admin/dashboard"
              component={DashboardAdmin}
            />
            <PrivateRoute exact path="/admin/calendar" component={Calendrier} />
            <PrivateRoute exact path="/admin/examen" component={Examen} />
            <PrivateRoute exact path="/admin/examen/add" component={Addexam} />
            <PrivateRoute
              exact
              path="/admin/examen/edit"
              component={Editexam}
            />
            <PrivateRoute exact path="/admin/groupe" component={Group} />
            <PrivateRoute exact path="/admin/groupe/add" component={Addgroup} />
            <PrivateRoute
              exact
              path="/admin/groupe/edit"
              component={Editgroup}
            />
            <PrivateRoute exact path="/admin/salle" component={Salle} />
            <PrivateRoute
              exact
              path="/admin/salle/edit"
              component={Editsalle}
            />
            <PrivateRoute exact path="/admin/salle/add" component={Addsalle} />
            <PrivateRoute exact path="/admin/settings" component={Settings} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default Admin;
