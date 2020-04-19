import React, { Component } from "react";
import classes from "./QuizList.module.css";
import { NavLink } from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import { connect } from "react-redux";
import { getQuizes } from "../../redux/actions/listActions";

class QuizList extends Component {
  componentDidMount() {
    this.props.getQuizes();
  }

  renderQuizes() {
    return this.props.quizes.map((quiz) => {
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
          {this.props.loading ? <Loader /> : <ul>{this.renderQuizes()}</ul>}
        </div>
      </div>
    );
  }
}

const mapStateToPrors = (state) => ({
  quizes: state.quizList.quizes,
  loading: state.quizList.loading,
});

export default connect(mapStateToPrors, { getQuizes })(QuizList);
