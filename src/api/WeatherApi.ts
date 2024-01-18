import axios from "axios";
import type {
  WeatherTodayModel,
  WeatherWeekModel,
} from "@customTypes/WeatherModel";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { WeatherAdapter } from "./WeatherAdapter";

const apiKey = `${process.env.REACT_APP_API_KEY}`;
const http = axios.create({
  baseURL: `${process.env.REACT_APP_API}/data/2.5`,
});

export const getWeatherForToday = createAsyncThunk(
  "users/fetchWeatherForToday",
  async ({ longitude, latitude }: { longitude: number; latitude: number }) => {
    const response = await http.get(
      `weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
    );
    return WeatherAdapter.transformDay(response.data) as WeatherTodayModel;
  }
);

export const getWeatherForWeek = createAsyncThunk(
  "users/fetchWeatherForWeek",
  async ({ longitude, latitude }: { longitude: number; latitude: number }) => {
    const response = await http.get(
      `forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
    );
    return WeatherAdapter.transformWeek(
      response.data.list
    ) as WeatherWeekModel[];
  }
);
