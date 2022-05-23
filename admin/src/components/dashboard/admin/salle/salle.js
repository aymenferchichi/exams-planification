import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { getSalles, deleteSalle } from "../../../../actions/salle";

const Salle = ({ salleData, history }) => {
  const [exam, setExam] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSalles());
  }, []);
  useEffect(() => {
    if (salleData.salles) {
      setExam(salleData.salles);
    }
  }, [salleData.loading]);
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
            <li>
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
            
          
            <li>
              <a
                href="/admin/salle"
                className="flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-600 transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-4 text-indigo-600 hover:text-indigo-600 transition duration-200"
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
      <div className="bg-indigo-50 flex-grow py-12 px-10">
        <div className="flex justify-end">
          <a
            href="/admin/salle/add"
            className="text-right font-bold bg-indigo-500 p-1 text-white rounded-lg"
          >
            {" "}
            Ajouter
          </a>
        </div>
        <div>
          <div className="mt-11 w-2xl mx-auto">
            <div className="flex flex-col">
              <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden ">
                    <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                      <thead className="bg-gray-100 dark:bg-indigo-600">
                        <tr>
                          <th scope="col" className="p-5"></th>
                          <th
                            scope="col"
                            className="w-1/3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                          >
                            Numero de salle
                          </th>
                          <th
                            scope="col"
                            className="w-1/3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                          >
                            Nombre de places
                          </th>
                          <th
                            scope="col"
                            className="w-1/3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                          >
                            Statut
                          </th>
                          <th scope="col" className="p-4">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className=" divide-y divide-gray-200 dark:bg-gray-100 dark:divide-gray-700">
                        {salleData &&
                          salleData.salles.map((g) => (
                            <tr className="hover:bg-gray-100" key={g._id}>
                              <td className="p-4 w-4"></td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap ">
                                {g.number}
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap ">
                                {g.Nbr_places}
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap ">
                                {g.available && g.available === true
                                  ? "Available"
                                  : "Reserved"}
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                <button
                                  onClick={deleteSalle(g._id)}
                                  className="text-red-500 hover:underline font-bold px-2 rounded  "
                                >
                                  Delete
                                </button>
                                <a
                                  href={`/admin/salle/edit/${g._id}`}
                                  className="text-blue-500 hover:underline font-bold px-2 rounded  "
                                >
                                  Edit
                                </a>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Salle.propTypes = {
  getSalles: PropTypes.func.isRequired,
  salleData: PropTypes.object.isRequired,
};

const mapstatetoprops = (state) => ({
  salleData: state.salle,
});

export default connect(mapstatetoprops, { getSalles })(Salle);
