import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_SALLE,
  SALLE_ERROR,
  CLEAR_SALLE,
  UPDATE_SALLE,
  GET_SALLES,
  SALLE_LOADING,
} from "./types";

export const getSalles = () => async (dispatch) => {
  dispatch({ type: SALLE_LOADING });

  try {
    const res = await axios.get("/api/classroom");

    dispatch({
      type: GET_SALLES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SALLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createSalle =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/api/classroom", formData, config);
      dispatch({
        type: GET_SALLE,
        payload: res.data,
      });

      dispatch(setAlert("Group Successfully Created", "success"));

      if (!edit) {
        history.push("/dashboard");
      }
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: SALLE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

export const deleteSalle = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/classroom/${id}`);

    dispatch({
      type: UPDATE_SALLE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Successfully Deleted", "success"));
  } catch (err) {
    dispatch({
      type: SALLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
