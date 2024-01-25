import "./App.css";
// import url from "./APICall";
import { useEffect, useState } from "react";

function App() {
  const [isLoading, setIsloading] = useState(true);
  const [daily, setDaily] = useState([]);
  const [active, setActive] = useState("Today's Forecast");

  const handleOnClickbtn = ({ target }) => {
    setActive(() => target.value);
  };

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

  return (
    <div className="App">
      {isLoading ? (
        <Spinner isLoading={isLoading} />
      ) : (
        <>
          <div className="btn-panel">
            <Buttons onClick={handleOnClickbtn}>Daily Forecast</Buttons>
            <Buttons onClick={handleOnClickbtn}>Today's Forecast</Buttons>
          </div>

          {active === "Daily Forecast" ? (
            <DailyWeather daily={daily} />
          ) : (
            <TodaysWeather daily={daily} />
          )}
        </>
      )}
    </div>
  );
}

function DailyWeather({ daily }) {
  return (
    <ul className="dailyTemps">
      {daily.map((dailys, i) => (
        <li key={i}>
          <p>{dailys.time.split("T")}</p>
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
        </li>
      ))}
    </ul>
  );
}

function TodaysWeather({ daily }) {
  return (
    <>
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
    </>
  );
}

function Buttons(props) {
  return (
    <button onClick={props.onClick} value={props.children}>
      {props.children}
    </button>
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
