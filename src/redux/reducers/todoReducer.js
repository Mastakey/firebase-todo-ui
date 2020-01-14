//app reducers
import {
  CREATE_TODO,
  READ_TODO_ALL,
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
  errors: [],
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
        errors: []
      };
    case READ_TODO:
      return {
        ...state,
        readLoading: false,
        todo: action.payload,
        errors: []
      };
    case CREATE_TODO:
      return {
        ...state,
        writeLoading: false,
        todos: [...state.todos, action.payload],
        errors: []
      };
    case DELETE_TODO:
      return {
        ...state,
        writeLoading: false,
        errors: []
      };
    case UPDATE_TODO:
      return {
        ...state,
        writeLoading: false,
        errors: []
      };
    case READ_LOADING_TODO:
      return {
        ...state,
        readLoading: true,
        errors: []
      };
    case WRITE_LOADING_TODO:
      return {
        ...state,
        writeLoading: true,
        errors: []
      };
    case SET_TODO_ERROR:
      return {
        ...state,
        readLoading: false,
        writeLoading: false,
        errors: [...state.errors, action.payload]
      };
    default:
      return state;
  }
}
