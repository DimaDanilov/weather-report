import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react"
import { getWeather, getWeatherForAWeek } from "../api/weather";
import { setGeoPositionAction } from "../redux/reducers/weatherReducer";
import { WeatherDayInfo } from "./WeatherDayInfo";
import { WeatherCanvas } from "./3d/Canvas";

// Получить текущие координаты и отправить данные в стор
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
    const coordinates = useSelector((state) => state.weatherReducer.currentLocation);
    const weatherToday = useSelector((state) => state.weatherReducer.weatherToday);
    const weatherWeek = useSelector((state) => state.weatherReducer.weatherWeek);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!coordinates.longitude || !coordinates.latitude)
            getLocation(dispatch);
        else {
            if (!weatherToday.temperature) {
                dispatch(getWeather(coordinates.longitude, coordinates.latitude))
                dispatch(getWeatherForAWeek(coordinates.longitude, coordinates.latitude))
            }
        }
    }
    );

    const weekForecast = weatherWeek ? Object.entries(weatherWeek).map(
        ([date, dayInfo]) => <WeatherDayInfo date={date} dayInfo={dayInfo} />
    ) : ""

    return <WeatherContainer>
        <TodayContainer>
            {/* <img src={test_img} width="100%" alt="" /> */}
            <CanvasContainer>
                <WeatherCanvas weatherCode={weatherToday.weatherID} />
            </CanvasContainer>

            <WeatherInfo>
                <TemperatureContainer>
                    <Temperature>{Math.round(weatherToday.temperature)}°</Temperature>
                    <TemperatureFeel>Feels like: {Math.round(weatherToday.temperatureFeel)}°</TemperatureFeel>
                </TemperatureContainer>
                <City>{weatherToday.city}</City>
                <Weather>{weatherToday.weatherType}</Weather>
            </WeatherInfo>
        </TodayContainer>
        <WeekContainer>{weekForecast}</WeekContainer>
    </WeatherContainer>
}

const WeatherContainer = styled.div`
    width: 40%;
    display: flex;
    margin: 5vh auto;
    box-shadow: 0px 0px 10px gray;
    border-radius: 1vw;
`;
const TodayContainer = styled.div`
    width: 60%;
    padding: 3%;
    box-shadow: 0px 0px 10px gray;
    border-radius: 1vw;
`;
const CanvasContainer = styled.div`
    width: 100%;
	aspect-ratio:1/1;
`;
const WeekContainer = styled.div`
    width: 40%;
`;
const WeatherInfo = styled.div`
    margin: auto;
`;
const TemperatureContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const Temperature = styled.h1`
    align-items: center;
    margin: 10px 0;
    font-size: 50px;
    text-align: start;
    font-family: QuicksandLight;
`;
const TemperatureFeel = styled.h1`
    margin: 10px 0;
    font-size: 25px;
    text-align: start;
    font-family: QuicksandLight;
`;
const City = styled.h1`
    margin: 10px 0;
    font-size: 30px;
    text-align: start;
    font-family: MontserratLight;
`;
const Weather = styled.h1`
    margin: 10px 0;
    font-size: 45px;
    text-align: start;
    font-family: TangerineRegular;
`;