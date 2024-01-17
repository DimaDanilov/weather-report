import { combineReducers } from "@reduxjs/toolkit";
import weatherReducer from "./weatherReducer";

export const rootReducer = combineReducers({ weather: weatherReducer });
export type IRootState = ReturnType<typeof rootReducer>;
