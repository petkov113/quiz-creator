import { SHOW_LOADER, HIDE_LOADER, SUCCESS } from "../types/types";

const INITIAL_STATE = {
  quizes: [],
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_LOADER:
      return { ...state, loading: true };
    case HIDE_LOADER:
      return { ...state, loading: false };
    case SUCCESS:
      return { ...state, quizes: [...action.payload] };
    default:
      return state;
  }
};
