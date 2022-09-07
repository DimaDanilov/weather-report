import { useDispatch } from "react-redux";
import { useEffect } from "react"

import { getWeather } from "../api/weather";

export const MainPage = () => {

    const dispatch = useDispatch();
    useEffect(() => dispatch(getWeather()));
    return <h1>TEST</h1>
}
