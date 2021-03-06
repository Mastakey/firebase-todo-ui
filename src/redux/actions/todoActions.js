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
import axios from "axios";

import { addMessageUtil, getErrors } from "./actionsUtil.js";

export const getTodos = () => async dispatch => {
  dispatch({ type: READ_LOADING_TODO });
  try {
    const todos = await axios.get("/todo");
    dispatch({ type: READ_TODO_ALL, payload: todos.data });
  } catch (err) {
    console.log(err);
    console.log(err.response.data);
    dispatch({
      type: SET_TODO_ERROR,
      payload: err.response.data
    });
  }
};

export const getTodosByProject = projectId => async dispatch => {
  dispatch({ type: READ_LOADING_TODO });
  try {
    const todos = await axios.get("/project/" + projectId + "/todo");
    dispatch({ type: READ_TODO_PROJECT, payload: todos.data });
  } catch (err) {
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_TODO_ERROR,
      payload: errors
    });
  }
};

export const getTodo = id => async dispatch => {
  dispatch({ type: READ_LOADING_TODO });
  try {
    const todo = await axios.get("/todo/" + id);
    dispatch({ type: READ_TODO, payload: todo.data });
    return todo;
  } catch (err) {
    console.log(err);
    console.log(err.response.data);
    dispatch({
      type: SET_TODO_ERROR,
      payload: err.response.data
    });
  }
};

export const createTodo = (data, history) => async dispatch => {
  dispatch({ type: WRITE_LOADING_TODO });
  try {
    const todo = await axios.post("/todo", data);
    const projectId = data.projectId;
    dispatch({ type: CREATE_TODO, payload: todo.data });
    addMessageUtil(
      { message: "Todo created successfully", timeout: 4000 },
      dispatch
    );
    if (projectId && projectId !== "") {
      history.push(`/project/${projectId}`);
    } else {
      history.push(`/todo`);
    }
  } catch (err) {
    console.log(err);
    console.log(err.response.data);
    dispatch({
      type: SET_TODO_ERROR,
      payload: err.response.data
    });
  }
};

export const editTodo = (id, todo, history) => async dispatch => {
  dispatch({ type: WRITE_LOADING_TODO });
  try {
    const todoData = await axios.put(`/todo/${id}`, todo);
    dispatch({
      type: UPDATE_TODO,
      payload: todoData.data
    });
    addMessageUtil(
      { message: "Todo updated successfully", timeout: 4000 },
      dispatch
    );
    history.push(`/todo/${id}`);
  } catch (err) {
    console.log(err);
    console.log(err.response.data);
    dispatch({
      type: SET_TODO_ERROR,
      payload: err.response.data
    });
  }
};

export const deleteTodo = (id, projectId, history) => async dispatch => {
  dispatch({ type: WRITE_LOADING_TODO });
  try {
    const todo = await axios.delete("/todo/" + id);
    dispatch({ type: DELETE_TODO, payload: todo.data });
    addMessageUtil(
      { message: "Todo deleted successfully", timeout: 4000 },
      dispatch
    );
    if (projectId && projectId !== "") {
      history.push(`/project/${projectId}`);
    } else {
      history.push(`/todo`);
    }
  } catch (err) {
    console.log(err);
    console.log(err.response.data);
    dispatch({
      type: SET_TODO_ERROR,
      payload: err.response.data
    });
  }
};
