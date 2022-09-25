import styled from "styled-components";
import { WeekForecast } from "./weather_sections/WeekForecast";
import { WeatherType } from "./weather_sections/WeatherType";
import { WeatherInfo } from "./weather_sections/WeatherInfo";

export const MainPage = () =>
    <WeatherContainer>
        <WeatherType />
        <WeatherInfo />
        <WeekForecast />
    </WeatherContainer>

const WeatherContainer = styled.div`
    width: 100%;
    padding: 0 5%;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 5vh auto;
    gap: 5%;
`;