import * as actions from "../api";
import axios from "axios";
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
    console.log(params, "params");
    if (onStart) dispatch({ type: onStart });
    next(action);
    try {
      // const response = await axios.request({
      //   baseURL: "http://127.0.0.1:8000/",
      //   url,
      //   method,
      //   data,
      //   params,
      //   headers,
      // });
      await sleep(4000);
      let response;
      if (url == "senders/") {
        response = { data: [1] };
      }
      //   console.log(response.data, 'here', method, url, response);
      dispatch(actions.apiCallSuccess(response.data));
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
      console.log(onSuccess, response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("here in 401");
        // dispatch(logout());
      }
      if (error.isAxiosError) {
        console.log(error, "error");
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
