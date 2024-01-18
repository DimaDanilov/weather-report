import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconText } from "@ui/IconText";
import locationIcon from "@icons/location_icon.svg";
import humidityIcon from "@icons/humidity_icon.svg";
import windIcon from "@icons/wind_icon.svg";
import { Loader } from "@components/common/Loader";
import { IRootState } from "@store/reducers/rootReducer";
import { getWeatherForToday } from "@api/WeatherApi";
import { AppDispatch } from "@store/store";
import { MONTHS } from "@customTypes/DaysMonths";

export const TodayFullInfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const coordinates = useSelector(
    (state: IRootState) => state.weather.currentLocation
  );
  const weatherToday = useSelector(
    (state: IRootState) => state.weather.weatherToday
  );

  const currentDate = new Date(weatherToday.currentTimestamp * 1000);

  useEffect(() => {
    dispatch(
      getWeatherForToday({
        longitude: coordinates.longitude,
        latitude: coordinates.latitude,
      })
    );
  }, []);

  return weatherToday.temperature ? (
    <Container>
      <IconText
        imgSrc={locationIcon}
        textContent={weatherToday.city}
        margin="5px 0"
        fontSize="30px"
        fontFamily="MontserratRegular"
      />
      <Temperature>{Math.round(weatherToday.temperature)}°</Temperature>
      <TemperatureFeel>
        Feels like: {Math.round(weatherToday.temperatureFeel)}°
      </TemperatureFeel>
      <HumidityWindContainer>
        <IconText
          imgSrc={humidityIcon}
          textContent={weatherToday.humidity + "%"}
          fontSize="24px"
          fontFamily="MontserratLight"
        />
        <IconText
          imgSrc={windIcon}
          textContent={weatherToday.windSpeed + " m/s"}
          fontSize="24px"
          fontFamily="MontserratLight"
        />
      </HumidityWindContainer>
      <DateToday>{`${currentDate.getDate()} ${
        MONTHS[currentDate.getMonth()]
      }, ${currentDate.getFullYear()}`}</DateToday>
    </Container>
  ) : (
    <>
      <Loader />
    </>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Temperature = styled.h1`
  margin: 5px 0;
  font-size: 128px;
  font-family: QuicksandLight;
  font-weight: normal;
`;
const TemperatureFeel = styled.h1`
  margin: 5px 0;
  font-size: 48px;
  font-family: QuicksandLight;
  font-weight: normal;
`;
const HumidityWindContainer = styled.div`
  margin: 5px 0;
  display: flex;
  width: 100%;
  justify-content: space-around;
`;
const DateToday = styled.h1`
  margin: 5px 0;
  font-size: 26px;
  font-family: MontserratRegular;
  font-weight: 500;
`;
