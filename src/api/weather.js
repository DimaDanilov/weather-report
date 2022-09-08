import axios from "axios";
import { setWeatherAction } from "../redux/reducers/weatherReducer";

const apiUrl = "https://api.tomorrow.io/v4";

export const getWeather = (longitude, latitude) => {
    return function (dispatch) {
        axios.get(`${apiUrl}/timelines?location=${longitude},${latitude}&fields=temperature,weatherCode&timesteps=1h&units=metric&apikey=YMnwXb9oBBbiNGYa4ZWMJQXKwg3grc2r`).then((resp) => {
            console.log(resp.data.data)
            dispatch(setWeatherAction(resp.data.data.timelines[0].intervals[3].values))
        });
    };
};