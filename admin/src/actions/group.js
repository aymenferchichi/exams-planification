import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_GROUP,
  GROUP_ERROR,
  CLEAR_GROUP,
  UPDATE_GROUP,
  GET_GROUPS,
  GROUP_LOADING,
} from "./types";

export const getGroups = () => async (dispatch) => {
  dispatch({ type: GROUP_LOADING });

  try {
    const res = await axios.get("/api/group");

    dispatch({
      type: GET_GROUPS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createGroup =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/api/group", formData, config);
      dispatch({
        type: GET_GROUP,
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
        type: GROUP_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

export const deleteGroup = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/group/${id}`);

    dispatch({
      type: UPDATE_GROUP,
      payload: res.data,
    });
    dispatch(getGroups);
    dispatch(setAlert("Experience Successfully Deleted", "success"));
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const editGroup = (formData, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(`/api/group/${id}`, formData, config);

    dispatch({
      type: GET_GROUP,
      payload: res.data,
    });

    dispatch(setAlert("Group successfully updated", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getCurrentGroup = (id) => async (dispatch) => {
  dispatch({ type: GROUP_LOADING });

  try {
    const res = await axios.get(`/api/group/${id}`);

    dispatch({
      type: GET_GROUP,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
