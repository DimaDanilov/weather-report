import { WeatherTodayModel, WeatherWeekModel } from "../types/WeatherModel";

export class WeatherAdapter {
  static transformDay(weatherItem: any): WeatherTodayModel {
    return {
      currentTimestamp: weatherItem.dt,
      temperature: weatherItem.main.temp,
      temperatureFeel: weatherItem.main.feels_like,
      humidity: weatherItem.main.humidity,
      weatherID: weatherItem.weather[0].id,
      weatherType: weatherItem.weather[0].main,
      windSpeed: weatherItem.wind.speed,
      city: weatherItem.name,
    };
  }

  static transformWeek(weatherArray: any): WeatherWeekModel[] {
    let weekArray = weatherArray.map(
      // Маппинг массива из АПИ для урезания данных
      (el: any) => ({
        date: el.dt_txt.slice(0, -9),
        temperature: el.main.temp,
        weatherID: el.weather[0].id,
        weatherDescription: el.weather[0].main,
      })
    );

    let weekArrayGrouped = weekArray.reduce(function (r, a) {
      // Группировка по дате
      const existingGroup = r.find((group) => group.date === a.date);
      if (existingGroup) {
        existingGroup.data.push(a);
      } else {
        r.push({ date: a.date, data: [a] });
      }
      return r;
    }, [] as { date: string; data: WeatherWeekModel[] }[]);

    // Удаление сегодняшней даты
    if (weekArrayGrouped.length > 0) {
      weekArrayGrouped.shift(); // Удаляем первый элемент (сегодняшнюю дату)
    }
    return weekArrayGrouped;
  }
}
