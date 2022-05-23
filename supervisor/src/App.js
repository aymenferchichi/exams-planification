import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardSupervisor from "./components/dashboard/supervisor/dashboardSupervisor";
import Alert from "./components/layout/Alert";
import store from "./store";
import { Provider } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import LoginS from "./components/auth/Supervisor/Login";
import PrivateRoute from "./routing/privateroute";
import { loadUser } from "./actions/authS";
import Reclamation from "./components/dashboard/supervisor/reclamation/reclamation";
import Landing from "./components/layout/Landing";
import RegisterS from "./components/auth/Supervisor/RegisterS";
import Navbar from "./components/layout/Navbar";
import Settings from "./components/dashboard/supervisor/settings/settings";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alert />
          <Routes>
            <Route exact path="/" element={<Landing />} />

            <Route exact path="/supervisor/login" element={<LoginS />} />
            <Route exact path="/supervisor/register" element={<RegisterS />} />

            <Route
              path="/supervisor/dashboard"
              element={<PrivateRoute component={DashboardSupervisor} />}
            />
            <Route
              path="/supervisor/settings"
              element={<PrivateRoute component={Settings} />}
            />
            <Route
              path="/supervisor/reclamation"
              element={<PrivateRoute component={Reclamation} />}
            />
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
