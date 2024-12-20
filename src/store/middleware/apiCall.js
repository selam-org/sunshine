import * as actions from "../api";
import axios from "axios";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const apiCall =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const {
      url,
      onStart,
      onFailed,
      onSuccess,
      data,
      method,
      params,
      headers,
      otherData,
    } = action.payload;
    if (onStart) dispatch({ type: onStart });
    next(action);
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    console.log("baseURL", baseURL);

    try {
      // await sleep(2000);
      const response = await axios.request({
        // baseURL: "https://sunsine-backend-staging.onrender.com",
        baseURL,
        url,
        method,
        data,
        params,
        headers,
      });

      dispatch(actions.apiCallSuccess(response.data));
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // dispatch(logout());
      }
      if (error.isAxiosError) {
        let data;
        if (error.response) {
          data = error.response.data;
        } else {
          data = {
            detail: [error.message],
          };
        }
        dispatch(actions.apiCallFailed(data));
        if (onFailed)
          dispatch({
            type: onFailed,
            payload: data,
          });
      } else {
        dispatch(actions.apiCallFailed("error.message"));
        if (onFailed) dispatch({ type: onFailed, payload: { message: "man" } });
      }
    }
  };

export default apiCall;
