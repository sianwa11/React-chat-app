import "./App.css";
import React, { useState } from "react";
import JoinChat from "./components/JoinChat";
import Chat from "./components/Chat";
import RoomProvider from "./context/RoomProvider";

function App() {
  const [showChat, setShowChat] = useState(false);

  const onUserJoinedHandler = (data) => {
    setShowChat(data);
  };

  return (
    <React.Fragment>
      <RoomProvider>
        {showChat ? <Chat /> : <JoinChat onUserJoined={onUserJoinedHandler} />}
      </RoomProvider>
    </React.Fragment>
  );
}

export default App;
