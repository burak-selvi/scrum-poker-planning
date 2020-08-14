import { actionTypes } from './actionTypes';

export const setLink = link => {
  return {
    type: actionTypes.SET_LINK,
    payload: link
  }
}