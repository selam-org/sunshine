import { createSlice, createSelector } from "@reduxjs/toolkit";
import * as action from "../api";
const initialState = {
  senders: [],
  sendersLoading: false,
  sendersError: null,
  sendersDialog: false,
};
const slice = createSlice({
  name: "senders",
  initialState,
  reducers: {
    getSendersStart: (senders, action) => {
      console.log("loading");
      senders.sendersLoading = true;
      senders.sendersError = null;
      senders.sendersDialog = true;
    },
    getSendersSuccess: (senders, action) => {
      console.log("here in loginSuccess", action.payload);
      senders.senders = action.payload;
      senders.sendersLoading = false;
      senders.sendersError = null;
    },
    getSendersFailed: (senders, action) => {
      console.log("here in loginFailed", action.payload);
      senders.sendersLoading = false;
      senders.sendersError = action.payload;
    },
    setSenderIsDialog: (senders, action) => {
      senders.sendersDialog = action.payload.open;
    },
  },
});

export const {
  getSendersStart,
  getSendersSuccess,
  getSendersFailed,
  setSenderIsDialog,
} = slice.actions;

export default slice.reducer;

export const getSendersApi = () => (dispatch, getState) => {
  dispatch(
    action.apiCallBegan({
      url: "senders/",
      onStart: getSendersStart.type,
      onSuccess: getSendersSuccess.type,
      onFailed: getSendersSuccess.type,
      //   data: data,
      method: "get",
    })
  );
};

export const isSendersDialogOpen = createSelector(
  (state) => state.entities.senders.sendersDialog,
  (sendersDialog) => sendersDialog
);
export const getSenders = createSelector(
  (state) => state.entities.senders.senders,
  (senders) => senders
);

export const getSendersLoading = createSelector(
  (state) => state.entities.senders.sendersLoading,
  (sendersLoading) => sendersLoading
);

// export const getIsLogin = createSelector(
//   (state) => state.entities.senders.logedIn,
//   (logedIn) => logedIn
// );
// export const isLoginLoading = createSelector(
//   (state) => state.entities.senders.loginLoading,
//   (loginLoading) => loginLoading
// );
// export const isLogoutLoading = createSelector(
//   (state) => state.entities.senders.isLogoutLoading,
//   (isLogoutLoading) => isLogoutLoading
// );

// export const getLoginError = createSelector(
//   (state) => state.entities.senders.loginError,
//   (loginError) => loginError
// );
