import React, { Component, useEffect } from "react";
import classes from "./QuizList.module.css";
import { NavLink } from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import { connect } from "react-redux";
import { getQuizes } from "../../redux/actions/listActions";

const QuizList = ({ quizes, getQuizes, loading }) => {
  useEffect(() => {
    getQuizes();
  }, [getQuizes]);

  const renderQuizes = () => {
    return quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={"/quiz/" + quiz.id}> {quiz.name} </NavLink>
        </li>
      );
    });
  };

  return (
    <div className={classes.QuizContainer}>
      <h1>Список тестов</h1>
      <div className={classes.QuizList}>
        {loading ? <Loader /> : <ul>{renderQuizes()}</ul>}
      </div>
    </div>
  );
};

const mapStateToPrors = (state) => ({
  quizes: state.quizList.quizes,
  loading: state.quizList.loading,
});

export default connect(mapStateToPrors, { getQuizes })(QuizList);
