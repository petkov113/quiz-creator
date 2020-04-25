import React from "react";
import classes from "./QuestionCard.module.css";

const QuestionCard = ({ question, answers, rightAnswerId, onDelete }) => {
  return (
    <div className={classes.QuestionCard}>
      <span className={classes.Question}>{question}</span>
      <ul>
        {answers.map((answer, index) => (
          <li className={classes.Answer} key={index}>
            {rightAnswerId === (index + 1) ? <b>{answer.text}</b> : answer.text}
          </li>
        ))}
      </ul>
      <i className={classes.Delete + " fa fa-times"} onClick={onDelete}></i>
    </div>
  );
};

export default QuestionCard;
