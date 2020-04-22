import axios from "../../axios/axios-quiz";
import { SUCCESS } from "../types/types";
import { showLoader, hideLoader } from "./commonActions";

export function getQuizes() {
  return async (dispatch) => {
    try {
      dispatch(showLoader());
      const response = await axios.get("quiz.json");
      const quizes = [];
      Object.entries(response.data).forEach((quiz) => {
        quizes.push({
          id: quiz[0],
          name: quiz[1][0].name,
        });
      });
      dispatch(hideLoader());
      dispatch(succes(quizes));
    } catch (e) {
      console.log(e);
    }
  };
}

function succes(data) {
  return {
    type: SUCCESS,
    payload: data,
  };
}
