import type {
  WeatherTodayModel,
  WeatherWeekModel,
} from "@customTypes/WeatherModel";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { WeatherAdapter } from "@api/WeatherAdapter";
import { apiKey, axiosBase } from "@api/indexApi";

export const getWeatherForToday = createAsyncThunk(
  "users/fetchWeatherForToday",
  async ({ longitude, latitude }: { longitude: number; latitude: number }) => {
    const response = await axiosBase.get(
      `weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
    );
    return WeatherAdapter.transformDay(response.data) as WeatherTodayModel;
  }
);

export const getWeatherForWeek = createAsyncThunk(
  "users/fetchWeatherForWeek",
  async ({ longitude, latitude }: { longitude: number; latitude: number }) => {
    const response = await axiosBase.get(
      `forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
    );
    return WeatherAdapter.transformWeek(
      response.data.list
    ) as WeatherWeekModel[];
  }
);
