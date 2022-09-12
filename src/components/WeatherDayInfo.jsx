import styled from "styled-components";
import sunImg from "../assets/images/sun_small.png";
import sunCloudImg from "../assets/images/sun_cloud_small.png";
import cloudsImg from "../assets/images/clouds_small.png";
import drizzleImg from "../assets/images/drizzle_small.png";
import rainImg from "../assets/images/rain_small.png";
import thunderImg from "../assets/images/thunder_small.png";
import snowImg from "../assets/images/snow_small.png";
import defaultImg from "../assets/images/default_small.png";

const WEEK_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// Prioritize type of weather
const PRIOR_WEATHER_IMAGES = [sunImg, sunCloudImg, cloudsImg, drizzleImg, rainImg, thunderImg, snowImg, defaultImg]
const CheckWeatherPrior = (code) => {
    if (code === "800")
        return 0
    if (code === "801")
        return 1
    else switch (code[0]) {
        case "8": return 2
        case "3": return 3
        case "5": return 4
        case "2": return 5
        case "6": return 6
        default: return 7
    }
}

export const WeatherDayInfo = (date) => {
    // Get current day of the week (Monday, Tuesday etc.)
    let dateFormatted = new Date(date.date);
    let dayOfTheWeek = WEEK_DAYS[dateFormatted.getDay()];

    let maxTemperature = null;
    let maxWeatherPrior = null;

    date.dayInfo.forEach(
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
    box-shadow: 0px 0px 10px gray;
    border-radius: 1vw;
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