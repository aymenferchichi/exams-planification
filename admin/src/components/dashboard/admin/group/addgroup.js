import React, { useState } from "react";
import { createGroup } from "../../../../actions/group";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Addgroup = ({ createGroup, history }) => {
  const [formData, setFormData] = useState({
    Name: "",
    Number_of_students: "",
  });
 
  const { Name, Number_of_students } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createGroup(formData, history, true);
  };
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
                class="flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-600 transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 mr-4 text-indigo-600 hover:text-indigo-600 transition duration-200"
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
                class="flex items-center text-sm font-semibold text-gray-500 hover:text-indigo-600 transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 mr-4 text-gray-400 hover:text-indigo-600 transition duration-200"
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
          <form
            class="bg-white p-10 rounded-lg shadow-lg "
            onSubmit={(e) => onSubmit(e)}
          >
            <h1 class="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">
              Ajouter groupe
            </h1>
            <div>
              <label class="text-gray-800 font-semibold block my-3 text-md">
                Nom du groupe
              </label>
              <input
                class="w-full bg-gray-100 px-2 py-1 rounded-lg focus:outline-none"
                type="text"
                name="Name"
                value={Name}
                placeholder="Nom du groupe"
                onChange={(e) => onChange(e)}
              />
            </div>
            <div>
              <label class="text-gray-800 font-semibold block my-3 text-md">
                Nombre d'étudiants
              </label>
              <input
                class="w-full bg-gray-100 px-4 py-1 rounded-lg focus:outline-none"
                type="text"
                name="Number_of_students"
                value={Number_of_students}
                placeholder="Nombre d'étudiants"
                onChange={(e) => onChange(e)}
              />
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

Addgroup.propTypes = {
  createGroup: PropTypes.func.isRequired,
};

export default connect(null, { createGroup })(Addgroup);
