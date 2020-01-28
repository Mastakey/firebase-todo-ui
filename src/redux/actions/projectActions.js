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
import axios from "axios";

import { addMessageUtil, getErrors } from "./actionsUtil.js";

export const getProjects = () => async dispatch => {
  dispatch({ type: READ_LOADING_PROJECT });
  try {
    const projects = await axios.get("/project");
    dispatch({ type: READ_PROJECT_ALL, payload: projects.data });
    return projects;
  } catch (err) {
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_PROJECT_ERROR,
      payload: errors
    });
  }
};

export const getProject = id => async dispatch => {
  dispatch({ type: READ_LOADING_PROJECT });
  try {
    const project = await axios.get("/project/" + id);
    dispatch({ type: READ_PROJECT, payload: project.data });
    return project;
  } catch (err) {
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_PROJECT_ERROR,
      payload: errors
    });
  }
};

export const createProject = (data, history) => async dispatch => {
  dispatch({ type: WRITE_LOADING_PROJECT });
  try {
    const project = await axios.post("/project", data);
    dispatch({ type: CREATE_PROJECT, payload: project.data });
    addMessageUtil({ message: "Project created successfully", timeout: 4000 }, dispatch);
    history.push(`/project`);
  } catch (err) {
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_PROJECT_ERROR,
      payload: errors
    });
  }
};

export const editProject = (id, project, history) => async dispatch => {
  dispatch({ type: WRITE_LOADING_PROJECT });
  try {
    const projectData = await axios.put(`/project/${id}`, project);
    dispatch({
      type: UPDATE_PROJECT,
      payload: projectData.data
    });
    addMessageUtil(
      { message: "Project updated successfully", timeout: 4000 },
      dispatch
    );
    history.push(`/project/${id}`);
  } catch (err) {
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_PROJECT_ERROR,
      payload: errors
    });
  }
};

export const deleteProject = (id, history) => async dispatch => {
  dispatch({ type: WRITE_LOADING_PROJECT });
  try {
    const project = await axios.delete("/project/" + id);
    dispatch({ type: DELETE_PROJECT, payload: project.data });
    addMessageUtil(
      { message: "Project deleted successfully", timeout: 4000 },
      dispatch
    );
    history.push("/project");
  } catch (err) {
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_PROJECT_ERROR,
      payload: errors
    });
  }
};
