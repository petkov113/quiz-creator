import React, { Component } from "react";
import classes from "./Auth.module.css";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import axios from "axios";

const validateEmail = (email) => {
  const testReg = new RegExp(
    "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.[A-Za-z]{2,3})+$"
  );
  return testReg.test(String(email).toLowerCase());
};

export default class Auth extends Component {
  state = {
    isFormValid: false,

    formControls: {
      email: {
        value: "",
        type: "email",
        label: "Email",
        errorMessage: "Введите корректный email",
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: "",
        type: "password",
        label: "Пароль",
        errorMessage: "Введите корректный пароль",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  };

  loginHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true,
    };
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBYZLvVWI9en4rGS1DuEp2C1RlpppUw7k8",
        authData
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  registerHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true,
    };
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBYZLvVWI9en4rGS1DuEp2C1RlpppUw7k8",
        authData
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  sumbitHandler = (e) => e.preventDefault();

  validateControl = (value, validation) => {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (validation.email) {
      isValid = validateEmail(value) && isValid;
    }

    if (validation.minLength) {
      const strongRegex = new RegExp(
        `^(?=.*[a-z])(?=.{${validation.minLength},})`
      );
      isValid = strongRegex.test(value) && isValid;
    }

    return isValid;
  };

  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({ formControls, isFormValid });
  };

  renderInputs = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validation}
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      );
    });
  };

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>

          <form onSubmit={this.sumbitHandler} className={classes.AuthForm}>
            {this.renderInputs()}

            <div className={classes.btnContainer}>
              <Button
                btnType="primary"
                onClick={this.loginHandler}
                disabled={!this.state.isFormValid}
                value="Войти"
              />

              <Button
                btnType="secondary"
                onClick={this.registerHandler}
                value="Зарегистрироваться"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
