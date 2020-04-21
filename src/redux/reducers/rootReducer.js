import { combineReducers } from "redux";
import quizListReducer from "./quizListReducer";
import quizReducer from "./quizReducer";
import creatorReducer from './creatorReducer';

export default combineReducers({
  quizList: quizListReducer,
  quiz: quizReducer,
  quizCreator: creatorReducer
});
