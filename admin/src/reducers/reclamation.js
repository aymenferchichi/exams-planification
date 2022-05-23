import {
  GET_RECLAMATION,
  RECLAMATION_ERROR,
  CLEAR_RECLAMATION,
  UPDATE_RECLAMATION,
  GET_RECLAMATIONS,
  RECLAMATION_LOADING,
} from "../actions/types";

const initialState = {
  reclamation: null,
  reclamations: [],
  loading: true,
  error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_RECLAMATION:
      return {
        ...state,
        reclamation: payload,
        loading: false,
      };
    case RECLAMATION_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_RECLAMATIONS:
      return {
        ...state,
        reclamations: payload,
        loading: false,
      };

    case UPDATE_RECLAMATION:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case RECLAMATION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_RECLAMATION:
      return {
        ...state,
        reclamation: null,
        loading: false,
      };

    default:
      return state;
  }
}
