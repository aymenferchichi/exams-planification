import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_RECLAMATION,
  RECLAMATION_ERROR,
  CLEAR_RECLAMATION,
  UPDATE_RECLAMATION,
  GET_RECLAMATIONS,
  RECLAMATION_LOADING,
} from "./types";
export const getReclamations = () => async (dispatch) => {
  dispatch({ type: RECLAMATION_LOADING });

  try {
    const res = await axios.get("/api/reclamation");

    dispatch({
      type: GET_RECLAMATIONS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: RECLAMATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getCurrentReclamation = (id) => async (dispatch) => {
  dispatch({ type: RECLAMATION_LOADING });

  try {
    const res = await axios.get(`/api/reclamation/${id}`);

    dispatch({
      type: GET_RECLAMATION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: RECLAMATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createReclamation =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/api/reclamation", formData, config);
      dispatch({
        type: GET_RECLAMATION,
        payload: res.data,
      });

      dispatch(setAlert("Reclamation Successfully Created", "success"));

      if (!edit) {
        history.push("/dashboard");
      }
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: RECLAMATION_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

export const deleteReclamation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/reclamation/${id}`);

    dispatch({
      type: UPDATE_RECLAMATION,
      payload: res.data,
    });
    dispatch(getReclamations);
    dispatch(setAlert("Experience Successfully Deleted", "success"));
  } catch (err) {
    dispatch({
      type: RECLAMATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const reponseReclamation = (formData, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(`/api/reclamation/${id}`, formData, config);

    dispatch({
      type: GET_RECLAMATION,
      payload: res.data,
    });

    dispatch(setAlert("Réponse envoyé", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: RECLAMATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
