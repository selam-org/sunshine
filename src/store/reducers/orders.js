import { createSlice, createSelector } from "@reduxjs/toolkit";
import * as action from "../api";

const initialState = {
  orderCalculateDetail: null,
  calculateLoading: false,
  calculateDetailError: null,
  createOrderLoading: false,
  createOrderError: null,
  createdOrder: null,
  createOrderSuccess: false,
  isCreateOrderModalOpen: false,
  isPrintOrderModalOpen: false,
  orders: [],
  getOrdersLoading: false,
  getOrdersError: null,
  deleteOrderLoading: false,
  deleteOrderError: null,
};

const slice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    calculateStart: (orders, action) => {
      orders.calculateLoading = true;
      orders.calculateDetailError = null;
      orders.orderCalculateDetail = null;
    },
    calculateSuccess: (orders, action) => {
      console.log("calculate success", action.payload);

      orders.orderCalculateDetail = action.payload;
      orders.calculateLoading = false;
      orders.calculateDetailError = null;
    },
    calculateFailed: (orders, action) => {
      orders.calculateLoading = false;
      orders.calculateDetailError = action.payload;
    },
    setOrderCalculateDetail: (orders, action) => {
      orders.orderCalculateDetail = action.payload;
    },

    createOrderStart: (orders, action) => {
      orders.createOrderLoading = true;
      orders.createOrderError = null;
    },
    createOrderSuccess: (orders, action) => {
      console.log("create order success", action.payload);
      orders.createOrderLoading = false;
      orders.createOrderError = null;
      orders.createdOrder = action.payload;
      orders.createOrderSuccess = true;
      orders.isCreateOrderModalOpen = false;
      orders.isPrintOrderModalOpen = true;
    },
    createOrderFailed: (orders, action) => {
      orders.createOrderLoading = false;
      orders.createOrderError = action.payload;
    },
    setIsCreateOrderModalOpen: (orders, action) => {
      orders.isCreateOrderModalOpen = action.payload.open;
    },
    setIsPrintOrderModalOpen: (orders, action) => {
      orders.isPrintOrderModalOpen = action.payload.open;
    },
    resetState: (orders, action) => {
      //   Object.assign(orders, initialState);
      return initialState;
    },

    getOrdersStart: (orders, action) => {
      orders.getOrdersLoading = true;
      orders.getOrdersError = null;
    },

    getOrdersSuccess: (orders, action) => {
      orders.getOrdersLoading = false;
      orders.getOrdersError = null;
      orders.orders = action.payload;
    },
    getOrdersFailed: (orders, action) => {
      orders.getOrdersLoading = false;
      orders.getOrdersError = action.payload;
    },

    deleteOrderStart: (orders, action) => {
      orders.deleteOrderLoading = true;
      orders.deleteOrderError = null;
    },
    deleteOrderSuccess: (orders, action) => {
      orders.deleteOrderLoading = false;
      orders.deleteOrderError = null;
      
    },
    deleteOrderFailed: (orders, action) => {
      orders.deleteOrderLoading = false;
      orders.deleteOrderError = action.payload;
    },
  },
});

export const {
  getOrdersStart,
  getOrdersSuccess,
  getOrdersFailed,
  resetState,
  setIsPrintOrderModalOpen,
  setIsCreateOrderModalOpen,
  createOrderFailed,
  createOrderStart,
  createOrderSuccess,
  setOrderCalculateDetail,
  calculateStart,
  calculateSuccess,
  calculateFailed,
} = slice.actions;

export const getOrdersApiCall = (params) => (dispatch, getState) => {
  dispatch(
    action.apiCallBegan({
      url: "order",
      onStart: getOrdersStart.type,
      onSuccess: getOrdersSuccess.type,
      onFailed: getOrdersFailed.type,
      params,
      method: "get",
    })
  );
};

export const calculateOrderApiCall = (data) => (dispatch, getState) => {
  console.log("data cal", data);
  dispatch(
    action.apiCallBegan({
      url: "order/calculate",
      onStart: calculateStart.type,
      onSuccess: calculateSuccess.type,
      onFailed: calculateFailed.type,
      data,
      method: "post",
    })
  );
};
export const createOrderApiCall = (data) => (dispatch, getState) => {
  console.log("data create", data);
  dispatch(
    action.apiCallBegan({
      url: "order",
      onStart: createOrderStart.type,
      onSuccess: createOrderSuccess.type,
      onFailed: createOrderFailed.type,
      data,
      method: "post",
    })
  );
};
export default slice.reducer;

export const getCalculateDetail = createSelector(
  (state) => state.entities.orders.orderCalculateDetail,
  (detail) => detail
);

export const getCalculateLoading = createSelector(
  (state) => state.entities.orders.calculateLoading,
  (loading) => loading
);
export const getCreateOrderLoading = createSelector(
  (state) => state.entities.orders.createOrderLoading,
  (loading) => loading
);
export const getCreateOrderSuccess = createSelector(
  (state) => state.entities.orders.createOrderSuccess,
  (success) => success
);
export const getCreateOrderError = createSelector(
  (state) => state.entities.orders.createOrderError,
  (error) => error
);

export const getCreatedOrder = createSelector(
  (state) => state.entities.orders.createdOrder,
  (order) => order
);

export const getIsCreateOrderModalOpen = createSelector(
  (state) => state.entities.orders.isCreateOrderModalOpen,
  (open) => open
);

export const getIsPrintOrderModalOpen = createSelector(
  (state) => state.entities.orders.isPrintOrderModalOpen,
  (open) => open
);


export const getOrders = createSelector(
  (state) => state.entities.orders.orders,
  (orders) => orders
);

export const getOrdersLoading = createSelector(
  (state) => state.entities.orders.getOrdersLoading,
  (getOrdersLoading) => getOrdersLoading
)

export const getOrdersError = createSelector(
  (state) => state.entities.orders.getOrdersError,
  (error) => error
)
