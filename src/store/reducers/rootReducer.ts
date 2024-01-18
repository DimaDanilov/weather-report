import { combineReducers } from "@reduxjs/toolkit";
import weatherReducer from "@store/reducers/weatherReducer";

export const rootReducer = combineReducers({ weather: weatherReducer });
export type IRootState = ReturnType<typeof rootReducer>;
