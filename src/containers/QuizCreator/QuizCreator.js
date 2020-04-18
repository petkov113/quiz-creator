import React, { Component } from "react";
import classes from "./QuizCreator.module.css";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import {
  createControl,
  validate,
  validateForm,
} from "../../Form/formFramework";
import Select from "../../components/UI/Select/Select";

const createOptionControl = (number) => {
  return createControl(
    {
      label: `Вариант ${number}`,
      errorMessage: "Поле не может быть пустым",
      id: number,
    },
    { required: true }
  );
};

const createFormControls = () => {
  return {
    question: createControl(
      {
        label: "Введите вопрос",
        errorMessage: "Вопрос не может быть пустым",
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  };
};

export default class QuizCreator extends Component {
  state = {
    quiz: [],
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls(),
  };

  submitHandler = (event) => {
    event.preventDefault();
  };

  addQuestionHandler = (event) => {
    event.preventDefault();

    const quiz = [...this.state.quiz];
    const index = quiz.length + 1;

    const questionItem = {
      question: this.state.formControls.question.value,
      id: index,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        {
          text: this.state.formControls.option1.value,
          id: this.state.formControls.option1.id,
        },
        {
          text: this.state.formControls.option2.value,
          id: this.state.formControls.option2.id,
        },
        {
          text: this.state.formControls.option3.value,
          id: this.state.formControls.option3.id,
        },
        {
          text: this.state.formControls.option4.value,
          id: this.state.formControls.option4.id,
        },
      ],
    };

    quiz.push(questionItem);

    this.setState({
      quiz,
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
    });
  };
  changeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls),
    });
  };

  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];

      return (
        <React.Fragment key={index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={(event) =>
              this.changeHandler(event.target.value, controlName)
            }
          />

          {index === 0 ? <hr /> : null}
        </React.Fragment>
      );
    });
  }

  selectChangeHandler = (event) =>
    this.setState({ rightAnswerId: +event.target.value });

  createQuizHandler = (event) => {
    event.preventDefault();
    console.log(this.state.quiz);
  };

  render() {
    const select = (
      <Select
        label="Выберите правильный ответ"
        value={this.state.rightAnswerId}
        onChange={this.selectChangeHandler}
        options={[
          { text: 1, value: 1 },
          { text: 2, value: 2 },
          { text: 3, value: 3 },
          { text: 4, value: 4 },
        ]}
      />
    );

    return (
      <div className={classes.QuizCreator}>
          <form className={classes.creatorForm} onSubmit={this.submitHandler}>
            {this.renderControls()}
            <hr />
            {select}

            <div className={classes.btnContainer}>
              <Button
                btnType="secondary"
                onClick={this.addQuestionHandler}
                value="Добавить вопрос"
                disabled={!this.state.isFormValid}
              />

              <Button
                btnType="primary"
                onClick={this.createQuizHandler}
                value="Добавить тест"
                disabled={this.state.quiz.length === 0}
              />
            </div>
          </form>
        </div>
    );
  }
}
