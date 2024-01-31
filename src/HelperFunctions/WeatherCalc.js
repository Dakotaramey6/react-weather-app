export function weatherCalculation(whatToIterate, weatherIcon) {
  if (whatToIterate.values.precipitationProbabilityAvg > 25) {
    weatherIcon = "🌧";
  } else if (
    whatToIterate.values.cloudCoverAvg < 50 &&
    whatToIterate.values.cloudCoverAvg > 20
  ) {
    weatherIcon = "⛅️";
  } else if (whatToIterate.values.freezingRainIntensityMax > 0) {
    weatherIcon = "🥶🌧";
  } else if (whatToIterate.values.snowIntensityAvg > 0) {
    weatherIcon = "🌨";
  } else if (whatToIterate.values.cloudCoverAvg > 50) {
    weatherIcon = "☁️";
  } else {
    weatherIcon = "☀️";
  }
  return weatherIcon;
}
