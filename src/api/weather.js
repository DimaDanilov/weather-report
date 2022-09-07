import axios from "axios";

const apiUrl = "https://api.tomorrow.io/v4";

export const getWeather = () => {
    return function (dispatch) {
        axios.get(`${apiUrl}/timelines?location=-73.98529171943665,40.75872069597532&fields=temperature&timesteps=1h&units=metric&apikey=YMnwXb9oBBbiNGYa4ZWMJQXKwg3grc2r`).then((resp) => {
            // dispatch(getProjectsByIDAction(resp.data));
            console.log(resp)
        });
    };
};