import { combineReducers } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import senders from "./reducers/senders";
const sendersPersistConfig = {
  key: "senders 0.2",
  version: 0.1,
  storage: storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["sendersLoading", "sendersError", "sendersDialog", "senders"],
};

export default combineReducers({
  // auth: persistReducer(authPersistConfig, auth),
  senders: persistReducer(sendersPersistConfig, senders),
});
