import React from "react";
import styled from "styled-components";
import { WeatherCanvas } from "@components/MainPage/3d/WeatherCanvas.jsx";
import { useSelector } from "react-redux";
import { Loader } from "@components/common/Loader";
import { IRootState } from "@store/reducers/rootReducer";

export const WeatherType = () => {
  const weatherToday = useSelector((state: IRootState) => {
    return state.weather.weatherToday;
  });

  return weatherToday.temperature ? (
    <div>
      <WeatherCanvas weatherCode={weatherToday.weatherID} />
      <TypeTitle>{weatherToday.weatherType}</TypeTitle>
    </div>
  ) : (
    <Loader />
  );
};

const TypeTitle = styled.h1`
  margin: 10px 0;
  font-family: QuicksandRegular;
  font-weight: normal;
  font-size: 40px;
`;
