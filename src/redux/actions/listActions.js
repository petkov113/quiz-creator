import axios from "../../axios/axios-quiz";
import { SUCCESS } from "../types/types";
import { showLoader, hideLoader } from "./commonActions";

export function getQuizes() {
  return async (dispatch) => {
    try {
      dispatch(showLoader());
      const response = await axios.get("quiz.json");
      const quizes = [];
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Test №${index + 1}`,
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
