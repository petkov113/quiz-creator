import axios from "../../axios/axios-quiz";
import {
  QUIZ_SET_STATE,
  NEXT_QUESTION,
  FINISHED,
  SET_QUIZ,
  RETRY_QUIZ,
} from "../types/types";
import { hideLoader, showLoader } from "./commonActions";

export const requestQuiz = (id) => async (dispatch) => {
  dispatch(showLoader())
  try {
    const response = await axios.get(`/quiz/${id}.json`);
    dispatch(hideLoader());
    dispatch(setQuiz(response.data));
  } catch (e) {
    dispatch(hideLoader());
    console.log(e);
  }
};

function setQuiz(quiz) {
  return {
    type: SET_QUIZ,
    quiz
  };
}

function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results,
  };
}

function nextQuestion(number) {
  return {
    type: NEXT_QUESTION,
    number,
  };
}

function finish() {
  return {
    type: FINISHED,
  };
}

export function retry() {
  return {
    type: RETRY_QUIZ,
  };
}
const isQuizFinished = (state) =>
  state.activeQuestion + 1 === state.quiz.length;

export const quizAnswerClick = (answerId) => (dispatch, getState) => {
  const state = getState().quiz;

  if (state.answerState) {
    const key = Object.keys(state.answerState)[0];
    if (state.answerState[key] === "success") return;
  }

  const question = state.quiz[state.activeQuestion];
  const results = state.results;

  if (question.rightAnswerId === answerId) {
    if (!results[question.id]) {
      results[question.id] = "success";
    }

    dispatch(quizSetState({ [answerId]: "success" }, results));

    const timeout = window.setTimeout(() => {
      if (isQuizFinished(state)) {
        dispatch(finish());
      } else {
        dispatch(nextQuestion(state.activeQuestion + 1));
      }
      window.clearTimeout(timeout);
    }, 1000);
  } else {
    results[question.id] = "error";
    dispatch(quizSetState({ [answerId]: "error" }, results));
  }
};
