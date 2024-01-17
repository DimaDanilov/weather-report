import React from "react";
import styled from "styled-components";
import { WeekForecast } from "./weather_sections/WeekForecast";
import { WeatherType } from "./weather_sections/WeatherType";
import { WeatherInfo } from "./weather_sections/WeatherInfo";
import { useSelector } from "react-redux";

export const MainPage = () => {
  const coordinates = useSelector(
    (state) => state.weatherReducer.currentLocation
  );

  return (
    <>
      {!coordinates.longitude || !coordinates.latitude ? (
        <WarningTitle>
          Accept geolocation to show weather in your city
        </WarningTitle>
      ) : (
        <></>
      )}
      <WeatherContainer>
        <WeatherType />
        <WeatherInfo />
        <WeekForecast />
      </WeatherContainer>
    </>
  );
};

const WarningTitle = styled.h1`
  margin: 10px 0;
  font-family: QuicksandRegular;
  font-weight: normal;
  font-size: 40px;
`;

const WeatherContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 5vh 5%;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5%;
  @media (min-width: 768px) and (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
    gap: 2%;
    padding: 2vh 5%;
    grid-template-areas:
      ". ."
      "WEEK WEEK";
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2%;
    padding: 2vh 5%;
    & div:nth-child(1) {
      order: 2;
    }
    & div:nth-child(2) {
      order: 1;
    }
    & div:nth-child(3) {
      order: 3;
    }
  }
`;
