import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWeatherForToday } from "../../api/weather";
import { setGeoPositionAction } from "../../redux/reducers/weatherReducer";
import { IconText } from "../staff/IconText";
import locationIcon from "Public/icons/location_icon.svg";
import humidityIcon from "Public/icons/humidity_icon.svg";
import windIcon from "Public/icons/wind_icon.svg";
import { Loader } from "../staff/Loader";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Find current geolocation and send it to store
function getLocation(dispatch) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) =>
        dispatch(
          setGeoPositionAction(
            position.coords.latitude,
            position.coords.longitude
          )
        ),
      (error) => {
        if (error.PERMISSION_DENIED) {
          console.log(
            "The User have denied the request for Geolocation. Displayed info for Moscow."
          );
          dispatch(setGeoPositionAction(55.751244, 37.618423)); // Default weather Moscow
        }
      }
    );
  } else {
    console.log("The Browser Does not Support Geolocation");
  }
}

export const WeatherInfo = () => {
  const dispatch = useDispatch();

  const coordinates = useSelector(
    (state) => state.weatherReducer.currentLocation
  );
  const weatherToday = useSelector(
    (state) => state.weatherReducer.weatherToday
  );

  const currentDate = new Date(weatherToday.currentTimestamp * 1000);
  const currentTime =
    currentDate.getDate() +
    " " +
    MONTHS[currentDate.getMonth()] +
    ", " +
    currentDate.getFullYear();

  useEffect(() => {
    if (!coordinates.longitude || !coordinates.latitude) getLocation(dispatch);
    else {
      if (!weatherToday.temperature) {
        dispatch(
          getWeatherForToday(coordinates.longitude, coordinates.latitude)
        );
      }
    }
  });

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
      <DateToday>{currentTime}</DateToday>
    </Container>
  ) : (
    <Loader />
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
