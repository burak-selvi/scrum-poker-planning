import { actionTypes } from './actionTypes';

const initialState = {
  link: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LINK:
      return {
        ...state, link: action.payload
      }
    default:
      return { ...state }
  }
}