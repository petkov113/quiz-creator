import { combineReducers } from "redux";
import quizListReducer from "./quizListReducer";
import quizReducer from "./quizReducer";

export default combineReducers({
  quizList: quizListReducer,
  quiz: quizReducer
});
