import { weatherCalculation } from "./WeatherCalc";

export function WeatherStatus(stat) {
  let icon = weatherCalculation(stat);
  let status;

  switch (icon) {
    case "🌧":
      status = "Snow";
      break;
    case "⛅️":
      status = "Partley Cloudy";
      break;
    case "🥶🌧":
      status = "Freezing rain";
      break;
    case "☁️":
      status = "Cloudy";
      break;
    case "☀️":
      status = "Clear";
      break;
    case "🌨":
      status = "Rain";
      break;
    default:
      status = "Error";
  }

  return status;
}
