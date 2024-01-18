import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@store/reducers/rootReducer";
import { Today3DViewer } from "@components/MainPage/Today3DViewer";
import { TodayFullInfo } from "@components/MainPage/TodayFullInfo";
import { WeekForecast } from "@components/MainPage/WeekForecast";
import { AppDispatch } from "@store/store";
import { setGeoPosition } from "@store/reducers/weatherReducer";

export const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const coordinates = useSelector(
    (state: IRootState) => state.weather.currentLocation
  );

  useEffect(() => {
    // Find current geolocation and send it to store
    if (
      (!coordinates.longitude || !coordinates.latitude) &&
      navigator.geolocation
    ) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          dispatch(
            setGeoPosition({
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
            })
          ),
        (error) => {
          if (error.PERMISSION_DENIED) {
            console.log(
              "The User have denied the request for Geolocation. Displayed info for Moscow."
            );
            dispatch(
              setGeoPosition({
                latitude: 55.751244,
                longitude: 37.618423,
              })
            ); // Default weather for Moscow
          }
        }
      );
    } else {
      console.log("The Browser Does not Support Geolocation");
    }
  }, []);

  return (
    <>
      {!coordinates.longitude || !coordinates.latitude ? (
        <WarningTitle>
          Accept geolocation to show weather in your city
        </WarningTitle>
      ) : (
        <WeatherContainer>
          <Today3DViewer />
          <TodayFullInfo />
          <WeekForecast />
        </WeatherContainer>
      )}
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
