import React from "react";
import { ReactComponent as SvgLocation } from "../../SVG/location.svg";
import { ReactComponent as SvgSunriseCardBasic } from "../../SVG/card-basic-sunrise.svg";
import { ReactComponent as SvgSunsetCardBasic } from "../../SVG/card-basic-sunset.svg";
import AppContext from "../../context/app-context";

const LeftPanel = () => {
  const { weatherNow, geoLocation, weatherImg } = React.useContext(AppContext);
  const [weatherMain, setWeatherMain] = React.useState();

  React.useEffect(() => {
    if (weatherNow) {
      setWeatherMain(weatherNow.weather[0].main);
    }
  }, [weatherNow]);

  const date = new Date();
  function timeFromUnix(unix) {
    var a = new Date((unix - 10800 + weatherNow.timezone) * 1000);
    var hour = a.getHours();
    var min = a.getMinutes();
    var time = `${hour.toString().length === 1 ? "0" + hour : hour}:${
      min.toString().length === 1 ? "0" + min : min
    }`;

    return time;
  }
  return (
    <>
      {weatherNow ? (
        <section className="left-panel">
          <div className="top">
            <div className="city">
              <div className="svgLocation">
                <SvgLocation />
              </div>
              <span>
                {Array.isArray(geoLocation) ? (
                  <>
                    {geoLocation["0"].name}, {geoLocation["0"].state},{" "}
                    {geoLocation["0"].country}
                  </>
                ) : (
                  <>{geoLocation}</>
                )}
              </span>
            </div>
            <span className="date">
              Today,
              {` ${date.getDate()} 
          ${date.toLocaleString("en", {
            month: "short",
          })} 
            ${date.getFullYear()}`}
            </span>
          </div>
          <div className="card-basic">
            <div className="card-top">
              <img
                src={
                  weatherImg[
                    Object.keys(weatherImg).find((item) => item === weatherMain)
                  ]
                }
                alt=""
              />
              <span className="temperature">
                {Math.round(weatherNow.main.temp)}°C
              </span>
            </div>
            <div className="main-info">
              <div className="info">
                Weather main : <span>{weatherMain}</span>
              </div>
              <div className="info">
                Feels like :{" "}
                <span>{Math.round(weatherNow.main.feels_like)}°C</span>
              </div>
              <div className="info">
                Humidity : <span>{weatherNow.main.humidity}%</span>
              </div>
              <div className="info">
                Wind : <span>{Math.round(weatherNow.wind.speed)} km/h</span>
              </div>
            </div>
            <div className="bot-info">
              <div className="info">
                <SvgSunriseCardBasic />
                <span className="sunrise">
                  {timeFromUnix(weatherNow.sys.sunrise)} AM{" "}
                </span>
              </div>
              <div className="info">
                <SvgSunsetCardBasic />
                <span className="sunset">
                  {timeFromUnix(weatherNow.sys.sunset)} PM{" "}
                </span>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="left-panel"></section>
      )}
    </>
  );
};

export default LeftPanel;
