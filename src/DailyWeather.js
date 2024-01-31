export function DailyWeather({ daily, weatherCalculation, WeatherStatus }) {
  return (
    <ul className="dailyTemps">
      {daily.map((dailys, i) => (
        <li key={i}>
          <p>{dailys.time.substring(dailys.time.indexOf("T"), -1)}</p>
          <p className="weather-icon-daily ">{weatherCalculation(dailys)}</p>
          {/* <p>{WeatherStatus(weatherCalculation(dailys))}</p> */}

          <p>
            {Math.round(
              parseFloat((dailys.values.temperatureMax * 9) / 5 + 32)
            )}
            °/
            {Math.round(
              parseFloat((dailys.values.temperatureMin * 9) / 5 + 32)
            )}
            °
          </p>
          <p>Precipitation {dailys.values.precipitationProbabilityAvg}% </p>
        </li>
      ))}
    </ul>
  );
}
