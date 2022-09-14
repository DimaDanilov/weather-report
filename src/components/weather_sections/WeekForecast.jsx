import styled from "styled-components";
import sunImg from "../../assets/images/sun_small.png";
import sunCloudImg from "../../assets/images/sun_cloud_small.png";
import cloudsImg from "../../assets/images/clouds_small.png";
import drizzleImg from "../../assets/images/drizzle_small.png";
import rainImg from "../../assets/images/rain_small.png";
import thunderImg from "../../assets/images/thunder_small.png";
import snowImg from "../../assets/images/snow_small.png";
import defaultImg from "../../assets/images/default_small.png";
import { CheckWeatherPrior } from "../staff/WeatherPrior";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const PRIOR_WEATHER_IMAGES = [sunImg, sunCloudImg, cloudsImg, drizzleImg, rainImg, thunderImg, snowImg, defaultImg]

export const WeekForecast = ({ weatherWeek }) => {
    const weekForecast = weatherWeek ? Object.entries(weatherWeek).map(
        ([date, dayInfo]) => <WeatherDayInfo date={date} dayInfo={dayInfo} />
    ) : ""

    return <WeekContainer>{weekForecast}</WeekContainer>
}

const WeatherDayInfo = ({ date, dayInfo }) => {
    // Get current day of the week (Monday, Tuesday etc.)
    const dateFormatted = new Date(date);
    const dayOfTheWeek = WEEK_DAYS[dateFormatted.getDay()];

    let maxTemperature = null;
    let maxWeatherIDPrior = null;
    let maxWeatherDescriptionPrior = null;

    dayInfo.forEach(
        timePeriod => {
            // Search of prior type of weather per day (Snow, Rain, Clear, etc.)
            let timePeriodIDPrior = CheckWeatherPrior(timePeriod.weatherID)
            if (timePeriodIDPrior > maxWeatherIDPrior) {
                maxWeatherIDPrior = timePeriodIDPrior;
                maxWeatherDescriptionPrior = timePeriod.weatherDescription
            }
            // Search of max temperature per day
            if (maxTemperature < timePeriod.temp) {
                maxTemperature = timePeriod.temp
            }
        }
    )

    return <OneDayContainer>
        <DayOfTheWeek>{dayOfTheWeek}</DayOfTheWeek>
        <WeatherImg src={PRIOR_WEATHER_IMAGES[maxWeatherIDPrior]} />
        <WeatherDescription>{maxWeatherDescriptionPrior}</WeatherDescription>
        <Temperature>{Math.round(maxTemperature)}°</Temperature>
    </OneDayContainer>
}

const WeekContainer = styled.div`
    width: 100%;
`;
const OneDayContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr 2fr 2fr;
    gap: 5px;
    border-bottom: 1px solid black;
    align-items: center;
    padding: 5% 0;
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