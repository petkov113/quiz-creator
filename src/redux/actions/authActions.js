import axios from "axios";
import { AUTH_SUCCESS, AUTH_LOGOUT, AUTH_ERROR, AUTH_CLEAR_ERROR } from "../types/types";
import { showLoader, hideLoader } from "./commonActions";

export const autoLogin = () => (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) {
    dispatch(logout());
  } else {
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    if (expirationDate <= new Date()) {
      dispatch(logout());
    } else {
      dispatch(authSucces(token));
      dispatch(
        autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000)
      );
    }
  }
};

const authSucces = (token) => {
  return {
    type: AUTH_SUCCESS,
    token,
  };
};

const authError = (error) => {
  return {
    type: AUTH_ERROR,
    error
  };
};

export const authClear = () => {
  return {
    type: AUTH_CLEAR_ERROR
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");
  return {
    type: AUTH_LOGOUT,
  };
};

export const autoLogout = (time) => (dispatch) => {
  setTimeout(() => {
    dispatch(logout());
  }, time * 1000);
};

export const auth = (email, password, isLogin) => async (dispatch) => {
  dispatch(showLoader())
  const authData = { email, password, returnSecureToken: true };
  let url;

  isLogin
    ? (url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBYZLvVWI9en4rGS1DuEp2C1RlpppUw7k8")
    : (url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBYZLvVWI9en4rGS1DuEp2C1RlpppUw7k8");

  try {
    const response = await axios.post(url, authData);
    const data = response.data;

    const expirationDate = new Date(
      new Date().getTime() + data.expiresIn * 1000
    );

    localStorage.setItem("token", data.idToken);
    localStorage.setItem("userId", data.localId);
    localStorage.setItem("expirationDate", expirationDate);

    dispatch(authSucces(data.idToken));
    dispatch(autoLogout(data.expiresIn));
    dispatch(hideLoader())
  } catch (e) {
    dispatch(hideLoader());
    if (e.response.data.error.message === "EMAIL_EXISTS") {
      dispatch(authError("This email is already registered. Please, sign in."));
    } else if (e.response.data.error.message === "EMAIL_NOT_FOUND") {
      dispatch(
        authError("This email haven't been registered yet. Please, register.")
      );
    } else {
      dispatch(authError("Email or password is wrong"));
    }
  }
};
