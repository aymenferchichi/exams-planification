import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { getCalendar, deleteCalendar } from "../../../actions/calendar";
import { getReclamations } from "../../../actions/reclamation";

const DashboardSupervisor = ({
  calendarData,
  reclamationData,
  history,
  auth: { user },
}) => {
  const [calendar, setCalendar] = useState([]);
  const [reclam, setReclam] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCalendar());
  }, []);
  useEffect(() => {
    if (calendarData.calendars) {
      setCalendar(calendarData.calendars);
    }
  }, [calendarData.loading]);
  useEffect(() => {
    dispatch(getReclamations());
  }, []);
  useEffect(() => {
    if (reclamationData.reclamations) {
      setReclam(reclamationData.reclamations);
    }
  }, [reclamationData.loading]);
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
      <div className="bg-indigo-50 flex-grow py-12 px-10">
        <div className="flex justify-between">
          <div>
            <h4 className="text-sm font-bold text-indigo-600">
              Hi {user && user.first_name + " " + user.last_name},
            </h4>
            <h1 className="text-4xl font-bold text-indigo-900 mt-">
              Welcome to Explan!
            </h1>
          </div>
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
                            className="w-1/5  px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                          >
                            Groupe
                          </th>
                          <th
                            scope="col"
                            className="w-1/5  px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                          >
                            Examen
                          </th>
                          <th
                            scope="col"
                            className="w-1/5  px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                          >
                            Surveillant
                          </th>
                          <th
                            scope="col"
                            className="w-1/5  px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                          >
                            Date
                          </th>
                          <th
                            scope="col"
                            className="w-1/5  px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                          >
                            Salle
                          </th>
                          <th
                            scope="col"
                            className="w-1/5  px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className=" divide-y divide-gray-200 dark:bg-gray-100 dark:divide-gray-700">
                        {calendarData &&
                          calendarData.calendars.map((Calendar) => (
                            <tr
                              className="hover:bg-gray-100"
                              key={Calendar._id}
                            >
                              <td className="p-4 w-4"></td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap ">
                                {Calendar.Group}
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap ">
                                {Calendar.Exam}
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap ">
                                {Calendar.Supervisor}
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap ">
                                {Calendar.Day}
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap ">
                                {Calendar.Salle}
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap ">
                                <a
                                  href="/supervisor/reclamation"
                                  className=" bg-indigo-500 rounded text-white p-1.5"
                                >
                                  Réclamer
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
        <div className="flex flex-col mt-11">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden ">
                <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                  <thead className="bg-gray-100 dark:bg-indigo-600">
                    <tr>
                      <th scope="col" className="p-5"></th>
                      <th
                        scope="col"
                        className="w-1/4 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Reclamation
                      </th>
                      <th
                        scope="col"
                        className="w-1/4 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Surveillant
                      </th>
                      <th
                        scope="col"
                        className="w-1/4 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="w-1/4 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Raison
                      </th>
                      <th
                        scope="col"
                        className="w-1/4 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Réponse
                      </th>

                      <th scope="col" className="p-4">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className=" divide-y divide-gray-200 dark:bg-gray-100 dark:divide-gray-700">
                    {reclamationData &&
                      reclamationData.reclamations.map((g) => (
                        <tr className="hover:bg-gray-100" key={g._id}>
                          <td className="p-4 w-4"></td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap ">
                            {g.Name}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap ">
                            {g.Name_Supervisor}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap ">
                            {g.Description}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap ">
                            {g.Reason}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap ">
                            {!g.Response && !g.Response
                              ? "waiting for response"
                              : g.Response}
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
  );
};

DashboardSupervisor.propTypes = {
  getCalendar: PropTypes.func.isRequired,
  calendarData: PropTypes.object.isRequired,
  reclamationData: PropTypes.object.isRequired,
};

const mapstatetoprops = (state) => ({
  calendarData: state.calendar,
  reclamationData: state.reclamation,
  auth: state.auth,
});

export default connect(mapstatetoprops, { getCalendar })(DashboardSupervisor);
