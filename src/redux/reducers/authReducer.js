import { AUTH_SUCCESS, AUTH_LOGOUT, AUTH_ERROR } from "../types/types";

const INITIAL_STATE = {
  token: null,
  error: null
};
 
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {...state, token: action.token, error: null}
    case AUTH_LOGOUT:
      return {...state, token: null}
    case AUTH_ERROR:
      return {...state, error: action.error.message}
    default:
      return state
  }
}