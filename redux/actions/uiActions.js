import { STOP_LOADING_UI } from "../types";

export const stopLoadingUI = () => (dispatch) => {
  dispatch({ type: STOP_LOADING_UI });
};
