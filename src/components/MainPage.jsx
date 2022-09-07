import { useDispatch } from "react-redux";
import { useEffect } from "react"
import { getWeather } from "../api/weather";
import { setGeoPositionAction } from "../redux/reducers/weatherReducer";

export const MainPage = () => {
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            console.log("The Browser Does not Support Geolocation");
        }
    }

    function showPosition(position) {
        console.log(position.coords);
        dispatch(setGeoPositionAction(position.coords.latitude, position.coords.longitude))
    }

    function showError(error) {
        if (error.PERMISSION_DENIED) {
            console.log("The User have denied the request for Geolocation.");
        }
    }

    const dispatch = useDispatch();
    getLocation();

    // useEffect(() => dispatch(getWeather()));


    return <h1>TEST</h1>
}
