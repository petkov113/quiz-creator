import React, { Component } from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";

class Quiz extends Component {
  state = {
    loading: true,
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [],
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    const response = await axios.get(`/quiz/${id}.json`);
    this.setState({
      quiz: [...response.data],
      loading: false,
    });
  }

  onAnswerClickHandler = (answerId) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === "success") return;
    }

    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = "success";
      }

      this.setState({
        answerState: { [answerId]: "success" },
        results,
      });

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true,
          });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          });
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = "error";
      this.setState({
        answerState: { [answerId]: "error" },
        results,
      });
    }
  };

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {},
    });
  };

  render() {
    const { quiz, activeQuestion, answerState } = this.state;

    return (
      <div className={classes.Quiz}>
        {this.state.loading ? (
          <Loader />
        ) : (
          <div className={classes.QuizWrapper}>
            <h1>Ответьте на все вопросы</h1>
            {this.state.isFinished ? (
              <FinishedQuiz
                results={this.state.results}
                quiz={this.state.quiz}
                onRetry={this.retryHandler}
              />
            ) : (
              <ActiveQuiz
                answers={quiz[activeQuestion].answers}
                question={quiz[activeQuestion].question}
                onAnswerClick={this.onAnswerClickHandler}
                quizLength={quiz.length}
                answerNumber={activeQuestion + 1}
                state={answerState}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Quiz;
