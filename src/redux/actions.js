import { actionTypes } from './actionTypes';

export const setLink = link => {
  return {
    type: actionTypes.SET_LINK,
    payload: link
  }
}

export const setSession = sessionName => {
  return {
    type: actionTypes.SET_SESSION,
    payload: sessionName
  }
}

export const setUser = user => {
  return {
    type: actionTypes.SET_USER,
    payload: user
  }
}