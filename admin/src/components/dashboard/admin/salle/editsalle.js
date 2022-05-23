import React, { useState, useEffect } from "react";
import { editSalle, getCurrentSalle } from "../../../../actions/salle";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const Editsalle = ({
  salle: { salle, loading },
  getCurrentSalle,
  editSalle,
  history,
}) => {
  const [formData, setFormData] = useState({
    number: "",
    Nbr_places: "",
    available: "",
  });
  const { id } = useParams();
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    editSalle(formData, id, history, true);
  };
  useEffect(() => {
    getCurrentSalle(id);
  }, []);
  useEffect(() => {
    setFormData({
      number: loading || !salle?.number ? "" : salle.number,
      Nbr_places: loading || !salle?.Nbr_places ? "" : salle.Nbr_places,
      available: loading || !salle?.available ? "" : salle.available,
    });
  }, [loading]);
  return (
    <div class="min-h-screen flex">
      <div class="py-12 px-10 w-1/5">
        <div class="flex space-2 items-center border-b-2 pb-4">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-14 w-14 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            ></svg>
          </div>
          <div class="ml-3">
            <h1 class="text-3xl font-bold text-indigo-600">Explan</h1>
            <p class="text-center text-sm text-indigo-600 mt-1 font-serif">
              DASHBOARD
            </p>
          </div>
        </div>
        <a
          href="/admin/dashboard"
          class="flex items-center space-x-4 mt-6 p-2 bg-indigo-600 rounded-md"
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            ></svg>
          </div>
          <div>
            <p class="text-lg text-white font-semibold">Tableau de bord</p>
          </div>
        </a>
        <div class="mt-8">
          <ul class="space-y-10">
            <li>
              <a
                href="/admin/reclamation"
                className="flex items-center text-sm font-semibold text-gray-500 hover:text-indigo-600 transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-4 text-gray-400 hover:text-indigo-600 transition duration-200"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                ></svg>
                Reclamation
              </a>
            </li>
            <li>
              <a
                href="/admin/groupe"
                class="flex items-center text-sm font-semibold text-gray-500 hover:text-indigo-600 transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 mr-4 text-gray-400 hover:text-indigo-600 transition duration-200"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                ></svg>
                Groupe
              </a>
            </li>
            <li>
              <a
                href="/admin/examen"
                class="flex items-center text-sm font-semibold text-gray-500 hover:text-indigo-600 transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 mr-4 text-gray-400 hover:text-indigo-600 transition duration-200"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                ></svg>
                Examen
              </a>
            </li>

            <li>
              <a
                href="/admin/salle"
                class="flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-600 transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 mr-4 text-indigo-600 hover:text-indigo-600 transition duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                ></svg>
                Salles
              </a>
            </li>
            <li>
              <a
                href="/admin/settings"
                class="flex items-center text-sm font-semibold text-gray-500 hover:text-indigo-600 transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 mr-4 text-gray-400 hover:text-indigo-600 transition duration-200"
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
      <div class="bg-indigo-50 flex-grow py-12 px-4">
        <div class="  w-1/2 ">
          <form class="bg-white p-10 rounded-lg shadow-lg ">
            <h1 class="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">
              Modifier salle
            </h1>
            <div>
              <label class="text-gray-800 font-semibold block my-3 text-md">
                Numero de salle
              </label>
              <input
                class="w-full bg-gray-100 px-4 py-1 rounded-lg focus:outline-none"
                type="text"
                name="number"
                id="number"
                value={formData.number}
                placeholder="Numero de salle"
                onChange={(e) => onChange(e)}
              />
            </div>
            <div>
              <label class="text-gray-800 font-semibold block my-3 text-md">
                Nombre de places
              </label>
              <input
                class="w-full bg-gray-100 px-2 py-1 rounded-lg focus:outline-none"
                type="text"
                name="Nbr_places"
                id="Nbr_places"
                value={formData.Nbr_places}
                placeholder="Nombre de places"
                onChange={(e) => onChange(e)}
              />
            </div>
            <div>
              <label class="text-gray-800 font-semibold block my-3 text-md">
                Satut
              </label>
              <select
                class="w-full bg-gray-100 px-2 py-1 rounded-lg focus:outline-none"
                type="select"
                name="available"
                id="available"
                value={formData.available}
                onChange={(e) => onChange(e)}
              >
                <option>available</option>
                <option>reserved</option>
              </select>
            </div>

            <button
              type="submit"
              class="w-full mt-6 bg-indigo-600 rounded-lg px-4 py-1 text-lg text-white tracking-wide font-semibold font-sans"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

Editsalle.propTypes = {
  editSalle: PropTypes.func.isRequired,
  getCurrentSalle: PropTypes.func.isRequired,
  salle: PropTypes.object.isRequired,
};
const mapstatetoprops = (state) => ({
  salle: state.salle,
});
export default connect(mapstatetoprops, { editSalle, getCurrentSalle })(
  Editsalle
);
