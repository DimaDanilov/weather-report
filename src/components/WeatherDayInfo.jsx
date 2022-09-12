import styled from "styled-components";
import test_img_small from "../assets/images/test_img_small.png";

// Function to priortize type of weather
const CheckWeatherPrior = (code) => {
    if (code === "800")
        return 1
    if (code === "801")
        return 2
    else switch (code[0]) {
        case "8": return 3
        case "3": return 4
        case "5": return 5
        case "2": return 6
        case "6": return 7
        default: return 8
    }
}
// Function to choose an image of day
const WeatherToShow = (prior) => {
    switch (prior) {
        case 1: return "ЯСНО"
        case 2: return "НЕМНОЖКО ОБЛАЧНО"
        case 3: return "ОБЛАЧНО"
        case 4: return "МОРОСЬ"
        case 5: return "ДОЖДЬ"
        case 6: return "ГРОЗА"
        case 7: return "СНЕГ"
        case 8: return "ЧТО-ТО ДРУГОЕ"
        default: return "ОШИБКА"
    }
}

export const WeatherDayInfo = (date) => {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let dateFormatted = new Date(date.date);
    let dayOfTheWeek = weekday[dateFormatted.getDay()];

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
        <DayImg src={test_img_small} />
        {/* <h1>Погода = {WeatherToShow(maxWeatherPrior)}</h1> */}
        <DayDate>{dayOfTheWeek}</DayDate>
        <DayTemp>{Math.round(maxTemperature)}°</DayTemp>
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
const DayTemp = styled.h1`
    margin: 5px 0;
    font-size: 25px;
    font-family: QuicksandLight;
    grid-area: C;
`;