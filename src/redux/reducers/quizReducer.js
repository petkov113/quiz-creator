import {
  NEXT_QUESTION,
  FINISHED,
  RETRY_QUIZ,
  SET_QUIZ,
  HIDE_LOADER,
  SHOW_LOADER,
  QUIZ_SET_STATE,
} from "../types/types";

const INITIAL_STATE = {
  loading: false,
  results: {},
  isFinished: false,
  activeQuestion: 0,
  answerState: null,
  quiz: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEXT_QUESTION:
      return { ...state, answerState: null, activeQuestion: action.number };
    case SET_QUIZ:
      return { ...state, quiz: action.quiz };
    case FINISHED:
      return { ...state, isFinished: true };
    case RETRY_QUIZ:
      return {
        ...state,
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
        results: {}
      };
    case QUIZ_SET_STATE:
      return {
        ...state,
        answerState: action.answerState,
        results: action.results,
      };
    case HIDE_LOADER:
      return {
        ...state,
        loading: false,
      };
    case SHOW_LOADER:
      return {
        ...state,
        loading: true,
        quiz: null
      };
    default:
      return state;
  }
};
