import {
  GET_GROUP,
  GROUP_ERROR,
  CLEAR_GROUP,
  UPDATE_GROUP,
  GET_GROUPS,
  GROUP_LOADING,
} from "../actions/types";

const initialState = {
  group: null,
  groups: [],
  loading: true,
  error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_GROUP:
      return {
        ...state,
        group: payload,
        loading: false,
      };
    case GROUP_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_GROUPS:
      return {
        ...state,
        groups: payload,
        loading: false,
      };

    case UPDATE_GROUP:
      return {
        ...state,
        group: payload,
        loading: false,
      };
    case GROUP_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_GROUP:
      return {
        ...state,
        group: null,
        loading: false,
      };

    default:
      return state;
  }
}
