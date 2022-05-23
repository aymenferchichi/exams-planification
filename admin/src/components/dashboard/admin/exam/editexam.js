import React, { useState, useEffect } from "react";
import { editExam, getCurrentExam } from "../../../../actions/exam";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const Editexam = ({
  exam: { exam, loading },
  getCurrentExam,
  editExam,
  history,
}) => {
  const [formData, setFormData] = useState({
    Exam_code: "",
    Name_exam: "",
    Duration: "",
    Start_time: "",
  });
  const { id } = useParams();
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    editExam(formData, id, history, true);
  };
  useEffect(() => {
    getCurrentExam(id);
  }, []);
  useEffect(() => {
    setFormData({
      Exam_code: loading || !exam?.Exam_code ? "" : exam.Exam_code,
      Name_exam: loading || !exam?.Name_exam ? "" : exam.Name_exam,
      Duration: loading || !exam?.Duration ? "" : exam.Duration,
      Start_time: loading || !exam?.Start_time ? "" : exam.Start_time,
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
                class="flex items-center text-sm font-semibold text-indigo-600  hover:text-indigo-600 transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 mr-4 text-indigo-600  hover:text-indigo-600 transition duration-200"
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
              Modifier examen
            </h1>
            <div>
              <label class="text-gray-800 font-semibold block my-3 text-md">
                Examen
              </label>
              <input
                class="w-full bg-gray-100 px-2 py-1 rounded-lg focus:outline-none"
                type="text"
                name="Name_exam"
                id="Name_exam"
                value={formData.Name_exam}
                placeholder="Examen"
                onChange={(e) => onChange(e)}
              />
            </div>
            <div>
              <label class="text-gray-800 font-semibold block my-3 text-md">
                Code
              </label>
              <input
                class="w-full bg-gray-100 px-4 py-1 rounded-lg focus:outline-none"
                type="text"
                name="Exam_code"
                id="Exam_code"
                value={formData.Exam_code}
                placeholder="Code"
                onChange={(e) => onChange(e)}
              />
            </div>
            <div>
              <label class="text-gray-800 font-semibold block my-3 text-md">
                Durée
              </label>
              <input
                class="w-full bg-gray-100 px-4 py-1 rounded-lg focus:outline-none"
                type="text"
                name="Duration"
                id="Duration"
                value={formData.Duration}
                placeholder="Durée"
                onChange={(e) => onChange(e)}
              />
            </div>
            <div>
              <label class="text-gray-800 font-semibold block my-3 text-md">
                Départ
              </label>
              <input
                class="w-full bg-gray-100 px-4 py-1 rounded-lg focus:outline-none"
                type="text"
                name="Start_time"
                id="Start_time"
                value={formData.Start_time}
                placeholder="Départ"
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

Editexam.propTypes = {
  editExam: PropTypes.func.isRequired,
  getCurrentExam: PropTypes.func.isRequired,
  exam: PropTypes.object.isRequired,
};
const mapstatetoprops = (state) => ({
  exam: state.exam,
});
export default connect(mapstatetoprops, { editExam, getCurrentExam })(Editexam);
