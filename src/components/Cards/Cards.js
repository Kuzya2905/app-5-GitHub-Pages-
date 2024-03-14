import React from "react";
import AppContext from "../../context/app-context";

import { ReactComponent as SvgPointer } from "../../SVG/pointer.svg";

const Cards = () => {
  const { cardsDOM, weather5Days, filterDate, weatherImg } =
    React.useContext(AppContext);
  const [cards, setCards] = React.useState([]);

  const scrollNextCards = React.useCallback(() => {
    cardsDOM.current.scrollBy({
      left: 1000,
      behavior: "smooth",
    });
  }, [cardsDOM]);
  const scrollPrevCards = React.useCallback(() => {
    cardsDOM.current.scrollBy({
      left: -1000,
      behavior: "smooth",
    });
  }, [cardsDOM]);

  React.useEffect(() => {
    setCards(weather5Days);
  }, [weather5Days]);

  React.useEffect(() => {
    cardsDOM.current.scrollBy({
      left: -2000,
    });

    if (weather5Days.length > 0) {
      const NumberHoursToday =
        (24 - weather5Days[0].dt_txt.substr(-8, 2)) / 3 + 1;

      if (filterDate === 0) {
        setCards(weather5Days.slice(0, NumberHoursToday));
      }
      if (filterDate === 1) {
        setCards(
          weather5Days.slice(NumberHoursToday - 1, NumberHoursToday + 8)
        );
      }
      if (filterDate === 2) {
        setCards(() => {
          let num = 0;
          return weather5Days.filter((item, index) => {
            if (index === num) {
              num += 8;
              return true;
            } else return false;
          });
        });
      }
    }
  }, [filterDate, weather5Days, cardsDOM]);

  const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="section-2">
      <button className="next" onClick={scrollNextCards}>
        <SvgPointer />
      </button>
      <button className="prev" onClick={scrollPrevCards}>
        <SvgPointer />
      </button>
      <div className="cards" ref={cardsDOM}>
        {filterDate === 2
          ? cards.map((item, index) => (
              <div className="card" key={item.dt}>
                <h1>{week[index]}</h1>
                <img
                  src={
                    weatherImg[
                      Object.keys(weatherImg).find((elem) => {
                        return elem === item.weather[0].main;
                      })
                    ]
                  }
                  alt=""
                />
                <span className="temperature">
                  {Math.floor(item.main.temp)}°
                </span>
              </div>
            ))
          : cards.map((item) => (
              <div className="card" key={item.dt}>
                <h1>Time</h1>
                <h1>{item.dt_txt.substr(-8, 5)}</h1>
                <img
                  src={
                    weatherImg[
                      Object.keys(weatherImg).find((elem) => {
                        return elem === item.weather[0].main;
                      })
                    ]
                  }
                  alt="weather"
                />
                <span className="temperature">
                  {Math.floor(item.main.temp)}°
                </span>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Cards;
