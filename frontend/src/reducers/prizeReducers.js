import {
  LIST_PRIZES_FAIL,
  LIST_PRIZES_REQUEST,
  LIST_PRIZES_SUCCESS,
} from "../constants/prizesConstants";

export const prizeListReducer = (state = { prizes: [] }, action) => {
  switch (action.type) {
    case LIST_PRIZES_REQUEST:
      return { loading: true, prizes: [] };

    case LIST_PRIZES_SUCCESS:
      return {
        loading: false,
        prizes: action.payload,
      };

    case LIST_PRIZES_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
