import axios from "axios";
import React from "react";

const AppContext = React.createContext();

export function AppContextProvider({ children }) {
  const cardsDOM = React.useRef();
  const citiesDOM = React.useRef();
  const [weatherNow, setWeatherNow] = React.useState();
  const [weather5Days, setWeather5Days] = React.useState([]);
  const [geoLocation, setGeoLocation] = React.useState();
  const [valueSearch, setValueSearch] = React.useState("");
  const [filterDate, setFilterDate] = React.useState(0);
  const firstRender = React.useRef(true);
  const weatherImg = {
    Thunderstorm: "./Images/Rain.png",
    Drizzle: "./Images/Rain.png",
    Rain: "./Images/Rain.png",
    Snow: "./Images/Snow.png",
    Clear: "./Images/Sun.png",
    Clouds: "./Images/Cloud.png",
    Atmosphere: "./Images/Cloud.png",
  };

  const requestWeather = React.useCallback(async () => {
    try {
      const location = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${valueSearch}&appid=553d2fd2f52245cdd55820f316fc1c80`
      );

      const geoCoordinate1 = location.data[0].lat;
      const geoCoordinate2 = location.data[0].lon;
      const weatherNow = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${geoCoordinate1}&lon=${geoCoordinate2}&units=metric&appid=553d2fd2f52245cdd55820f316fc1c80`
      );
      const weather5Days = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${geoCoordinate1}&lon=${geoCoordinate2}&units=metric&appid=553d2fd2f52245cdd55820f316fc1c80`
      );

      setWeatherNow(weatherNow.data);
      setWeather5Days(weather5Days.data.list);
      setGeoLocation(location.data);
    } catch (error) {
      alert("Неправильный запрос местоположения");
    }
  }, [valueSearch]);

  const requestGeoPosition = React.useCallback(async () => {
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const response = await axios.get(
          `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=553d2fd2f52245cdd55820f316fc1c80`
        );
        setValueSearch(response.data[0].name);
      });
    } catch (error) {
      alert("Неправильный запрос местоположения");
    }
  }, []);

  React.useEffect(() => {
    if (firstRender.current) {
      requestGeoPosition();
    }
    if (!firstRender.current && valueSearch !== "") {
      requestWeather();
    }
    firstRender.current = false;
  }, [valueSearch, requestWeather, requestGeoPosition]);

  return (
    <AppContext.Provider
      value={{
        cardsDOM,
        citiesDOM,
        weatherNow,
        geoLocation,
        valueSearch,
        weatherImg,
        weather5Days,
        filterDate,
        setValueSearch,
        setFilterDate,
        setWeather5Days,
      }}
    >
      <div className="App">{children}</div>
    </AppContext.Provider>
  );
}

export default AppContext;
