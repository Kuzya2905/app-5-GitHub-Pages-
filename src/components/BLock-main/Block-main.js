import React from "react";

import Header from "../Header/Header";
import Filter from "../Filter/Filter";
import Cards from "../Cards/Cards";
import OtherCities from "../Other-cities/Other-cities";

function BlockMain() {
  return (
    <main>
      <Header />
      <Filter />
      <Cards />
      <OtherCities />
    </main>
  );
}

export default BlockMain;
