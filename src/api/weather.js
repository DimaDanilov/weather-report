import axios from "axios";
import { setCurrentWeatherAction, setWeeklyWeatherAction } from "../redux/reducers/weatherReducer";

const apiUrl = "https://api.openweathermap.org/data/2.5";
const apiKey = "92df54a03ce23e7ac26dde57a2e25f99";

export const getWeatherForToday = (longitude, latitude) => {
    return function (dispatch) {
        axios.get(`${apiUrl}/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`).then((resp) => {
            dispatch(setCurrentWeatherAction(
                resp.data.dt,
                resp.data.main.temp,
                resp.data.main.feels_like,
                resp.data.main.humidity,
                resp.data.weather[0].id,
                resp.data.weather[0].main,
                resp.data.wind.speed,
                resp.data.name
            ))
        });
    };
};

export const getWeatherForAWeek = (longitude, latitude) => {
    return function (dispatch) {
        axios.get(`${apiUrl}/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`).then((resp) => {
            dispatch(setWeeklyWeatherAction(resp.data.list))
        });
    };
};