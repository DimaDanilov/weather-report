import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react"
import { getWeather } from "../api/weather";
import { setGeoPositionAction } from "../redux/reducers/weatherReducer";

function getLocation(dispatch) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) =>
            //Установка геолокации в стор
            dispatch(setGeoPositionAction(position.coords.latitude, position.coords.longitude)),
            (error) => {
                if (error.PERMISSION_DENIED)
                    console.log("The User have denied the request for Geolocation.");
            }
        );
    } else {
        console.log("The Browser Does not Support Geolocation");
    }
}

export const MainPage = () => {
    const coordinates = useSelector((state) => state.weatherReducer.currentLocation);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!coordinates.longitude || !coordinates.latitude)
            getLocation(dispatch);
        else
            dispatch(getWeather(coordinates.longitude, coordinates.latitude))
    }
    );
    
    return <h1>TEST</h1>
}
