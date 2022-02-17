import React from "react";

const RoomContext = React.createContext({
  hasJoined: false,
  username: "",
  room: "",
  joinRoom: (username, room) => {},
  leaveRoom: (id) => {},
});

export default RoomContext;
