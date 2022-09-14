let initialState = {
    currentLocation: {
        latitude: undefined,
        longitude: undefined
    },
    weatherToday: {
        currentTimestamp: undefined,
        temperature: undefined,
        temperatureFeel: undefined,
        humidity: undefined,
        weatherID: undefined,
        weatherType: undefined,
        windSpeed: undefined,
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
                    currentTimestamp: action.currentTimestamp,
                    temperature: action.temperature,
                    temperatureFeel: action.temperatureFeel,
                    humidity: action.humidity,
                    weatherID: action.weatherID.toString(),
                    weatherType: action.weatherType,
                    windSpeed: action.windSpeed,
                    city: action.city,
                }
            };
        case "SET_WEATHER_WEEK":
            let weekArray = action.temperatureArray.map( // Маппинг массива из АПИ для урезания данных
                it => ({
                    date: it.dt_txt.slice(0, -9),
                    temp: it.main.temp,
                    weatherID: it.weather[0].id.toString(),
                    weatherDescription: it.weather[0].main
                }))
            let weekObject = weekArray.reduce(function (r, a) { // Группировка по дате
                r[a.date] = r[a.date] || [];
                r[a.date].push(a);
                return r;
            }, Object.create(null))
            // Удаление сегодняшней даты
            const keys = Reflect.ownKeys(weekObject);
            if (keys.length) delete weekObject[keys[0]];

            return {
                ...state,
                weatherWeek: weekObject
            };
        default:
            return state;
    }
}

// Action-creator'ы для выполнения нужного dispatch (здесь не выполняются, нужны для получения погоды)
export const setCurrentWeatherAction = (currentTimestamp, temperature, temperatureFeel, humidity, weatherID, weatherType, windSpeed, city) =>
    ({ type: "SET_WEATHER", currentTimestamp, temperature, temperatureFeel, humidity, weatherID, weatherType, windSpeed, city });
export const setWeeklyWeatherAction = (temperatureArray) =>
    ({ type: "SET_WEATHER_WEEK", temperatureArray });
export const setGeoPositionAction = (latitude, longitude) => ({ type: "SET_GEO", latitude, longitude });

export default weatherReducer