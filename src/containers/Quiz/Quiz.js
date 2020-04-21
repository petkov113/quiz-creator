import React, { useEffect } from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import {
  requestQuiz,
  retry,
  quizAnswerClick,
} from "../../redux/actions/quizActions";
import { connect } from "react-redux";

const Quiz = ({ match, requestQuiz, retry, ...props }) => {
  useEffect(() => {
    requestQuiz(match.params.id);
    return retry;
  }, [requestQuiz, match, retry]);

  const { quiz, activeQuestion, answerState } = props;

  return (
    <div className={classes.Quiz}>
      <h1>Ответьте на все вопросы</h1>
      <div className={classes.QuizWrapper}>
        {props.loading || props.quiz === null ? (
          <Loader />
        ) : props.isFinished ? (
          <FinishedQuiz
            results={props.results}
            quiz={props.quiz}
            onRetry={retry}
          />
        ) : (
          <ActiveQuiz
            answers={quiz[activeQuestion].answers}
            question={quiz[activeQuestion].question}
            onAnswerClick={props.quizAnswerClick}
            quizLength={quiz.length}
            answerNumber={activeQuestion + 1}
            state={answerState}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  activeQuestion: state.quiz.activeQuestion,
  answerState: state.quiz.answerState,
  quiz: state.quiz.quiz,
  results: state.quiz.results,
  loading: state.quiz.loading,
  isFinished: state.quiz.isFinished,
});

const mapDispatchToProps = {
  requestQuiz,
  retry,
  quizAnswerClick,
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
