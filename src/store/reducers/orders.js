import { createSlice, createSelector } from "@reduxjs/toolkit";
import * as action from "../api";

const initialState = {
  rateRange: null,
  rateRangeLoading: false,
  rateRangeError: null,
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
  detailOrderModalVisible: {},
  deleteOrderLoading: false,
  deleteOrderError: null,
  deleteOrderSuccess: false,
  updateOrderLoading: false,
  updateOrderError: null,
};

const slice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    getRateRangeStart: (orders, action) => {
      orders.rateRangeLoading = true;
      orders.rateRangeError = null;
      orders.rateRange = null;
    },
    getRateRangeSuccess: (orders, action) => {
      console.log("range rate success", action.payload);

      orders.rateRange = action.payload;
      orders.rateRangeLoading = false;
      orders.rateRangeError = null;
    },
    getRateRangeFailed: (orders, action) => {
      orders.rateRangeLoading = false;
      orders.rateRangeError = action.payload;
    },

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
      return {
        ...initialState,
        orderCalculateDetail: orders.orderCalculateDetail,
        rateRange: orders.rateRange,
      };
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
      orders.detailOrderModalVisible[action.payload.id] = false;
      orders.orders = orders.orders.filter(
        (order) => order.id !== action.payload.id
      );
    },
    deleteOrderFailed: (orders, action) => {
      orders.deleteOrderLoading = false;
      orders.deleteOrderError = action.payload;
    },
    setDetailOrderModalVisible: (orders, action) => {
      orders.detailOrderModalVisible[action.payload.id] = action.payload.open;
    },

    setDeleteOrderError: (orders, action) => {
      orders.deleteOrderError = action.payload;
    },

    updateOrderStart: (orders, action) => {
      orders.updateOrderLoading = true;
      orders.updateOrderError = null;
    },
    updateOrderSuccess: (orders, action) => {
      orders.updateOrderLoading = false;
      orders.updateOrderError = null;
      orders.orders = orders.orders.map((order) => {
        if (order.id === action.payload.id) {
          return action.payload;
        }
        return order;
      });
    },
    updateOrderFailed: (orders, action) => {
      orders.updateOrderLoading = false;
      orders.updateOrderError = action.payload;
    },
  },
});

export const {
  updateOrderStart,
  updateOrderSuccess,
  updateOrderFailed,
  setDeleteOrderError,
  deleteOrderStart,
  deleteOrderFailed,
  deleteOrderSuccess,
  setDetailOrderModalVisible,
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
  getRateRangeStart,
  getRateRangeSuccess,
  getRateRangeFailed,
} = slice.actions;

export const getRateRangeApiCall = (id) => (dispatch, getState) => {
  dispatch(
    action.apiCallBegan({
      url: `rate/`,
      onStart: getRateRangeStart.type,
      onSuccess: getRateRangeSuccess.type,
      onFailed: getRateRangeFailed.type,
      method: "get",
    })
  );
};

export const deleteOrderApiCall = (id) => (dispatch, getState) => {
  dispatch(
    action.apiCallBegan({
      url: `order/${id}`,
      onStart: deleteOrderStart.type,
      onSuccess: deleteOrderSuccess.type,
      onFailed: deleteOrderFailed.type,
      data: { status: "void" },
      method: "post",
    })
  );
};

export const updateOrderApiCall = (data, id) => (dispatch, getState) => {
  dispatch(
    action.apiCallBegan({
      url: `order/${id}`,
      onStart: updateOrderStart.type,
      onSuccess: updateOrderSuccess.type,
      onFailed: updateOrderFailed.type,
      data,
      method: "post",
    })
  );
};

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
  console.log("order data create", data);
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

export const getRateRange = createSelector(
  (state) => state.entities.orders.rateRange,
  (rateRange) => rateRange
);

export const getRateRangeLoading = createSelector(
  (state) => state.entities.orders.rateRangeLoading,
  (rateRange) => rateRange
);

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
);

export const getOrdersError = createSelector(
  (state) => state.entities.orders.getOrdersError,
  (error) => error
);

export const getDetailOrderModalVisible = createSelector(
  (state, id) => {
    return state.entities.orders.detailOrderModalVisible[id];
  },
  (detailOrderModalVisible) => detailOrderModalVisible
);

export const getDeleteOrderLoading = createSelector(
  (state) => state.entities.orders.deleteOrderLoading,
  (deleteOrderLoading) => deleteOrderLoading
);

export const getDeleteOrderError = createSelector(
  (state) => state.entities.orders.deleteOrderError,
  (deleteOrderError) => deleteOrderError
);

export const getDeleteOrderSuccess = createSelector(
  (state) => state.entities.orders.deleteOrderSuccess,
  (deleteOrderSuccess) => deleteOrderSuccess
);

export const getUpdateOrderLoading = createSelector(
  (state) => state.entities.orders.updateOrderLoading,
  (updateOrderLoading) => updateOrderLoading
);

export const getUpdateOrderError = createSelector(
  (state) => state.entities.orders.updateOrderError,
  (updateOrderError) => updateOrderError
);
