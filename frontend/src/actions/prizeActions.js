import {
  LIST_PRIZES_FAIL,
  LIST_PRIZES_REQUEST,
  LIST_PRIZES_SUCCESS,
} from "../constants/prizesConstants";
import { BaseUrl } from "../utils/urls";

import axios from "axios";

export const listPrizes = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LIST_PRIZES_REQUEST });

    const { data } = await axios.get(`${BaseUrl}/api/prizes/`);

    dispatch({
      type: LIST_PRIZES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_PRIZES_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
