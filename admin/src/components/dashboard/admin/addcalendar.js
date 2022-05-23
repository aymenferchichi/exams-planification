import React, { useState, useEffect } from "react";
import { createCalendar } from "../../../actions/calendar";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";

const Addcalendar = ({ createCalendar, history }) => {
  const [statesupervisors, setSupervisors] = useState([
    {
      id: "",
      first_name: "",
      last_name: "",
    },
  ]);
  const [stateexam, setExam] = useState([
    {
      id: "",
      first_name: "",
      last_name: "",
    },
  ]);
  const [stategroup, setGroup] = useState([
    {
      id: "",
      first_name: "",
      last_name: "",
    },
  ]);
  const [statesalle, setSalle] = useState([
    {
      id: "",
      first_name: "",
      last_name: "",
    },
  ]);
  const [formData, setFormData] = useState({
    Name: "",
    Day: "",
    Group: "",
    Exam: "",
    Supervisor: "",
    Salle: "",
  });

  const { Name, Day, Group, Exam, Supervisor, Salle } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createCalendar(formData, history, true);
  };

  const getsupervisors = async (event) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get("/api/auth/supervisors/", config);

    setSupervisors(res.data);
  };
  const getsalle = async (event) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get("/api/classroom/", config);

    setSalle(res.data);
  };
  const getgroupe = async (event) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get("/api/group/", config);

    setGroup(res.data);
  };
  const getexamen = async (event) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get("/api/exams/", config);

    setExam(res.data);
  };

  const setup = async () => {
    await getsupervisors();
    await getsalle();
    await getgroupe();
    await getexamen();
  };
  useEffect(() => {
    setup();
  }, []);
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
                className="flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-600 transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-4 text-indigo-600 hover:text-indigo-600 transition duration-200"
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
      <div className="bg-indigo-50 flex-grow py-12 px-4">
        <div className="  w-1/2 ">
          <form
            className="bg-white p-10 rounded-lg shadow-lg "
            onSubmit={(e) => onSubmit(e)}
          >
            <h1 className="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">
              Ajouter groupe
            </h1>
            <div>
              <label className="text-gray-800 font-semibold block my-3 text-md">
                Nom
              </label>
              <input
                className="w-full bg-gray-100 px-2 py-1 rounded-lg focus:outline-none"
                type="text"
                name="Name"
                value={Name}
                placeholder="Nom du groupe"
                onChange={(e) => onChange(e)}
              />
            </div>
            <div>
              <label className="text-gray-800 font-semibold block my-3 text-md">
                Groupe
              </label>
              <select
                className="w-full bg-gray-100 px-2 py-1 rounded-lg focus:outline-none"
                name="Group"
                value={Group}
                onChange={(e) => onChange(e)}
              >
                {" "}
                {stategroup &&
                  stategroup.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.Name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="text-gray-800 font-semibold block my-3 text-md">
                Examen
              </label>
              <select
                className="w-full bg-gray-100 px-2 py-1 rounded-lg focus:outline-none"
                name="Exam"
                value={Exam}
                onChange={(e) => onChange(e)}
              >
                {" "}
                {stateexam &&
                  stateexam.map((exam) => (
                    <option key={exam.id} value={exam.id}>
                      {exam.Name_exam}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="text-gray-800 font-semibold block my-3 text-md">
                Surveillant
              </label>
              <select
                className="w-full bg-gray-100 px-2 py-1 rounded-lg focus:outline-none"
                name="Supervisor"
                value={Supervisor}
                onChange={(e) => onChange(e)}
              >
                {" "}
                {statesupervisors &&
                  statesupervisors.map((supervisor) => (
                    <option key={supervisor.id} value={supervisor.id}>
                      {supervisor.first_name} {supervisor.last_name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="text-gray-800 font-semibold block my-3 text-md">
                Salle
              </label>
              <select
                className="w-full bg-gray-100 px-2 py-1 rounded-lg focus:outline-none"
                name="Salle"
                value={Salle}
                onChange={(e) => onChange(e)}
              >
                {" "}
                {statesalle &&
                  statesalle.map((salle) => (
                    <option key={salle.id} value={salle.id}>
                      {salle.number}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="text-gray-800 font-semibold block my-3 text-md">
                Day
              </label>
              <input
                name="Day"
                value={Day}
                className="w-full bg-gray-100 px-2 py-1 rounded-lg focus:outline-none"
                type="date"
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

Addcalendar.propTypes = {
  createCalendar: PropTypes.func.isRequired,
};

export default connect(null, { createCalendar })(Addcalendar);
