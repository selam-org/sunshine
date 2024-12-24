import { createSlice, createSelector } from "@reduxjs/toolkit";
import * as action from "../api";

const initialState = {
  senders: [],

  sendersDialog: false,
  sendersLoading: false,
  sendersError: null,

  sender: null,

  addSenderDialog: false,
  addSenderLoading: false,
  addSenderError: null,

  updateSenderDialog: false,
  updateSenderLoading: false,
  updateSenderError: null,

  beneficiary: null,

  addBeneficiaryModal: false,
  addBeneficiaryLoading: false,
  addBeneficiaryError: null,

  updateBeneficiaryModal: false,
  updateBeneficiaryLoading: false,
  updateBeneficiaryError: null,

  addBankDetailModal: false,
  addBankDetailLoading: false,
  addBankDetailError: null,
};

const slice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setSenderIsDialog: (senders, action) => {
      senders.sendersDialog = action.payload.open;
    },
    getSendersStart: (senders, action) => {
      senders.sendersLoading = true;
      senders.sendersError = null;
      senders.sendersDialog = true;
    },
    getSendersSuccess: (senders, action) => {
      console.log("sender get", action.payload);
      senders.senders = action.payload;
      senders.sendersLoading = false;
      senders.sendersError = null;
    },
    getSendersFailed: (senders, action) => {
      senders.sendersLoading = false;
      senders.sendersError = action.payload;
    },

    setAddSenderDialog: (senders, action) => {
      senders.addSenderDialog = action.payload.open;
    },
    addSenderStart: (senders, action) => {
      senders.addSenderLoading = true;
      senders.addSenderError = null;
    },
    addSenderSuccess: (senders, action) => {
      senders.addSenderLoading = false;
      senders.addSenderError = null;
      senders.addSenderDialog = false;
      senders.sender = action.payload;
      // Update the senders list with the new sender
      const sender = action.payload;
      sender.receivers = [];
      senders.senders = [...senders.senders, action.payload];
    },
    addSenderFailed: (senders, action) => {
      senders.addSenderLoading = false;
      senders.addSenderError = action.payload;
    },

    setSender: (senders, action) => {
      senders.sender = action.payload;
    },

    setUpdateSenderDialog: (senders, action) => {
      senders.updateSenderDialog = action.payload.open;
    },
    updateSenderStart: (senders, action) => {
      senders.updateSenderLoading = true;
      senders.updateSenderError = null;
    },
    updateSenderSuccess: (senders, action) => {
      senders.updateSenderLoading = false;
      senders.updateSenderError = null;
      senders.updateSenderDialog = false;
      senders.sender = action.payload;
      // Update the senders list with the new sender
      const sender = action.payload;
      sender.receivers = [];
      senders.senders = [...senders.senders, action.payload];
    },
    updateSenderFailed: (senders, action) => {
      senders.updateSenderLoading = false;
      senders.updateSenderError = action.payload;
    },

    setAddBeneficiaryModal: (senders, action) => {
      senders.addBeneficiaryModal = action.payload.open;
    },
    addBeneficiaryStart: (senders, action) => {
      senders.addBeneficiaryLoading = true;
      senders.addBeneficiaryError = null;
    },
    addBeneficiaryError: (senders, action) => {
      senders.addBeneficiaryLoading = false;
      senders.addBeneficiaryError = action.payload;
    },
    addBeneficiarySuccess: (senders, action) => {
      senders.addBeneficiaryLoading = false;
      senders.addBeneficiaryError = null;
      senders.addBeneficiaryModal = false;
      senders.beneficiary = action.payload;
      if (senders.sender) {
        console.log("sender", senders.sender);
        senders.sender.receivers = [
          ...senders.sender.receivers,
          action.payload,
        ];

        // Update the sender in the senders list
        senders.senders = senders.senders.map((s) =>
          s.id === senders.sender.id ? senders.sender : s
        );
      }
    },

    setBeneficiary: (senders, action) => {
      senders.beneficiary = action.payload;
    },

    addBankDetailStart: (senders, action) => {
      senders.addBankDetailLoading = true;
      senders.addBankDetailError = null;
    },
    addBankDetailFailed: (senders, action) => {
      senders.addBankDetailLoading = false;
      senders.addBankDetailError = action.payload;
    },
    addBankDetailSuccess: (senders, action) => {
      senders.addBankDetailLoading = false;
      senders.addBankDetailError = null;
      senders.addBankDetailModal = false;

      if (senders.beneficiary) {
        // Filter out any existing bank with the same name as the payload
        senders.beneficiary.accounts = senders.beneficiary.accounts.filter(
          (account) => account.bank !== action.payload.bank
        );
        // Add the new bank detail to the accounts
        senders.beneficiary.accounts = [
          ...senders.beneficiary.accounts,
          action.payload,
        ];
        // Set the new bank detail as the default bank
        senders.beneficiary.default_bank = action.payload;

        // Update the beneficiary in the sender's receivers list
        if (senders.sender) {
          senders.sender.receivers = senders.sender.receivers.map((receiver) =>
            receiver.id === senders.beneficiary.id
              ? {
                  ...receiver,
                  accounts: senders.beneficiary.accounts,
                  default_bank: action.payload,
                }
              : receiver
          );
          // Update the sender in the senders list
          senders.senders = senders.senders.map((s) =>
            s.id === senders.sender.id ? senders.sender : s
          );
        }
      }
    },
    setDefaultBank: (senders, action) => {
      senders.beneficiary.default_bank = action.payload;
      if (senders.sender) {
        senders.sender.receivers = senders.sender.receivers.map((receiver) =>
          receiver.id === senders.beneficiary.id
            ? { ...receiver, default_bank: action.payload }
            : receiver
        );
        senders.senders = senders.senders.map((s) =>
          s.id === senders.sender.id ? senders.sender : s
        );
      }
    },
    setAddBankDetailModal: (senders, action) => {
      senders.addBankDetailModal = action.payload.open;
    },

    setUpdateBeneficiaryModal: (senders, action) => {
      senders.updateBeneficiaryModal = action.payload.open;
    },

    updateBeneficiaryStart: (senders, action) => {
      senders.updateBeneficiaryLoading = true;
      senders.updateBeneficiaryError = null;
    },

    updateBeneficiaryError: (senders, action) => {
      senders.updateBeneficiaryLoading = false;
      senders.updateBeneficiaryError = action.payload;
    },

    updateBeneficiarySuccess: (senders, action) => {
      senders.updateBeneficiaryLoading = false;
      senders.updateBeneficiaryError = null;
      senders.updateBeneficiaryModal = false;
      senders.beneficiary = action.payload;
      if (senders.sender) {
        console.log("sender", senders.sender);
        senders.sender.receivers = [
          ...senders.sender.receivers,
          action.payload,
        ];

        // Update the sender in the senders list
        senders.senders = senders.senders.map((s) =>
          s.id === senders.sender.id ? senders.sender : s
        );
      }
    },

    setSendersForNext: (senders, action) => {
      senders.senders = [senders.sender];
      senders.beneficiary = null;
    },
  },
});

export const {
  setSendersForNext,
  setDefaultBank,
  setAddBankDetailModal,
  setBeneficiary,
  setSender,
  getSendersStart,
  getSendersSuccess,
  getSendersFailed,
  setSenderIsDialog,
  setAddSenderDialog,
  setAddBeneficiaryModal,
  addSenderStart,
  addSenderSuccess,
  addSenderFailed,
  addBeneficiaryError,
  addBeneficiarySuccess,
  addBeneficiaryStart,
  addBankDetailFailed,
  addBankDetailSuccess,
  addBankDetailStart,

  setUpdateBeneficiaryModal,
  updateBeneficiaryStart,
  updateBeneficiaryError,
  updateBeneficiarySuccess,

  setUpdateSenderDialog,
  updateSenderStart,
  updateSenderSuccess,
  updateSenderFailed,
} = slice.actions;

export default slice.reducer;

export const getSendersApi = (params) => (dispatch, getState) => {
  dispatch(
    action.apiCallBegan({
      url: "sender",
      onStart: getSendersStart.type,
      onSuccess: getSendersSuccess.type,
      onFailed: getSendersFailed.type,
      params: params,
      method: "get",
    })
  );
};

export const addSenderApi = (data) => (dispatch, getState) => {
  console.log("data", data);
  dispatch(
    action.apiCallBegan({
      url: "sender",
      onStart: addSenderStart.type,
      onSuccess: addSenderSuccess.type,
      onFailed: addSenderFailed.type,
      data: data,
      method: "post",
    })
  );
};

export const updateSenderApi = (data, id) => (dispatch, getState) => {
  dispatch(
    action.apiCallBegan({
      url: `sender/${id}`,
      onStart: updateSenderStart.type,
      onSuccess: updateSenderSuccess.type,
      onFailed: updateSenderFailed.type,
      data: data,
      method: "post",
    })
  );
};

export const addBeneficiaryApi = (data) => (dispatch, getState) => {
  dispatch(
    action.apiCallBegan({
      url: "receiver/",
      onStart: addBeneficiaryStart.type,
      onSuccess: addBeneficiarySuccess.type,
      onFailed: addBeneficiaryError.type,
      data: data,
      method: "post",
    })
  );
};

export const updateBeneficiaryApi = (data, id) => (dispatch, getState) => {
  dispatch(
    action.apiCallBegan({
      url: `receiver/${id}`,
      onStart: updateBeneficiaryStart.type,
      onSuccess: updateBeneficiarySuccess.type,
      onFailed: updateBeneficiaryError.type,
      data: data,
      method: "post",
    })
  );
};

export const addBankDetailApi = (data, id) => (dispatch, getState) => {
  dispatch(
    action.apiCallBegan({
      url: `receiver/${id}/bank`,
      onStart: addBankDetailStart.type,
      onSuccess: addBankDetailSuccess.type,
      onFailed: addBankDetailFailed.type,
      data: data,
      method: "post",
    })
  );
};

export const isSendersDialogOpen = createSelector(
  (state) => state.entities.senders.sendersDialog,
  (sendersDialog) => sendersDialog
);

export const isAddSenderDialogOpen = createSelector(
  (state) => state.entities.senders.addSenderDialog,
  (addSenderDialog) => addSenderDialog
);

export const isUpdateSenderDialogOpen = createSelector(
  (state) => state.entities.senders.updateSenderDialog,
  (updateSenderDialog) => updateSenderDialog
);

export const isAddBeneficiaryModalOpen = createSelector(
  (state) => state.entities.senders.addBeneficiaryModal,
  (addBeneficiaryModal) => addBeneficiaryModal
);

export const isUpdateBeneficiaryModalOpen = createSelector(
  (state) => state.entities.senders.updateBeneficiaryModal,
  (updateBeneficiaryModal) => updateBeneficiaryModal
);

export const getSenders = createSelector(
  (state) => state.entities.senders.senders,
  (senders) => senders
);

export const getSendersLoading = createSelector(
  (state) => state.entities.senders.sendersLoading,
  (sendersLoading) => sendersLoading
);

export const getAddSenderLoading = createSelector(
  (state) => state.entities.senders.addSenderLoading,
  (addSenderLoading) => addSenderLoading
);

export const getAddSenderError = createSelector(
  (state) => state.entities.senders.addSenderError,
  (addSenderError) => addSenderError
);

export const getUpdateSenderLoading = createSelector(
  (state) => state.entities.senders.updateSenderLoading,
  (updateSenderLoading) => updateSenderLoading
);

export const getUpdateSenderError = createSelector(
  (state) => state.entities.senders.updateSenderError,
  (updateSenderError) => updateSenderError
);

export const getSender = createSelector(
  (state) => state.entities.senders.sender,
  (sender) => sender
);

export const getBeneficiary = createSelector(
  (state) => state.entities.senders.beneficiary,
  (beneficiary) => beneficiary
);

export const getAddBeneficiaryLoading = createSelector(
  (state) => state.entities.senders.addBeneficiaryLoading,
  (addBeneficiaryLoading) => addBeneficiaryLoading
);

export const getAddBeneficiaryError = createSelector(
  (state) => state.entities.senders.addBeneficiaryError,
  (addBeneficiaryError) => addBeneficiaryError
);

export const getUpdateBeneficiaryLoading = createSelector(
  (state) => state.entities.senders.updateBeneficiaryLoading,
  (updateBeneficiaryLoading) => updateBeneficiaryLoading
);

export const getUpdateBeneficiaryError = createSelector(
  (state) => state.entities.senders.updateBeneficiaryError,
  (updateBeneficiaryError) => updateBeneficiaryError
);

export const getAddBankDetailLoading = createSelector(
  (state) => state.entities.senders.addBankDetailLoading,
  (addBankDetailLoading) => addBankDetailLoading
);

export const getAddBankDetailError = createSelector(
  (state) => state.entities.senders.addBankDetailError,
  (addBankDetailError) => addBankDetailError
);

export const isAddBankDetailModalOpen = createSelector(
  (state) => state.entities.senders.addBankDetailModal,
  (addBankDetailModal) => addBankDetailModal
);
