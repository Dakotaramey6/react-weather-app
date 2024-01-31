import { useState, useEffect } from "react";
import { DailyWeather } from "./DailyWeather";
import { TodaysWeather } from "./TodaysWeather";
import { Spinner } from "./Spinner";
import { WeatherStatus } from "./HelperFunctions/WeatherStatus";
import apikey from "./APICall";
import "./App.css";

function App() {
  const [isLoading, setIsloading] = useState(true);
  const [daily, setDaily] = useState([]);
  const [changeTempType, setChangeTempType] = useState("F");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        let url = `https://api.tomorrow.io/v4/weather/forecast?location=${latitude},${longitude}&apikey=${apikey}`;
        fetch(url)
          .then((res) => res.json())
          .then((json) => {
            setDaily(json.timelines.daily);
            setIsloading(false);
          })
          .catch((error) => console.error(error));
      });
    } else {
      console.error("Browser Not supported");
    }
  }, []);

  function weatherCalculation(whatToIterate, weatherIcon) {
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
              changeTempType={changeTempType}
              setChangeTempType={setChangeTempType}
              WeatherStatus={WeatherStatus}
            />
          </div>
          <div className="WeeklyCast">
            <h2 className="weekly-cast-header">Upcoming Weather</h2>
            <DailyWeather
              daily={daily}
              weatherCalculation={weatherCalculation}
              WeatherStatus={WeatherStatus}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
