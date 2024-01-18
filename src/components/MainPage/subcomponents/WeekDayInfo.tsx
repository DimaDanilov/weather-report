import React from "react";
import { WEEK_DAYS } from "@customTypes/DaysMonths";
import { WeatherWeekElement } from "@customTypes/WeatherModel";
import styled from "styled-components";
import sunImg from "@images/sun_small.png";
import sunCloudImg from "@images/sun_cloud_small.png";
import cloudsImg from "@images/clouds_small.png";
import drizzleImg from "@images/drizzle_small.png";
import rainImg from "@images/rain_small.png";
import thunderImg from "@images/thunder_small.png";
import snowImg from "@images/snow_small.png";
import defaultImg from "@images/default_small.png";
import { chooseDayWeatherToShow } from "@utils/chooseDayWeatherToShow";

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

interface WeekDayInfoProps {
  date: string;
  dayPeriods: WeatherWeekElement[];
}

export const WeekDayInfo = ({ date, dayPeriods }: WeekDayInfoProps) => {
  // Get current day of the week (Monday, Tuesday etc.) to show
  const dateFormatted = new Date(date);
  const dayOfTheWeek = WEEK_DAYS[dateFormatted.getDay()];

  // Select optimized params to show for exact day
  const { maxTemperature, maxWeatherIDPrior, maxWeatherDescriptionPrior } =
    chooseDayWeatherToShow(dayPeriods);

  return (
    <Container>
      <DayOfTheWeek>{dayOfTheWeek}</DayOfTheWeek>
      <WeatherImg src={PRIOR_WEATHER_IMAGES[maxWeatherIDPrior || 0]} />
      <WeatherDescription>{maxWeatherDescriptionPrior}</WeatherDescription>
      <Temperature>
        {maxTemperature ? Math.round(maxTemperature) : NaN}°
      </Temperature>
    </Container>
  );
};

const Container = styled.div`
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
