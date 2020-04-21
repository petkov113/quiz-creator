import { combineReducers } from "redux";
import quizListReducer from "./quizListReducer";
import quizReducer from "./quizReducer";
import creatorReducer from './creatorReducer';
import authReducer from "./authReducer";

export default combineReducers({
  quizList: quizListReducer,
  quiz: quizReducer,
  quizCreator: creatorReducer,
  auth: authReducer
});
