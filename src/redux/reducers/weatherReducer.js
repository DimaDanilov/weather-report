let initialState = {
    currentLocation: {
        latitude: undefined,
        longitude: undefined
    },
    weather: {}
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
            return { ...state, weather: action.payload };
        default:
            return state;
    }
}

// Action-creator'ы для выполнения нужного dispatch (здесь не выполняются, нужны для получения погоды)
export const setWeatherAction = (payload) => ({ type: "SET_WEATHER", payload });
export const setGeoPositionAction = (latitude, longitude) => ({ type: "SET_GEO", latitude, longitude });

export default weatherReducer