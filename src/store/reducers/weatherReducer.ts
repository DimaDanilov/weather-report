import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WeatherTodayModel, WeatherWeekModel } from "@customTypes/WeatherModel";
import { LocationModel } from "@customTypes/LocationModel";
import { getWeatherForToday, getWeatherForWeek } from "@api/WeatherApi";

interface WeatherState {
  currentLocation: LocationModel;
  weatherToday: WeatherTodayModel;
  weatherWeek: WeatherWeekModel[];
}

const initialState: WeatherState = {
  currentLocation: {} as LocationModel,
  weatherToday: {} as WeatherTodayModel,
  weatherWeek: [],
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setGeoPosition: (state, action: PayloadAction<LocationModel>) => {
      state.currentLocation = { ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getWeatherForToday.fulfilled,
      (state, action: PayloadAction<WeatherTodayModel>) => {
        state.weatherToday = { ...action.payload };
      }
    );
    builder.addCase(
      getWeatherForWeek.fulfilled,
      (state, action: PayloadAction<WeatherWeekModel[]>) => {
        state.weatherWeek = action.payload;
      }
    );
  },
});

export const { setGeoPosition } = weatherSlice.actions;

export default weatherSlice.reducer;
