import { useEffect, useState } from "react";
import WeatherApi from "../components/weather_api";
import warningImg from "../images/warning.png";
import styles from "./weather.module.css";
// import weather_api from "../components/weather_api";
const API_KEY = "69d13854645e68f12c6b678488436edb";

function Weather() {
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState();
  const [search, setSearch] = useState("");
  const [error, setError] = useState();
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric&lang=kr`;
  const open = () => {
    const container = document.querySelector(`.${styles.container}`);
    if (container) {
      container.style.height = "600px";
    }
    const notFound = document.querySelector(`.${styles.notFound}`);
    if (notFound) {
      notFound.style.display = "flex";
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      onClick();
    }
  };
  const onClick = () => {
    setSearch(document.querySelector(`.${styles.searchInput}`).value);
    open();
  };

  useEffect(() => {
    const getWeather = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setWeather(data);
        setLoading(false);
        setError(null); // 오류가 발생하지 않은 경우 오류 상태 초기화
      } catch (e) {
        setError(true); // 오류가 발생한 경우 오류 상태 저장
        setLoading(false);
        setWeather(null);
      }
    };
    getWeather();
  }, [search]);

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.search}>
          <i className="fa-solid fa-location-dot"></i>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Enter city name"
            onKeyDown={handleKeyPress}
          ></input>
          <button
            className={`fa-solid fa-magnifying-glass ${styles.searchBtn}`}
            onClick={onClick}
          ></button>
        </div>
        {error ? ( // 오류가 발생한 경우
          <div className={`${styles.notFound}`}>
            <img src={warningImg} />
            <p>죄송합니다 찾는 도시명이 없습니다!</p>
          </div>
        ) : !weather || weather?.cod === "400" || weather.cod === "404" ? ( // 데이터가 없는 경우
          <div className={`${styles.notFound}`}>
            <img src={warningImg} />
            <p>죄송합니다 찾는 도시명이 없습니다!</p>
          </div>
        ) : (
          <WeatherApi
            temp={weather.main.temp}
            humidity={weather.main.humidity}
            name={weather.name}
            weather={weather.weather[0].description}
            wind={weather.wind.speed}
            coord={weather.coord}
          />
        )}
      </div>
    </div>
  );
}
export default Weather;
