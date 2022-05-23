import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getCurrentReclamation,
  reponseReclamation,
} from "../../../../actions/reclamation";

const Response = ({
  reclamation: { reclamation, loading },
  getCurrentReclamation,
  reponseReclamation,
  history,
}) => {
  const [formData, setFormData] = useState({
    Name: "",
    Description: "",
    Reason: "",
    Name_Supervisor: "",
    Response: "",
  });
  const { id } = useParams();
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    reponseReclamation(formData, id, history, true);
  };

  useEffect(() => {
    getCurrentReclamation(id);
  }, []);
  useEffect(() => {
    setFormData({
      Name: loading || !reclamation?.Name ? "" : reclamation.Name,
      Description:
        loading || !reclamation?.Description ? "" : reclamation.Description,
      Name_Supervisor:
        loading || !reclamation?.Name_Supervisor
          ? ""
          : reclamation.Name_Supervisor,
    });
  }, [loading]);
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
          href="/admin/dashboard"
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
            <p className="text-lg text-white font-semibold">Tableau de bord</p>
          </div>
        </a>
        <div className="mt-8">
          <ul className="space-y-10">
            <li>
              <a
                href="/admin/reclamation"
                className="flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-600 transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-4 text-indigo-600 hover:text-indigo-600 transition duration-200"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                ></svg>
                Reclamation
              </a>
            </li>
            <li key={"group"}>
              <a
                href="/admin/groupe"
                className="flex items-center text-sm font-semibold text-gray-500 hover:text-indigo-600 transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-4 text-gray-400 hover:text-indigo-600 transition duration-200"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                ></svg>
                Groupe
              </a>
            </li>
            <li key={"exam"}>
              <a
                href="/admin/examen"
                className="flex items-center text-sm font-semibold text-gray-500 hover:text-indigo-600 transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-4 text-gray-400 hover:text-indigo-600 transition duration-200"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                ></svg>
                Examen
              </a>
            </li>

            <li key={"salle"}>
              <a
                href="/admin/salle"
                className="flex items-center text-sm font-semibold text-gray-500 hover:text-indigo-600 transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-4 text-gray-400 hover:text-indigo-600 transition duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                ></svg>
                Salles
              </a>
            </li>
            <li key={"settings"}>
              <a
                href="/admin/settings"
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
                value={formData.Name}
              />
            </div>
            <div>
              <label className="text-gray-800 font-semibold block my-3 text-md">
                Nom Surveillant
              </label>
              <input
                className="w-full bg-gray-100 px-4 py-1 rounded-lg focus:outline-none"
                type="text"
                name="Name_Supervisor"
                value={formData.Name_Supervisor}
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
                value={formData.Description}
              />
            </div>
            <div>
              <label className="text-gray-800 font-semibold block my-3 text-md">
                Réponse
              </label>
              <input
                type="text"
                className="w-full mt-2 bg-gray-100 px-4 py-1 rounded-lg focus:outline-none"
                name="Response"
                value={formData.Response}
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

Response.propTypes = {
  reponseReclamation: PropTypes.func.isRequired,
  getCurrentReclamation: PropTypes.func.isRequired,
  reclamation: PropTypes.object.isRequired,
};

const mapstatetoprops = (state) => ({
  reclamation: state.reclamation,
});
export default connect(mapstatetoprops, {
  reponseReclamation,
  getCurrentReclamation,
})(Response);
