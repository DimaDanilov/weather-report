let initialState = {
    currentLocation: {
        latitude: undefined,
        longitude: undefined
    },
    weather: {
        temperature: undefined,
        weatherCode: undefined
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
                    temperature: action.weatherValues.temperature,
                    weatherCode: action.weatherValues.weatherCode,
                }
            };
        default:
            return state;
    }
}

// Action-creator'ы для выполнения нужного dispatch (здесь не выполняются, нужны для получения погоды)
export const setWeatherAction = (weatherValues) => ({ type: "SET_WEATHER", weatherValues });
export const setGeoPositionAction = (latitude, longitude) => ({ type: "SET_GEO", latitude, longitude });

export default weatherReducer