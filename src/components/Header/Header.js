import React from "react";
import AppContext from "../../context/app-context";
import { DebounceInput } from "react-debounce-input";

import { ReactComponent as SvgHeaderSearch } from "../../SVG/header-search.svg";

const Header = () => {
  const { setValueSearch, valueSearch } = React.useContext(AppContext);
  const [date] = React.useState(new Date());

  return (
    <header>
      <div className="data">
        <span className="data-1">
          {date.toLocaleString("en", { month: "long", year: "numeric" })}
        </span>
        <span className="data-2">
          {`
          ${date.toLocaleString("en", {
            weekday: "long",
          })},  
          ${date.getDate()} 
          ${date.toLocaleString("en", {
            month: "short",
          })} 
            ${date.getFullYear()}`}
        </span>
      </div>
      <div className="search-panel">
        <SvgHeaderSearch
          onClick={() => {
            setValueSearch(valueSearch);
          }}
        />
        <DebounceInput
          minLength={2}
          debounceTimeout={800}
          className="search"
          type="search"
          placeholder="Search City...."
          onChange={(e) => {
            setValueSearch(e.target.value);
          }}
        />
      </div>
    </header>
  );
};

export default Header;
