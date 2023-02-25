import styles from "./weather_api.module.css";
const images = [
  require("../images/1.png"),
  require("../images/2.png"),
  require("../images/3.png"),
  require("../images/4.png"),
];
function WeatherApi({ coord, temp, humidity, name, weather, wind }) {
  let imgIndex;
  switch (weather) {
    case "Clouds":
      imgIndex = 0;
      break;
    case "Clear":
      imgIndex = 1;
      break;
    case "Rain":
      imgIndex = 2;
      break;
    case "Snow":
      imgIndex = 3;
      break;
    default:
      imgIndex = 1;
      break;
  }
  return (
    <div className={styles.weatherContainer}>
      <div className={styles.weatherBox}>
        <img src={images[imgIndex]} alt="example" />
        <span className={styles.cityName}>{name}</span>
        <div className={styles.coordinate}>
          <span>위도: {coord.lat}</span>
          <span>경도: {coord.lon}</span>
        </div>
        <div className={styles.temp}>
          <p className={styles.temperature}>{temp}℃</p>
          <p className={styles.description}>{weather}</p>
        </div>
      </div>
      <div className={styles.weatherBoxDetail}>
        <div className={styles.wind}>
          <i className="fa-solid fa-wind"></i>
          <div className={styles.text}>
            <span>풍속</span>
            <p>{wind}m/s</p>
          </div>
        </div>
        <div className={styles.humidity}>
          <i className="fa-solid fa-droplet"></i>
          <div className={styles.text}>
            <span>습도</span>
            <p>{humidity}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApi;
