import React from "react";
import classes from "./FinishedQuiz.module.css";
import Button from "../UI/Button/Button";
import { Link } from "react-router-dom";

const FinishedQuiz = (props) => {
  const succesCount = Object.keys(props.results).reduce((total, cur) => {
    if (props.results[cur] === "success") {
      total++;
    }
    return total;
  }, 0);

  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {props.quiz.map((quizItem, index) => {
          const cls = [
            "fa",
            props.results[quizItem.id] === "error" ? "fa-times" : "fa-check",
            classes[props.results[quizItem.id]],
          ];
          return (
            <li key={index}>
              <strong> {index + 1}. </strong>&nbsp;
              {quizItem.question}
              <i className={cls.join(" ")} />
            </li>
          );
        })}
      </ul>

      <p>
       Correct answers: {succesCount} out of {props.quiz.length}
      </p>

      <div>
        <Button
          onClick={props.onRetry}
          value="Start over"
          btnType="primary"
        />
        <Link to="/">
          <Button value="Another Quiz" btnType="secondary" />
        </Link>
      </div>
    </div>
  );
};

export default FinishedQuiz;
