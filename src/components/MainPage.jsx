import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react"
import { getWeather } from "../api/weather";
import { setGeoPositionAction } from "../redux/reducers/weatherReducer";
import test_img from "../assets/images/test_img.png";

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
    const dispatch = useDispatch();

    useEffect(() => {
        if (!coordinates.longitude || !coordinates.latitude)
            getLocation(dispatch);
        else
            dispatch(getWeather(coordinates.longitude, coordinates.latitude))
    }
    );

    return <WeatherContainer>
        <img src={test_img} width="100%" />
        <WeatherInfo>
            <Temperature>20°</Temperature>
            <City>Moscow</City>
            <Weather>Rainy</Weather>
        </WeatherInfo>
    </WeatherContainer>
}

const WeatherContainer = styled.div`
    width: 20%;
    margin: 5vh auto;
    padding: 3%;
    box-shadow: 0px 0px 10px gray;
    border-radius: 1vw;
`;
const WeatherInfo = styled.div`
    margin: auto;
`;
const Temperature = styled.h1`
    margin: 10px 0;
    font-size: 50px;
    text-align: start;
    font-family: QuicksandLight;
`;
const City = styled.h1`
    margin: 10px 0;
    font-size: 35px;
    text-align: start;
    font-family: MontserratLight;
`;
const Weather = styled.h1`
    margin: 10px 0;
    font-size: 40px;
    text-align: start;
    font-family: TangerineRegular;
`;

