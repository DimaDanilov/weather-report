export interface WeatherTodayModel {
  currentTimestamp: number;
  temperature: number;
  temperatureFeel: number;
  humidity: number;
  weatherID: number;
  weatherType: string;
  windSpeed: number;
  city: string;
}

export interface WeatherWeekModel {
  date: string;
  data: WeatherWeekElement[];
}

export interface WeatherWeekElement {
  date: string;
  temperature: number;
  weatherID: number;
  weatherDescription: string;
}
