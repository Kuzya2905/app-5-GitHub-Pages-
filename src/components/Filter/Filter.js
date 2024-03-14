import React from "react";
import AppContext from "../../context/app-context";

const Filter = () => {
  const { setFilterDate, filterDate } = React.useContext(AppContext);
  return (
    <div className="section-1">
      <div className="filter">
        <button
          onClick={() => {
            setFilterDate(0);
          }}
          className={filterDate === 0 ? "active" : ""}
        >
          Today
        </button>
        <button
          onClick={() => {
            setFilterDate(1);
          }}
          className={filterDate === 1 ? "active" : ""}
        >
          Tomorrow
        </button>
        <button
          onClick={() => {
            setFilterDate(2);
          }}
          className={filterDate === 2 ? "active" : ""}
        >
          Next 5 day
        </button>
      </div>
    </div>
  );
};

export default Filter;
