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
          console.log(props.results);
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
        Правильных ответов: {succesCount} из {props.quiz.length}
      </p>

      <div>
        <Button
          onRetry={props.onRetry}
          value="Начать сначала"
          btnType="primary"
        />
        <Link to="/">
          <Button value="Решить другой тест" btnType="secondary" />
        </Link>
      </div>
    </div>
  );
};

export default FinishedQuiz;
