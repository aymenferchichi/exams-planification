import {
  GET_EXAM,
  EXAM_ERROR,
  CLEAR_EXAM,
  UPDATE_EXAM,
  GET_EXAMS,
  EXAM_LOADING,
} from "../actions/types";

const initialState = {
  exam: null,
  exams: [],
  loading: true,
  error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_EXAM:
      return {
        ...state,
        exam: payload,
        loading: false,
      };
    case EXAM_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_EXAMS:
      return {
        ...state,
        exams: payload,
        loading: false,
      };

    case UPDATE_EXAM:
      return {
        ...state,
        exam: payload,
        loading: false,
      };
    case EXAM_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_EXAM:
      return {
        ...state,
        exam: null,
        loading: false,
      };

    default:
      return state;
  }
}
