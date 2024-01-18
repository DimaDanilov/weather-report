import { WeatherWeekElement } from "@customTypes/WeatherModel";
import { CheckWeatherPrior } from "@utils/WeatherPrior";

// Receives day periods of ONE DAY, then select what temperature, weather type to show
export function chooseDayWeatherToShow(dayPeriods: WeatherWeekElement[]) {
  let maxTemperature: null | number = null;
  let maxWeatherIDPrior: number | null = null;
  let maxWeatherDescriptionPrior: string = "";

  dayPeriods.forEach((timePeriod: WeatherWeekElement) => {
    // Search of prior type of weather per day (Snow, Rain, Clear, etc.)
    let timePeriodIDPrior = CheckWeatherPrior(timePeriod.weatherID);
    if (!maxWeatherIDPrior || timePeriodIDPrior > maxWeatherIDPrior) {
      maxWeatherIDPrior = timePeriodIDPrior;
      maxWeatherDescriptionPrior = timePeriod.weatherDescription;
    }
    // Search of max temperature per day
    if (maxTemperature === null) {
      maxTemperature = timePeriod.temperature;
    } else if (maxTemperature < timePeriod.temperature) {
      maxTemperature = timePeriod.temperature;
    }
  });
  return { maxTemperature, maxWeatherIDPrior, maxWeatherDescriptionPrior };
}
