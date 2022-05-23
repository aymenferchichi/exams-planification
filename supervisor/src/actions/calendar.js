import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_CALENDAR,
  CALENDAR_ERROR,
  CLEAR_CALENDAR,
  UPDATE_CALENDAR,
  GET_CALENDARS,
  CALENDAR_LOADING,
} from "./types";

export const getCalendar = () => async (dispatch) => {
  dispatch({ type: CALENDAR_LOADING });

  try {
    const res = await axios.get("/api/calendar");

    dispatch({
      type: GET_CALENDARS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CALENDAR_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createCalendar =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/api/calendar", formData, config);
      dispatch({
        type: GET_CALENDAR,
        payload: res.data,
      });

      dispatch(setAlert("Calendar Successfully Created", "success"));

      if (!edit) {
        history.push("/dashboard");
      }
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: CALENDAR_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

export const deleteCalendar = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/calendar/${id}`);

    dispatch({
      type: UPDATE_CALENDAR,
      payload: res.data,
    });
    dispatch(getCalendar);
    dispatch(setAlert("Experience Successfully Deleted", "success"));
  } catch (err) {
    dispatch({
      type: CALENDAR_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
