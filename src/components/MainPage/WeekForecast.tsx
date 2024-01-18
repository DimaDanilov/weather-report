import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWeatherForWeek } from "@api/WeatherApi";
import { Loader } from "@components/common/Loader";
import { IRootState } from "@store/reducers/rootReducer";
import { AppDispatch } from "@store/store";
import { WeekDayInfo } from "./subcomponents/WeekDayInfo";

export const WeekForecast = () => {
  const dispatch = useDispatch<AppDispatch>();

  const coordinates = useSelector(
    (state: IRootState) => state.weather.currentLocation
  );
  const weatherWeek = useSelector(
    (state: IRootState) => state.weather.weatherWeek
  );

  useEffect(() => {
    dispatch(
      getWeatherForWeek({
        longitude: coordinates.longitude,
        latitude: coordinates.latitude,
      })
    );
  }, []);

  return weatherWeek.length !== 0 ? (
    <WeekContainer>
      {weatherWeek.map((day) => (
        <WeekDayInfo key={day.date} date={day.date} dayPeriods={day.data} />
      ))}
    </WeekContainer>
  ) : (
    <Loader />
  );
};

const WeekContainer = styled.div`
  width: 100%;
  @media (min-width: 768px) and (max-width: 1200px) {
    grid-area: WEEK;
  }
`;
