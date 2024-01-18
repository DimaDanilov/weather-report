import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "@store/reducers/rootReducer";

let store = configureStore({ reducer: rootReducer });
export type AppDispatch = typeof store.dispatch;

export default store;
