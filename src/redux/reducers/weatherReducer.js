let initialState = {
    currentLocation: {
        latitude: undefined,
        longitude: undefined
    },
    weather: {
        temperature: undefined,
        temperatureFeel: undefined,
        weatherType: undefined,
        city: undefined
    }
}

const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_GEO":
            return {
                ...state,
                currentLocation: {
                    latitude: action.latitude,
                    longitude: action.longitude
                }
            };
        case "SET_WEATHER":
            return {
                ...state,
                weather: {
                    temperature: action.temperature,
                    temperatureFeel: action.temperatureFeel,
                    weatherType: action.weatherType,
                    city: action.city,
                }
            };
        default:
            return state;
    }
}

// Action-creator'ы для выполнения нужного dispatch (здесь не выполняются, нужны для получения погоды)
export const setWeatherAction = (temperature, temperatureFeel, weatherType, city) =>
    ({ type: "SET_WEATHER", temperature, temperatureFeel, weatherType, city });
export const setGeoPositionAction = (latitude, longitude) => ({ type: "SET_GEO", latitude, longitude });

export default weatherReducer