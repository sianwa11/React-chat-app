import "./App.css";
import React from "react";
import JoinChat from "./components/JoinChat/JoinChat";

import SocketProvider from "./context/SocketProvider";
import Card from "./components/Card/Card";

function App() {
  return (
    <React.Fragment>
      <SocketProvider>
        <Card>
          <JoinChat />
        </Card>
      </SocketProvider>
    </React.Fragment>
  );
}

export default App;
