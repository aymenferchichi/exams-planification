import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginA from "./components/auth/Admin/Login";
import DashboardAdmin from "./components/dashboard/admin/dashboardAdmin";

import Alert from "./components/layout/Alert";

import Examen from "./components/dashboard/admin/exam/examen";
import Addexam from "./components/dashboard/admin/exam/addexam";
import Editexam from "./components/dashboard/admin/exam/editexam";
import Group from "./components/dashboard/admin/group/group";
import Response from "./components/dashboard/admin/reclamation/reponse";
import Reclamation from "./components/dashboard/admin/reclamation/reclamation";
import Addgroup from "./components/dashboard/admin/group/addgroup";
import Editgroup from "./components/dashboard/admin/group/editgroup";
import Salle from "./components/dashboard/admin/salle/salle";
import Editsalle from "./components/dashboard/admin/salle/editsalle";
import Addsalle from "./components/dashboard/admin/salle/addsalle";
import Addcalendar from "./components/dashboard/admin/addcalendar";
import Settings from "./components/dashboard/admin/settings/settings";
import store from "./store";
import RegisterA from "./components/auth/Admin/Register";
import { Provider } from "react-redux";
import setAuthToken from "./utils/setAuthToken";

import PrivateRoute from "./routing/privateroute";
import { loadUser } from "./actions/authA";

import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import { LOGOUT } from "./actions/types";

const App = () => {
  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="admin/login" element={<LoginA />} />
          <Route path="admin/register" element={<RegisterA />} />
          <Route
            path="admin/dashboard"
            element={<PrivateRoute component={DashboardAdmin} />}
          />

          <Route
            path="admin/examen"
            element={<PrivateRoute component={Examen} />}
          />
          <Route
            path="admin/examen/add"
            element={<PrivateRoute component={Addexam} />}
          />
          <Route
            path="admin/examen/edit/:id"
            element={<PrivateRoute component={Editexam} />}
          />
          <Route
            path="admin/groupe"
            element={<PrivateRoute component={Group} />}
          />
          <Route
            path="admin/groupe/add"
            element={<PrivateRoute component={Addgroup} />}
          />
          <Route
            path="admin/groupe/edit/:id"
            element={<PrivateRoute component={Editgroup} />}
          />
          <Route
            path="admin/salle"
            element={<PrivateRoute component={Salle} />}
          />
          <Route
            path="admin/salle/edit/:id"
            element={<PrivateRoute component={Editsalle} />}
          />
          <Route
            path="admin/salle/add"
            element={<PrivateRoute component={Addsalle} />}
          />
          <Route
            path="admin/settings"
            element={<PrivateRoute component={Settings} />}
          />
          <Route
            path="admin/calendrier/add"
            element={<PrivateRoute component={Addcalendar} />}
          />
          <Route
            path="admin/reclamation"
            element={<PrivateRoute component={Reclamation} />}
          />
          <Route
            path="admin/reclamation/:id"
            element={<PrivateRoute component={Response} />}
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
