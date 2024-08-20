import { combineReducers } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import senders from "./reducers/senders";
import orders from "./reducers/orders";
const sendersPersistConfig = {
  key: "senders 0.3",
  version: 0.1,
  storage: storage,
  stateReconciler: autoMergeLevel2,
  blacklist: [
    "senders",

    "sendersLoading",
    "sendersError",
    "sendersDialog",
    "addSenderDialog",
    "addBeneficiaryModal",
    "addSenderLoading",
    "addSenderError",
    "addBeneficiaryLoading",
    "addBeneficiaryError",
    "beneficiary",
  ],
};

const ordersPersistConfig = {
  key: "orders 0.4",
  version: 0.2,
  storage: storage,
  stateReconciler: autoMergeLevel2,
  blacklist: [
    "getOrdersLoading",
    "getOrdersError",
    "orders",

    "calculateLoading",
    "calculateDetailError",
    "orderCalculateDetail",
    "createOrderLoading",
    "createOrderSuccess",
    "isPrintOrderModalOpen",
    "createOrderError",
    "createdOrder",
    "isCreateOrderModalOpen",
  ],
};

export default combineReducers({
  // auth: persistReducer(authPersistConfig, auth),
  senders: persistReducer(sendersPersistConfig, senders),
  orders: persistReducer(ordersPersistConfig, orders),
});
