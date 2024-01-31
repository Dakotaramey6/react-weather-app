export function DailyWeather({ daily, weatherCalculation }) {
  return (
    <ul className="dailyTemps">
      {daily.map(
        (dailys, i) =>
          i !== 0 && (
            <li key={i}>
              <p>{dailys.time.substring(dailys.time.indexOf("T"), -1)}</p>
              <p className="weather-icon-daily ">
                {weatherCalculation(dailys)[0]}
              </p>
              <p className="weather-status">{weatherCalculation(dailys)[1]}</p>

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
          )
      )}
    </ul>
  );
}
