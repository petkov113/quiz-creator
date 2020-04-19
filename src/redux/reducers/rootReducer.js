import { combineReducers } from "redux";
import quizListReducer from "./quizListReducer";

export default combineReducers({
  quizList: quizListReducer,
});
