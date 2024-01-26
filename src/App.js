import "./App.css";
import url from "./APICall";
import { useEffect, useState } from "react";

function App() {
  const [isLoading, setIsloading] = useState(true);
  const [daily, setDaily] = useState([]);
  let usersTime = new Date();
  let localTime = usersTime.getHours();
  console.log(localTime);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setDaily(json.timelines.daily);
        setIsloading(false);
        console.log(json.timelines);
      })
      .catch((error) => console.error(error));
  }, []);

  function weatherCalculation(whatToIterate, weatherIcon) {
    if (whatToIterate.values.precipitationProbabilityAvg > 25) {
      weatherIcon = "🌧";
    } else if (whatToIterate.values.cloudCoverAvg > 50) {
      weatherIcon = "☁️";
    } else if (whatToIterate.values.cloudCoverAvg < 50) {
      weatherIcon = "⛅️";
    } else if (whatToIterate.values.freezingRainIntensityMax > 0) {
      weatherIcon = "🥶🌧";
    } else if (whatToIterate.values.snowIntensityAvg > 0) {
      weatherIcon = "🌨";
    } else if (localTime < 19) {
      weatherIcon = "🌙";
    } else {
      weatherIcon = "☀️";
    }
    return weatherIcon;
  }

  return (
    <div>
      {isLoading ? (
        <Spinner isLoading={isLoading} />
      ) : (
        <>
          <div className="TodaysForecast">
            <TodaysWeather
              daily={daily}
              weatherCalculation={weatherCalculation}
              localTime={localTime}
            />
          </div>
          <div className="WeeklyCast">
            <DailyWeather
              daily={daily}
              weatherCalculation={weatherCalculation}
            />
          </div>
        </>
      )}
    </div>
  );
}

function DailyWeather({ daily, weatherCalculation }) {
  return (
    <ul className="dailyTemps">
      {daily.map((dailys, i) => (
        <li key={i}>
          <p>{dailys.time.substring(dailys.time.indexOf("T"), -1)}</p>
          <p className="weather-icon-daily ">{weatherCalculation(dailys)}</p>
          <p>
            Low Temp:{" "}
            {Math.round(
              parseFloat((dailys.values.temperatureMin * 9) / 5 + 32)
            )}{" "}
            °F
          </p>
          <p>
            Average Temp:
            {Math.round(
              parseFloat((dailys.values.temperatureAvg * 9) / 5 + 32)
            )}{" "}
            °F
          </p>
          <p>
            High Temp:{" "}
            {Math.round(
              parseFloat((dailys.values.temperatureMax * 9) / 5 + 32)
            )}{" "}
            °F
          </p>
          <p>{dailys.values.precipitationProbabilityAvg} % of precipitation</p>
        </li>
      ))}
    </ul>
  );
}

function TodaysWeather({ daily, weatherCalculation, localTime }) {
  return (
    <>
      <h2>Today's weather</h2>
      <p className="weather-icon">{weatherCalculation(daily[0])}</p>
      <p>
        Today's Low:{" "}
        {Math.round(parseFloat((daily[0].values.temperatureMin * 9) / 5 + 32))}{" "}
        °F
      </p>
      <p>
        Today's Average:{" "}
        {Math.round(parseFloat((daily[0].values.temperatureAvg * 9) / 5 + 32))}{" "}
        °F
      </p>
      <p>
        Today's High:{" "}
        {Math.round(parseFloat((daily[0].values.temperatureMax * 9) / 5 + 32))}{" "}
        °F
      </p>
      <p>{daily[0].values.precipitationProbabilityAvg} % of precipitation</p>
    </>
  );
}

function Spinner({ isLoading }) {
  return (
    <>
      <p className="loader"></p>
      <p className="load-menu">Hang Tight! Looking outside at the weather!</p>
    </>
  );
}

export default App;
