import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/authA";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <div>
      <span>
        <a
          className="text-white mx-3 font-semibold text-lg cursor-pointer hover:text-indigo-600"
          onClick={logout}
          href="admin/login"
        >
          <i className="fas fa-sign-out-alt text-white"></i> Logout
        </a>
      </span>
    </div>
  );

  const guestLinks = (
    <div>
      <span className="text-white mx-3 font-semibold text-lg cursor-pointer">
        <Link className="text-white hover:text-gray-700" to="/admin/login">
          Login
        </Link>
      </span>
    </div>
  );
  return (
    <nav className="flex flex-shrink justify-between px-6 py-1 bg-gradient-to-tr from-blue-200 to-indigo-400 items-center">
      <h1>
        <Link
          className="text-2xl mx-3 hover:text-indigo-600 text-white font-bold cursor-pointer"
          to="/"
        >
          <i className="fas fa-code "></i>Explan
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks} </Fragment>
      )}
    </nav>
  );
};

Navbar.protoTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToPorps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToPorps, { logout })(Navbar);
