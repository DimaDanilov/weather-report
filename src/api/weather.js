import axios from "axios";
import { setWeatherAction, setWeeklyWeatherAction } from "../redux/reducers/weatherReducer";

const apiUrl = "https://api.openweathermap.org/data/2.5";
const apiKey = "92df54a03ce23e7ac26dde57a2e25f99";

export const getWeather = (longitude, latitude) => {
    return function (dispatch) {
        axios.get(`${apiUrl}/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`).then((resp) => {
            console.log(resp)
            dispatch(setWeatherAction(
                resp.data.main.temp,
                resp.data.main.feels_like,
                resp.data.weather[0].main,
                resp.data.name
            ))
        });
    };
};

export const getWeatherForAWeek = (longitude, latitude) => {
    return function (dispatch) {
        axios.get(`${apiUrl}/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`).then((resp) => {
            console.log(resp)
            dispatch(setWeeklyWeatherAction(resp.data.list))
        });
    };
};