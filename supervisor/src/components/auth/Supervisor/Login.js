import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../../actions/authS";
import { Navigate } from "react-router-dom";

const LoginS = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  // redirect if logged in

  if (isAuthenticated) {
    return <Navigate to="/supervisor/dashboard" />;
  }
  return (
    <Fragment>
      <div className=" landing ">
        <div className="relative min-h-screen flex flex-col sm:justify-center items-center dark-overlay">
          <div className="relative sm:max-w-sm w-full">
            <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
            <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
            <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
              <label
                htmlFor=""
                className="block mt-3 text-sm text-gray-700 text-center font-semibold"
              >
                welcome
              </label>
              <form className="mt-10" onSubmit={(e) => onSubmit(e)}>
                <div>
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    className="mt-1 block w-full  bg-white h-11 rounded shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                    value={email}
                    onChange={(e) => onChange(e)}
                    required
                  />
                </div>

                <div className="mt-7">
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    className="mt-1 block w-full  bg-white h-11 rounded shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                    value={password}
                    onChange={(e) => onChange(e)}
                    minLength="6"
                  />
                </div>

                <div className="mt-7">
                  <button
                    type="submit"
                    className="w-full  py-4 bg-blue-400 hover:bg-blue-600 rounded text-sm font-bold text-gray-50 transition duration-200"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

login.PropTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToPorps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToPorps, { login })(LoginS);
