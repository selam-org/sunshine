import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import apiCall from "./middleware/apiCall";

const configureSt = () =>
  configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiCall), // Add custom middleware to the default middleware stack
    });
export default configureSt;