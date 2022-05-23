import {
  GET_CALENDAR,
  CALENDAR_ERROR,
  CLEAR_CALENDAR,
  UPDATE_CALENDAR,
  GET_CALENDARS,
  CALENDAR_LOADING,
} from "../actions/types";

const initialState = {
  calendar: null,
  calendars: [],
  loading: true,
  error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CALENDAR:
      return {
        ...state,
        calendar: payload,
        loading: false,
      };
    case CALENDAR_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_CALENDARS:
      return {
        ...state,
        calendars: payload,
        loading: false,
      };

    case UPDATE_CALENDAR:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case CALENDAR_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_CALENDAR:
      return {
        ...state,
        calendar: null,
        loading: false,
      };

    default:
      return state;
  }
}
