export function TodaysWeather({
  daily,
  weatherCalculation,
  changeTempType,
  setChangeTempType,
  WeatherStatus,
}) {
  return (
    <>
      <div className="daily-left">
        <p className="weather-icon">{weatherCalculation(daily[0])}</p>
        <p>{WeatherStatus(daily[0])}</p>
        <div>
          <p className="current-temp">
            {changeTempType === "F"
              ? Math.round(
                  parseFloat((daily[0].values.temperatureAvg * 9) / 5 + 32)
                )
              : Math.round(daily[0].values.temperatureAvg)}
            °
          </p>
        </div>
        <div className="pick-a-temp">
          <p onClick={() => setChangeTempType("F")}>°F | </p>
          <p onClick={() => setChangeTempType("C")}>°C</p>
        </div>
      </div>

      <div className="daily-right-top">
        <p>
          Low Temp{" "}
          {Math.round(
            parseFloat((daily[0].values.temperatureMin * 9) / 5 + 32)
          )}{" "}
          °F
        </p>

        <p>
          High Temp{" "}
          {Math.round(
            parseFloat((daily[0].values.temperatureMax * 9) / 5 + 32)
          )}{" "}
          °F
        </p>
        <p>
          Precipitation Average {daily[0].values.precipitationProbabilityAvg}%
        </p>
        <p>
          Humidity Average {Math.floor(parseFloat(daily[0].values.humidityAvg))}
          %
        </p>
      </div>
    </>
  );
}
