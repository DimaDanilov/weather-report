import axios from "axios";
import { setCurrentWeatherAction, setWeeklyWeatherAction } from "../redux/reducers/weatherReducer";


const apiKey = `${process.env.REACT_APP_API_KEY}`;
const http = axios.create({
    baseURL: `${process.env.REACT_APP_API}/data/2.5`
})

export const getWeatherForToday = (longitude, latitude) => {
    return function (dispatch) {
        http.get(`weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`).then((resp) => {
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
        http.get(`forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`).then((resp) => {
            dispatch(setWeeklyWeatherAction(resp.data.list))
        });
    };
};