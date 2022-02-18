import "./App.css";
import React from "react";
import JoinChat from "./components/JoinChat";

import SocketProvider from "./context/SocketProvider";

function App() {
  return (
    <React.Fragment>
      <SocketProvider>
        <JoinChat />
      </SocketProvider>
    </React.Fragment>
  );
}

export default App;
