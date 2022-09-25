import styled from "styled-components";
import { WeatherCanvas } from "../3d/WeatherCanvas";
import { useSelector } from "react-redux";
import { Loader } from "../staff/Loader";

export const WeatherType = () => {
    const weatherToday = useSelector((state) => state.weatherReducer.weatherToday);

    return (
        weatherToday.temperature ? <div>
            <WeatherCanvas weatherCode={weatherToday.weatherID} />
            <TypeTitle>{weatherToday.weatherType}</TypeTitle>
        </div> : <Loader />
    )
}

const TypeTitle = styled.h1`
    margin: 10px 0;
    font-family: QuicksandRegular;
    font-weight: normal;
    font-size: 40px;
`;