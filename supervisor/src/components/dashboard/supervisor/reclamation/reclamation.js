import React, { useState } from "react";
import { createReclamation } from "../../../../actions/reclamation";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Reclamation = ({ createReclamation, history }) => {
  const [formData, setFormData] = useState({
    Name: "",
    Description: "",
    Reason: "",
    Name_Supervisor: "",
  });

  const { Name, Description, Reason, Name_Supervisor } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createReclamation(formData, history, true);
  };

  return (
    <div className="min-h-screen flex">
      <div className="py-12 px-10 w-1/5">
        <div className="flex space-2 items-center border-b-2 pb-4">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-14 w-14 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            ></svg>
          </div>
          <div className="ml-3">
            <h1 className="text-3xl font-bold text-indigo-600">Explan</h1>
            <p className="text-center text-sm text-indigo-600 mt-1 font-serif">
              DASHBOARD
            </p>
          </div>
        </div>
        <a
          href="/supervisor/dashboard"
          className="flex items-center space-x-4 mt-6 p-2 bg-indigo-600 rounded-md"
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            ></svg>
          </div>
          <div>
            <p className="text-lg text-white font-semibold">Dashboard</p>
          </div>
        </a>
        <div className="mt-8">
          <ul className="space-y-10">
            <li>
              <a
                href="/supervisor/settings"
                className="flex items-center text-sm font-semibold text-gray-500 hover:text-indigo-600 transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-4 text-gray-400 hover:text-indigo-600 transition duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                ></svg>
                Settings
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-indigo-50 flex-grow py-12 px-4">
        <div className="  w-1/2 ">
          <form
            className="bg-white p-10 rounded-lg shadow-lg "
            onSubmit={(e) => onSubmit(e)}
          >
            <h1 className="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">
              Ajouter Réclamation
            </h1>
            <div>
              <label className="text-gray-800 font-semibold block my-3 text-md">
                Reclamation
              </label>
              <input
                className="w-full bg-gray-100 px-4 py-1 rounded-lg focus:outline-none"
                type="text"
                placeholder="Reclamation"
                name="Name"
                value={Name}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div>
              <label className="text-gray-800 font-semibold block my-3 text-md">
                Nom Surveillant
              </label>
              <input
                className="w-full bg-gray-100 px-4 py-1 rounded-lg focus:outline-none"
                type="text"
                placeholder="Surveillant"
                name="Name_Supervisor"
                value={Name_Supervisor}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div>
              <label className="text-gray-800 font-semibold block my-3 text-md">
                Description
              </label>
              <textarea
                className="w-full bg-gray-100 px-2 py-1 rounded-lg focus:outline-none"
                type="textarea"
                name="Description"
                value={Description}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div>
              <label className="text-gray-800 font-semibold block my-3 text-md">
                Raison
              </label>
              <input
                type="file"
                className="w-full mt-2 bg-gray-100 px-4 py-1 rounded-lg focus:outline-none"
                name="Reason"
                value={Reason}
                onChange={(e) => onChange(e)}
              />
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-indigo-600 rounded-lg px-4 py-1 text-lg text-white tracking-wide font-semibold font-sans"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

Reclamation.propTypes = {
  createReclamation: PropTypes.func.isRequired,
};

export default connect(null, { createReclamation })(Reclamation);
