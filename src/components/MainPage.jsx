import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react"
import { getWeatherForToday, getWeatherForAWeek } from "../api/weather";
import { setGeoPositionAction } from "../redux/reducers/weatherReducer";
import { WeekForecast } from "./weather_sections/WeekForecast";
import { WeatherType } from "./weather_sections/WeatherType";
import { WeatherInfo } from "./weather_sections/WeatherInfo";

// Find current geolocation and send it to store
function getLocation(dispatch) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) =>
            dispatch(setGeoPositionAction(position.coords.latitude, position.coords.longitude)),
            (error) => {
                if (error.PERMISSION_DENIED)
                    console.log("The User have denied the request for Geolocation.");
            }
        );
    } else {
        console.log("The Browser Does not Support Geolocation");
    }
}

export const MainPage = () => {
    const dispatch = useDispatch();
    const coordinates = useSelector((state) => state.weatherReducer.currentLocation);
    const weatherToday = useSelector((state) => state.weatherReducer.weatherToday);
    const weatherWeek = useSelector((state) => state.weatherReducer.weatherWeek);

    useEffect(() => {
        if (!coordinates.longitude || !coordinates.latitude)
            getLocation(dispatch);
        else {
            if (!weatherToday.temperature) {
                dispatch(getWeatherForToday(coordinates.longitude, coordinates.latitude))
                dispatch(getWeatherForAWeek(coordinates.longitude, coordinates.latitude))
            }
        }
    }
    );

    return <WeatherContainer>
        <WeatherType weatherCode={weatherToday.weatherID} weatherType={weatherToday.weatherType} />
        <WeatherInfo
            currentTimestamp={weatherToday.currentTimestamp}
            city={weatherToday.city}
            temperature={weatherToday.temperature}
            temperatureFeel={weatherToday.temperatureFeel}
            humidity={weatherToday.humidity}
            windSpeed={weatherToday.windSpeed}
        />
        <WeekForecast weatherWeek={weatherWeek} />
    </WeatherContainer>
}

const WeatherContainer = styled.div`
    width: 90%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 5vh auto;
    gap: 5%;
`;