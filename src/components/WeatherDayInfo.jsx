const CheckWeatherPrior = (code) => {
    if (code === "800")
        return 1
    else switch (code[0]) {
        case "8": return 2
        case "3": return 3
        case "5": return 4
        case "2": return 5
        case "6": return 6
        default: return 7
    }
}
const WeatherToShow = (prior) => {
    switch (prior) {
        case 1: return "ЯСНО"
        case 2: return "ОБЛАЧНО"
        case 3: return "МОРОСЬ"
        case 4: return "ДОЖДЬ"
        case 5: return "ГРОЗА"
        case 6: return "СНЕГ"
        case 7: return "ЧТО-ТО ДРУГОЕ"
        default: return "ОШИБКА"
    }
}

export const WeatherDayInfo = (date) => {
    // console.log(date.date)
    console.log(date.dayInfo);
    let maxTemperature = null;
    let maxWeatherPrior = null;
    let maxWeatherPriorDesc = "";
    date.dayInfo.forEach(
        timePeriod => {
            let timePeriodPrior = CheckWeatherPrior(timePeriod.weatherID)
            if (timePeriodPrior > maxWeatherPrior) {
                maxWeatherPrior = timePeriodPrior;
                maxWeatherPriorDesc = timePeriod.weatherDescription;
            }
            if (maxTemperature < timePeriod.temp) {
                maxTemperature = timePeriod.temp
            }
        }
    )

    return (<div>
        <h1>date = {date.date}</h1>
        <h1>maxTemp = {Math.round(maxTemperature)}°</h1>
        <h1>Погода = {WeatherToShow(maxWeatherPrior)}</h1>
        <h1>ПогодаОписание = {maxWeatherPriorDesc}</h1>
    </div>)
}