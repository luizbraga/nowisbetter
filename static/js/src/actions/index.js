import axios from 'axios';
import {FETCH_USERS} from '../constants';
import {CREATE_EMPTY_LIST} from '../constants';
import {CREATE_TASK_LIST} from '../constants';
import {UPDATE_TASK_LIST} from '../constants';
import {FETCH_LIST} from '../constants';
import {CREATE_EDIT_TASK} from '../constants';
import { SubmissionError } from 'redux-form'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export function fetchUsers() {
  const request = axios.get(`/api/accounts/list/`)

  return {
    type: FETCH_USERS,
    payload: request
  }
}

export function createEmptyTaskList() {
  return {
    type: CREATE_EMPTY_LIST
  }
}

export function createTaskList(id, values) {

  const request = axios.post(
        `/api/tasks/list/create/`, {'title': values})

  return {
    type: CREATE_TASK_LIST,
    payload: request
  }
}

export function updateTaskList(id, values) {
  const request = axios.put(
      `/api/tasks/list/update/${id}`, values).catch(error => {
    return {
      error: error.response.data
    }
  });

  return {
    type: UPDATE_TASK_LIST,
    payload: request
  }
}

export function fetchLists() {
  const request = axios.get(`/api/tasks/lists`)

  return {
    type: FETCH_LIST,
    payload: request
  }
}

export function createTask(values) {
  const request = axios.post(
    `/api/tasks/create/`, values).catch(error => {
    return {
      payload: error.response.data
    }
  });

  return {
    type: CREATE_EDIT_TASK,
    payload: request
  }
}

export function editTask(id, values, callback) {
  const request = axios.put(
      `/api/tasks/update/${id}`, values).catch(error => {
      return {
        payload: error.response.data
      }
  });

  return {
    type: CREATE_EDIT_TASK,
    payload: request
  }
}
