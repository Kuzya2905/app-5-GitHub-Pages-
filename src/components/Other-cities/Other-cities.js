import React from "react";
import AppContext from "../../context/app-context";
import axios from "axios";

import { ReactComponent as SvgPrevCity } from "../../SVG/prev-city.svg";
import { ReactComponent as SvgNextCity } from "../../SVG/next-city.svg";

const OtherCities = () => {
  const { citiesDOM, weatherImg } = React.useContext(AppContext);
  const [weatherOtherCities, setWeatherOtherCities] = React.useState([]);
  const [otherCities] = React.useState([
    "Moscow",
    "Amsterdam",
    "London",
    "Pekin",
    "Rome",
    "Warsaw",
  ]);

  function scrollNextCities() {
    citiesDOM.current.scrollBy({
      left: 850,
      behavior: "smooth",
    });
  }
  function scrollPrevCities() {
    citiesDOM.current.scrollBy({
      left: -850,
      behavior: "smooth",
    });
  }

  const requestWeatherOtherCities = React.useCallback(async (valueSearch) => {
    try {
      const location = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${valueSearch}&appid=553d2fd2f52245cdd55820f316fc1c80`
      );

      const geoCoordinate1 = location.data[0].lat;
      const geoCoordinate2 = location.data[0].lon;
      const weatherNow = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${geoCoordinate1}&lon=${geoCoordinate2}&units=metric&appid=553d2fd2f52245cdd55820f316fc1c80`
      );
      setWeatherOtherCities((prev) => [
        ...prev,
        {
          city: weatherNow.data.name,
          temperature: Math.ceil(weatherNow.data.main.temp),
          weather: weatherNow.data.weather[0].main,
        },
      ]);
    } catch (error) {
      alert("Неправильный запрос местоположения");
    }
  }, []);

  React.useEffect(() => {
    otherCities.forEach((item) => {
      requestWeatherOtherCities(item);
    });
  }, [otherCities, requestWeatherOtherCities]);

  return (
    <div className="section-3">
      <div className="top">
        <h1>Other large cities</h1>
        <button className="prev" onClick={scrollPrevCities}>
          <SvgPrevCity />
        </button>
        <button className="next" onClick={scrollNextCities}>
          <SvgNextCity />
        </button>
      </div>
      <div className="other-cities" ref={citiesDOM}>
        {weatherOtherCities.map((item) => (
          <div key={item.city} className="card">
            <div className="info">
              <div className="name-weather">
                <span className="name">{item.city}</span>
                <span className="weather">{item.weather}</span>
              </div>
              <img
                src={
                  weatherImg[
                    Object.keys(weatherImg).find((elem) => {
                      return elem === item.weather;
                    })
                  ]
                }
                alt=""
              />
              <span className="temperature">{item.temperature}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherCities;
