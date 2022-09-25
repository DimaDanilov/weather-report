import styled from "styled-components";
import { WeatherCanvas } from "../3d/WeatherCanvas";
import { useSelector } from "react-redux";

export const WeatherType = () => {
    const weatherToday = useSelector((state) => state.weatherReducer.weatherToday);

    return <div>
        <WeatherCanvas weatherCode={weatherToday.weatherID} />
        <TypeTitle>{weatherToday.weatherType}</TypeTitle>
    </div>
}

const TypeTitle = styled.h1`
    margin: 10px 0;
    font-family: QuicksandRegular;
    font-weight: normal;
    font-size: 40px;
`;