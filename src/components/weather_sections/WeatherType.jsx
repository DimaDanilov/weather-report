import styled from "styled-components";
import { WeatherCanvas } from "../3d/WeatherCanvas";

export const WeatherType = ({ weatherCode, weatherType }) =>
    <Container>
        <WeatherCanvas weatherCode={weatherCode} />
        <TypeTitle>{weatherType}</TypeTitle>
    </Container>

const Container = styled.div`
    width: 100%;
`;
const TypeTitle = styled.h1`
    margin: 10px 0;
    font-family: QuicksandRegular;
    font-weight: normal;
    font-size: 40px;
`;