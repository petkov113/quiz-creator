import React, { Component } from "react";
import classes from "./QuizList.module.css";
import { NavLink } from "react-router-dom";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";

export default class QuizList extends Component {
  state = {
    quizes: [],
    loadind: false,
  };

  async componentDidMount() {
    this.setState({ loadind: true });
    try {
      const response = await axios.get("quiz.json");
      const quizesArr = [];
      Object.keys(response.data).forEach((key, index) => {
        quizesArr.push({
          id: key,
          name: `Test №${index + 1}`,
        });
      });
      this.setState({
        quizes: [...quizesArr],
        loadind: false,
      });
    } catch (e) {
      console.log(e);
    }
  }

  renderQuizes() {
    return this.state.quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={"/quiz/" + quiz.id}> {quiz.name} </NavLink>
        </li>
      );
    });
  }

  render() {
    return (
      <div className={classes.QuizContainer}>
        <h1>Список тестов</h1>
        <div className={classes.QuizList}>
          {this.state.loadind ? <Loader /> : <ul>{this.renderQuizes()}</ul>}
        </div>
      </div>
    );
  }
}
