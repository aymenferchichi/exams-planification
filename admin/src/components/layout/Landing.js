import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <div className="flex justify-center mt-8">
            <Link
              to="/admin/login"
              className="btn py-1 mx-2 text-lg font-bold text-white transition-colors bg-indigo-600 rounded hover:bg-indigo-500"
            >
              login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
