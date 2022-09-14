import styled from "styled-components";
import { IconText } from "../staff/IconText";
import locationIcon from "../../assets/icons/location_icon.svg";
import humidityIcon from "../../assets/icons/humidity_icon.svg";
import windIcon from "../../assets/icons/wind_icon.svg";

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const WeatherInfo = ({ currentTimestamp, city, temperature, temperatureFeel, humidity, windSpeed }) => {
    const currentDate = new Date(currentTimestamp * 1000)
    const currentTime = currentDate.getDate() + ' ' + MONTHS[currentDate.getMonth()] + ', ' + currentDate.getFullYear();

    return <Container>
        <IconText imgSrc={locationIcon} textContent={city} margin="5px 0" fontSize="30px" fontFamily="MontserratRegular" />
        <Temperature>{Math.round(temperature)}°</Temperature>
        <TemperatureFeel>Feels like: {Math.round(temperatureFeel)}°</TemperatureFeel>
        <HumidityWindContainer>
            <IconText imgSrc={humidityIcon} textContent={humidity + "%"} fontSize="24px" fontFamily="MontserratLight" />
            <IconText imgSrc={windIcon} textContent={windSpeed + " m/s"} fontSize="24px" fontFamily="MontserratLight" />
        </HumidityWindContainer>
        <DateToday>{currentTime}</DateToday>
    </Container>
}

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
`
const DateToday = styled.h1`
    margin: 5px 0;
    font-size: 26px;
    font-family: MontserratRegular;
    font-weight: 500;
`;