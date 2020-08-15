import { actionTypes } from './actionTypes';

const initialState = {
  user: { userId: '', isMaster: false },
  link: '',
  sessionName: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state, user: { userId: action.payload.userId, isMaster: action.payload.isMaster }
      }
    case actionTypes.SET_LINK:
      return {
        ...state, link: action.payload
      }
    case actionTypes.SET_SESSION:
      return {
        ...state, sessionName: action.payload
      }
    default:
      return { ...state }
  }
}