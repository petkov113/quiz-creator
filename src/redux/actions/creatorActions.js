import axios from "../../axios/axios-quiz";
import { ADD_QUESTION, RESET_QUIZ } from "../types/types";

export const addQuizQuestion = (item) => {
  return {
    type: ADD_QUESTION,
    item,
  };
};

export const resetQuizCreator = () => {
  return {
    type: RESET_QUIZ,
  };
};

export const createQuiz = () => async (dispatch, getState) => {
  const state = getState().quizCreator.quiz;
  try {
    await axios.post("/quiz.json", state);
    dispatch(resetQuizCreator());
  } catch (e) {
    console.log(e);
  }
};
