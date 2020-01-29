//app reducers
import {
  CREATE_TODO,
  READ_TODO_ALL,
  READ_TODO_PROJECT,
  READ_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  READ_LOADING_TODO,
  WRITE_LOADING_TODO,
  SET_TODO_ERROR
} from "../types";

const initialState = {
  readLoading: false,
  writeLoading: false,
  error: {},
  todos: [],
  todo: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case READ_TODO_ALL:
      return {
        ...state,
        readLoading: false,
        todos: action.payload,
        error: {}
      };
    case READ_TODO_PROJECT:
      return {
        ...state,
        readLoading: false,
        todos: action.payload,
        error: {}
      };
    case READ_TODO:
      return {
        ...state,
        readLoading: false,
        todo: action.payload,
        error: {}
      };
    case CREATE_TODO:
      return {
        ...state,
        writeLoading: false,
        todos: [...state.todos, action.payload],
        error: {}
      };
    case DELETE_TODO:
      return {
        ...state,
        writeLoading: false,
        error: {}
      };
    case UPDATE_TODO:
      return {
        ...state,
        writeLoading: false,
        error: {}
      };
    case READ_LOADING_TODO:
      return {
        ...state,
        readLoading: true,
        error: {}
      };
    case WRITE_LOADING_TODO:
      return {
        ...state,
        writeLoading: true,
        error: {}
      };
    case SET_TODO_ERROR:
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
