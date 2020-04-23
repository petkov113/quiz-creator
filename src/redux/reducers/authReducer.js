import {
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  AUTH_ERROR,
  AUTH_CLEAR_ERROR,
  SHOW_LOADER,
  HIDE_LOADER,
} from "../types/types";

const INITIAL_STATE = {
  token: null,
  error: null,
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, token: action.token };
    case AUTH_LOGOUT:
      return { ...state, token: null };
    case AUTH_ERROR:
      return { ...state, error: action.error };
    case AUTH_CLEAR_ERROR:
      return { ...state, error: null };
    case SHOW_LOADER:
      return { ...state, loading: true };
    case HIDE_LOADER:
      return { ...state, loading: false };
    default:
      return state;
  }
};