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

export const setActiveStory = story => {
  return {
    type: actionTypes.SET_ACTIVE_STORY,
    payload: story
  }
}

export const setAlert = alert => {
  return {
    type: actionTypes.SET_ALERT,
    payload: alert
  }
}