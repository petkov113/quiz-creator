import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./QuizCreator.module.css";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import {
  createControl,
  validate,
  validateForm,
} from "../../Form/formFramework";
import Select from "../../components/UI/Select/Select";
import {
  createQuiz,
  addQuizQuestion,
} from "../../redux/actions/creatorActions";

const createOptionControl = (number) => {
  return createControl(
    {
      label: `Option ${number}`,
      errorMessage: "The field can't be empthy",
      id: number,
    },
    { required: true }
  );
};

const createFormControls = (questionItem) => {
  let disabled = false, value='', valid = false;
  
  if (questionItem) {
    value = questionItem.name;
    disabled = true;
    valid = true;
  }

  return {
    name: createControl(
      {
        label: "Quiz name",
        errorMessage: "The field can't be empthy",
        value,
        disabled,
        valid
      },
      { required: true }
    ),
    question: createControl(
      {
        label: "Question",
        errorMessage: "The field can't be empthy",
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  };
};

export class QuizCreator extends Component {
  state = {
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls(this.props.quiz[0]),
  };

  submitHandler = (event) => event.preventDefault();

  addQuestionHandler = (event) => {
    event.preventDefault();

    const quiz = [...this.props.quiz];
    const index = quiz.length + 1;
    const {
      name,
      question,
      option1,
      option2,
      option3,
      option4,
    } = this.state.formControls;

    const questionItem = {
      name: name.value,
      question: question.value,
      id: index,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id },
      ],
    };

    this.props.addQuizQuestion(questionItem);

    const formControls = createFormControls(questionItem);

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls
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
      isFormValid: validateForm(formControls)
    });
  };

  createQuizHandler = (e) => {
    e.preventDefault();
    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
    });
    this.props.createQuiz();
  };

  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];

      return (
        <React.Fragment key={index}>
          <Input
            label={control.label}
            value={control.value}
            disabled={control.disabled}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={(event) =>
              this.changeHandler(event.target.value, controlName)
            }
          />

          {index === 0 || index === 1 ? <hr /> : null}
        </React.Fragment>
      );
    });
  }

  selectChangeHandler = (event) =>
    this.setState({ rightAnswerId: +event.target.value });

  render() {
    const select = (
      <Select
        label="Choose the correct answer"
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
              value="Add question"
              disabled={!this.state.isFormValid}
            />

            <Button
              btnType="primary"
              onClick={this.createQuizHandler}
              value="Add quiz"
              disabled={this.props.quiz.length === 0}
            />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  quiz: state.quizCreator.quiz,
});

const mapDispatchToProps = {
  addQuizQuestion,
  createQuiz,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
