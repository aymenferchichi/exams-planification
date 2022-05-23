import {
  GET_SALLE,
  SALLE_ERROR,
  CLEAR_SALLE,
  UPDATE_SALLE,
  GET_SALLES,
  SALLE_LOADING,
} from "../actions/types";

const initialState = {
  salle: null,
  salles: [],
  loading: true,
  error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SALLE:
      return {
        ...state,
        salle: payload,
        loading: false,
      };
    case SALLE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_SALLES:
      return {
        ...state,
        salles: payload,
        loading: false,
      };

    case UPDATE_SALLE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case SALLE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_SALLE:
      return {
        ...state,
        salle: null,
        loading: false,
      };

    default:
      return state;
  }
}
