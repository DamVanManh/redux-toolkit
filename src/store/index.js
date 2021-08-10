import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./reducers/todoSlice";
import { devToolsEnhancer } from "redux-devtools-extension";

// Store
const store = configureStore({
  reducer: {
    todosReducer,
  },
  devTools: [devToolsEnhancer({ realtime: true })],
});

export default store;
