import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { register } from "../../../actions/authS";
import { setAlert } from "../../../actions/alert";

const RegisterA = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    charge: "",
    password: "",
    confirmPassword: "",
  });
  const { first_name, last_name, email, charge, password, confirmPassword } =
    formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert("passwords not match", "danger");
    } else {
      register({ first_name, last_name, email, charge, password });
    }
  };
  if (isAuthenticated) {
    return <Navigate to="/supervisor/dashboard" />;
  }
  return (
    <div className=" landing ">
      <div className="relative min-h-screen flex flex-col sm:justify-center items-center dark-overlay">
        <div className="relative sm:max-w-sm w-full">
          <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
          <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
          <div className="relative w-full rounded-3xl  px-6 py-4 bg-white ">
            <label className="block mt-3 text-sm text-gray-700 text-center font-semibold">
              Register
            </label>
            <form className="mt-10" onSubmit={(e) => onSubmit(e)}>
              <div>
                <label className="block mt-3 text-sm text-gray-700 font-semibold">
                  First Name
                </label>
                <input
                  name="first_name"
                  value={first_name}
                  onChange={(e) => onChange(e)}
                  type="text"
                  placeholder="first name"
                  className="mt-1 block w-full  bg-white h-11 rounded shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>

              <div className="mt-7">
                <label className="block mt-3 text-sm text-gray-700 font-semibold">
                  last Name
                </label>
                <input
                  name="last_name"
                  value={last_name}
                  onChange={(e) => onChange(e)}
                  type="text"
                  placeholder="last name"
                  className="mt-1 block w-full  bg-white h-11 rounded shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>

              <div className="mt-7">
                <label className="block mt-3 text-sm text-gray-700 font-semibold">
                  Email
                </label>
                <input
                  name="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                  type="text"
                  placeholder="email"
                  className="mt-1 block w-full  bg-white h-11 rounded shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>
              <div className="mt-7">
                <label className="block mt-3 text-sm text-gray-700 font-semibold">
                  Function
                </label>
                <input
                  name="charge"
                  value={charge}
                  onChange={(e) => onChange(e)}
                  type="text"
                  placeholder="function"
                  className="mt-1 block w-full  bg-white h-11 rounded shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>
              <div className="mt-7">
                <label className="block mt-3 text-sm text-gray-700 font-semibold">
                  Password
                </label>
                <input
                  name="password"
                  value={password}
                  onChange={(e) => onChange(e)}
                  type="password"
                  placeholder="password"
                  className="mt-1 block w-full  bg-white h-11 rounded shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>

              <div className="mt-7">
                Confirm Password
                <input
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => onChange(e)}
                  type="password"
                  placeholder="confirm password"
                  className="mt-1 block w-full  bg-white h-11 rounded shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-7 py-4 bg-blue-400 hover:bg-blue-600 rounded text-sm font-bold text-gray-50 transition duration-200"
              >
                Confirm
              </button>

              <div className="mt-7">
                <div className="flex justify-center items-center">
                  <label className="mr-2">already have account</label>
                  <a
                    href="/admin/login"
                    className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                  >
                    sign in
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

RegisterA.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToPorps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToPorps, { setAlert, register })(RegisterA);
