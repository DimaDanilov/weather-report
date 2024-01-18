import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWeatherForWeek } from "@api/WeatherApi";
import { CheckWeatherPrior } from "@components/MainPage/staff/WeatherPrior";
import sunImg from "@images/sun_small.png";
import sunCloudImg from "@images/sun_cloud_small.png";
import cloudsImg from "@images/clouds_small.png";
import drizzleImg from "@images/drizzle_small.png";
import rainImg from "@images/rain_small.png";
import thunderImg from "@images/thunder_small.png";
import snowImg from "@images/snow_small.png";
import defaultImg from "@images/default_small.png";
import { Loader } from "@components/MainPage/staff/Loader";
import { IRootState } from "@store/reducers/rootReducer";
import { AppDispatch } from "@store/store";
import { WeatherWeekElement } from "@customTypes/WeatherModel";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const PRIOR_WEATHER_IMAGES = [
  sunImg,
  sunCloudImg,
  cloudsImg,
  drizzleImg,
  rainImg,
  thunderImg,
  snowImg,
  defaultImg,
];

interface WeatherDayInfoProps {
  date: string;
  dayInfo: WeatherWeekElement[];
}

export const WeekForecast = () => {
  const dispatch = useDispatch<AppDispatch>();

  const coordinates = useSelector(
    (state: IRootState) => state.weather.currentLocation
  );
  const weatherWeek = useSelector(
    (state: IRootState) => state.weather.weatherWeek
  );

  useEffect(() => {
    if (
      weatherWeek.length === 0 &&
      coordinates.longitude &&
      coordinates.latitude
    ) {
      dispatch(
        getWeatherForWeek({
          longitude: coordinates.longitude,
          latitude: coordinates.latitude,
        })
      );
    }
  });

  const weekForecast = weatherWeek
    ? weatherWeek.map((day) => (
        <WeatherDayInfo key={day.date} date={day.date} dayInfo={day.data} />
      ))
    : "";

  return weatherWeek ? (
    <WeekContainer>{weekForecast}</WeekContainer>
  ) : (
    <Loader />
  );
};

const WeatherDayInfo = ({ date, dayInfo }: WeatherDayInfoProps) => {
  // Get current day of the week (Monday, Tuesday etc.)
  const dateFormatted = new Date(date);
  const dayOfTheWeek = WEEK_DAYS[dateFormatted.getDay()];

  let maxTemperature: null | number = null;
  let maxWeatherIDPrior: number | null = null;
  let maxWeatherDescriptionPrior: string = "";

  dayInfo.forEach((timePeriod: WeatherWeekElement) => {
    // Search of prior type of weather per day (Snow, Rain, Clear, etc.)
    let timePeriodIDPrior = CheckWeatherPrior(timePeriod.weatherID);
    if (!maxWeatherIDPrior || timePeriodIDPrior > maxWeatherIDPrior) {
      maxWeatherIDPrior = timePeriodIDPrior;
      maxWeatherDescriptionPrior = timePeriod.weatherDescription;
    }
    // Search of max temperature per day
    if (maxTemperature === null) {
      maxTemperature = timePeriod.temperature;
    } else if (maxTemperature < timePeriod.temperature) {
      maxTemperature = timePeriod.temperature;
    }
  });

  return (
    <OneDayContainer>
      <DayOfTheWeek>{dayOfTheWeek}</DayOfTheWeek>
      <WeatherImg src={PRIOR_WEATHER_IMAGES[maxWeatherIDPrior || 0]} />
      <WeatherDescription>{maxWeatherDescriptionPrior}</WeatherDescription>
      <Temperature>
        {maxTemperature ? Math.round(maxTemperature) : NaN}°
      </Temperature>
    </OneDayContainer>
  );
};

const WeekContainer = styled.div`
  width: 100%;
  @media (min-width: 768px) and (max-width: 1200px) {
    grid-area: WEEK;
  }
`;
const OneDayContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 2fr 2fr;
  gap: 5px;
  border-bottom: 1px solid black;
  align-items: center;
  padding: 5% 0;
  @media (min-width: 768px) and (max-width: 1200px) {
    padding: 2% 0;
  }
`;
const DayOfTheWeek = styled.h1`
  font-size: 28px;
  font-family: QuicksandLight;
  font-weight: normal;
  margin: 0 auto;
`;
const WeatherImg = styled.img`
  width: 50px;
  height: 50px;
  margin: 0 auto;
`;
const WeatherDescription = styled.h1`
  font-size: 28px;
  font-family: QuicksandLight;
  font-weight: normal;
  margin: 0 auto;
`;
const Temperature = styled.h1`
  font-size: 36px;
  font-family: QuicksandRegular;
  font-weight: 300;
  margin: 0 auto;
`;
