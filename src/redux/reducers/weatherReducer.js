let initialState = {
    currentLocation: {
        latitude: undefined,
        longitude: undefined
    },
    weatherToday: {
        temperature: undefined,
        temperatureFeel: undefined,
        weatherType: undefined,
        city: undefined
    },
    weatherWeek: undefined
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
                weatherToday: {
                    temperature: action.temperature,
                    temperatureFeel: action.temperatureFeel,
                    weatherType: action.weatherType,
                    city: action.city,
                }
            };
        case "SET_WEATHER_WEEK":
            return {
                ...state,
                weatherWeek: action.temperatureArray.map( // Маппинг массива из АПИ для урезания данных
                    it => ({
                        date: it.dt_txt.slice(0, -9),
                        temp: it.main.temp,
                        weatherID: it.weather[0].id
                    })).reduce(function (r, a) { // Группировка по дате
                        r[a.date] = r[a.date] || [];
                        r[a.date].push(a);
                        return r;
                    }, Object.create(null))
            };
        default:
            return state;
    }
}

// Action-creator'ы для выполнения нужного dispatch (здесь не выполняются, нужны для получения погоды)
export const setWeatherAction = (temperature, temperatureFeel, weatherType, city) =>
    ({ type: "SET_WEATHER", temperature, temperatureFeel, weatherType, city });
export const setWeeklyWeatherAction = (temperatureArray) =>
    ({ type: "SET_WEATHER_WEEK", temperatureArray });
export const setGeoPositionAction = (latitude, longitude) => ({ type: "SET_GEO", latitude, longitude });

export default weatherReducer