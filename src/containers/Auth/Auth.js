import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Auth.module.css";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Loader from "../../components/UI/Loader/Loader";
import { auth, authClear } from "../../redux/actions/authActions";

const validateEmail = (email) => {
  const testReg = new RegExp(
    "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.[A-Za-z]{2,3})+$"
  );
  return testReg.test(String(email).toLowerCase());
};

class Auth extends Component {
  state = {
    isFormValid: false,

    formControls: {
      email: {
        value: "",
        type: "email",
        label: "Email",
        errorMessage: "Please, enter a correct email",
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
        label: "Password",
        errorMessage: "Password doesn't meet requirements",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  };

  loginHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    );
  };

  registerHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    );
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

  componentWillUnmount() {
    this.props.authClear();
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Authorization</h1>

          <form onSubmit={this.sumbitHandler} className={classes.AuthForm}>
            {this.renderInputs()}

            <div className={classes.btnContainer}>
              <Button
                btnType="primary"
                onClick={this.loginHandler}
                disabled={!this.state.isFormValid}
                value="Sign in"
              />

              <Button
                btnType="secondary"
                onClick={this.registerHandler}
                disabled={!this.state.isFormValid}
                value="Register"
              />
              {this.props.loading ? (
                <Loader />
              ) : this.props.error ? (
                <span className={classes.warning}>{this.props.error}</span>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.auth.error,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { auth, authClear })(Auth);
