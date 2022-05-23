import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_EXAM,
  EXAM_ERROR,
  CLEAR_EXAM,
  UPDATE_EXAM,
  GET_EXAMS,
  EXAM_LOADING,
} from "./types";

export const getExams = () => async (dispatch) => {
  dispatch({ type: EXAM_LOADING });

  try {
    const res = await axios.get("/api/exams");

    dispatch({
      type: GET_EXAMS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EXAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createExam =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/api/exams", formData, config);
      dispatch({
        type: GET_EXAM,
        payload: res.data,
      });

      dispatch(setAlert("Exam Successfully Created", "success"));

      if (!edit) {
        history.push("/dashboard");
      }
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: EXAM_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

export const deleteExam = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/exams/${id}`);

    dispatch({
      type: UPDATE_EXAM,
      payload: res.data,
    });
    dispatch(getExams);
    dispatch(setAlert("Experience Successfully Deleted", "success"));
  } catch (err) {
    dispatch({
      type: EXAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const editExam = (formData, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(`/api/exams/${id}`, formData, config);

    dispatch({
      type: GET_EXAM,
      payload: res.data,
    });

    dispatch(setAlert("Group successfully updated", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: EXAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getCurrentExam = (id) => async (dispatch) => {
  dispatch({ type: EXAM_LOADING });

  try {
    const res = await axios.get(`/api/exams/${id}`);

    dispatch({
      type: GET_EXAM,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EXAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
