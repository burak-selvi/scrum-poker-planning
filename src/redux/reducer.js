import { actionTypes } from './actionTypes';

const initialState = {
  user: { userId: '', isMaster: false },
  link: '',
  sessionName: '',
  activeStory: null,
  alert: { open: false, message: '', alertType: 'success' }
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
    case actionTypes.SET_ACTIVE_STORY:
      return {
        ...state, activeStory: action.payload
      }
    case actionTypes.SET_ALERT:
      return {
        ...state, alert: { open: action.payload.isOpen, message: action.payload.message, alertType: action.payload.alertType }
      }
    default:
      return { ...state }
  }
}