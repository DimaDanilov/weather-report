import { firstDigit } from "@utils/firstDigit";

// Receives Weather Code and then select what weather to show (function for prioritizing type of weather)
export const CheckWeatherPrior = (code: number) => {
  if (code) {
    if (code === 800)
      // SUN
      return 0;
    if (code === 801)
      // SUN+CLOUD
      return 1;
    else {
      // Search for first digit
      switch (firstDigit(code)) {
        case 8:
          return 2; // CLOUDS
        case 3:
          return 3; // DRIZZLE
        case 5:
          return 4; // RAIN
        case 2:
          return 5; // THUNDER
        case 6:
          return 6; // SNOW
        default:
          return 7; // DEFAULT
      }
    }
  } else return 7; // DEFAULT
};
