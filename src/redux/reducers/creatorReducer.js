import { ADD_QUESTION, RESET_QUIZ, DELETE_QUESTION } from "../types/types";

const INITIAL_STATE = {
  quiz: []
};
 
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_QUESTION:
      return {
        ...state,
        quiz: [...state.quiz, action.item]
      }
    case DELETE_QUESTION:
      return {
        ...state,
        quiz: state.quiz.filter((question) => question.id !== action.id)
      }
    case RESET_QUIZ:
      return {
        ...state,
        quiz: []
      }
    default:
      return state
  }
}