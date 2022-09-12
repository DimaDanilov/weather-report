import styled from "styled-components";
import sunImg from "../assets/images/sun_small.png";
import sunCloudImg from "../assets/images/sun_cloud_small.png";
import cloudsImg from "../assets/images/clouds_small.png";
import drizzleImg from "../assets/images/drizzle_small.png";
import rainImg from "../assets/images/rain_small.png";
import thunderImg from "../assets/images/thunder_small.png";
import snowImg from "../assets/images/snow_small.png";
import defaultImg from "../assets/images/default_small.png";
import { CheckWeatherPrior } from "./staff/WeatherPrior";

const WEEK_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const PRIOR_WEATHER_IMAGES = [sunImg, sunCloudImg, cloudsImg, drizzleImg, rainImg, thunderImg, snowImg, defaultImg]

export const WeatherDayInfo = ({ date, dayInfo }) => {
    // Get current day of the week (Monday, Tuesday etc.)
    let dateFormatted = new Date(date);
    let dayOfTheWeek = WEEK_DAYS[dateFormatted.getDay()];

    let maxTemperature = null;
    let maxWeatherPrior = null;

    dayInfo.forEach(
        timePeriod => {
            // Search of prior type of weather per day (Snow, Rain, Clear, etc.)
            let timePeriodPrior = CheckWeatherPrior(timePeriod.weatherID)
            if (timePeriodPrior > maxWeatherPrior) {
                maxWeatherPrior = timePeriodPrior;
            }
            // Search of max temperature per day
            if (maxTemperature < timePeriod.temp) {
                maxTemperature = timePeriod.temp
            }
        }
    )

    return <OneDayContainer>
        <DayImg src={PRIOR_WEATHER_IMAGES[maxWeatherPrior]} />
        <DayDate>{dayOfTheWeek}</DayDate>
        <DayTemperature>{Math.round(maxTemperature)}°</DayTemperature>
    </OneDayContainer>
}

const OneDayContainer = styled.div`
    display: grid;
    grid-template-areas:
    "A B"
    "A C";
    grid-template-columns: 2fr 5fr;
    padding: 5% 10%;
    gap: 5px;
    border-bottom: 1px solid black
`;
const DayImg = styled.img`
    width: 100%;
    margin: auto;
    grid-area: A;
`;
const DayDate = styled.h1`
    margin: 5px 0;
    font-size: 25px;
    font-family: QuicksandLight;
    grid-area: B;
`;
const DayTemperature = styled.h1`
    margin: 5px 0;
    font-size: 25px;
    font-family: QuicksandLight;
    grid-area: C;
`;