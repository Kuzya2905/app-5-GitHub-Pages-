import React from "react";
import { AppContextProvider } from "./context/app-context";

import LeftPanel from "./components/Left-panel/Left-panel";
import BlockMain from "./components/BLock-main/Block-main";

function App() {
  return (
    <AppContextProvider>
      <LeftPanel />
      <BlockMain />
    </AppContextProvider>
  );
}

export default App;
