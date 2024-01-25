import "./App.css";
// import url from "./APICall";
import { useEffect, useState } from "react";

function App() {
  const [isLoading, setIsloading] = useState(true);
  const [daily, setDaily] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setDaily(json.timelines.daily);
        setIsloading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="App">
      {isLoading ? <p>Loading...</p> : <DailyWeather daily={daily} />}
    </div>
  );
}

function DailyWeather({ daily }) {
  return (
    <ul className="dailyTemps">
      {daily.map((dailys, i) => (
        <li key={i}>
          <p>{dailys.time.split("T Z")}</p>
          <p>
            Low Temp:{" "}
            {Math.round(
              parseFloat((dailys.values.temperatureMin * 9) / 5 + 32)
            )}{" "}
            °F
          </p>
          <p>
            Average Temp:{" "}
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
        </li>
      ))}
    </ul>
  );
}

function TodaysTemp() {}

export default App;
