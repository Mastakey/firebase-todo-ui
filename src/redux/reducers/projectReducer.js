//project reducers
import {
  CREATE_PROJECT,
  READ_PROJECT_ALL,
  READ_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  READ_LOADING_PROJECT,
  WRITE_LOADING_PROJECT,
  SET_PROJECT_ERROR
} from "../types";

const initialState = {
  readLoading: false,
  writeLoading: false,
  error: {},
  projects: [],
  project: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case READ_PROJECT_ALL:
      return {
        ...state,
        readLoading: false,
        projects: action.payload,
        error: {}
      };
    case READ_PROJECT:
      return {
        ...state,
        readLoading: false,
        project: action.payload,
        error: {}
      };
    case CREATE_PROJECT:
      return {
        ...state,
        writeLoading: false,
        projects: [...state.projects, action.payload],
        error: {}
      };
    case DELETE_PROJECT:
      return {
        ...state,
        writeLoading: false,
        error: {}
      };
    case UPDATE_PROJECT:
      return {
        ...state,
        writeLoading: false,
        error: {}
      };
    case READ_LOADING_PROJECT:
      return {
        ...state,
        readLoading: true,
        error: {}
      };
    case WRITE_LOADING_PROJECT:
      return {
        ...state,
        writeLoading: true,
        error: {}
      };
    case SET_PROJECT_ERROR:
      return {
        ...state,
        readLoading: false,
        writeLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
