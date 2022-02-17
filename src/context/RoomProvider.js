import React, { useReducer } from "react";
import io from "socket.io-client";

import RoomContext from "./room-context";

const socket = io.connect("http://localhost:3000/");

const defaultState = {
  hasJoined: false,
  username: "",
  room: "",
};

const roomReducer = (state, action) => {
  switch (action.type) {
    case "JOIN":
      socket.emit("join", {
        username: action.payload.username,
        room: action.payload.room,
      });

      return {
        hasJoined: !state.hasJoined,
        username: action.payload.username,
        room: action.payload.room,
      };

    default:
      break;
  }
};

const RoomProvider = (props) => {
  const [roomState, dispatchRoom] = useReducer(roomReducer, defaultState);

  const joinRoomHandler = (username, room) => {
    dispatchRoom({ type: "JOIN", payload: { username, room } });
  };

  const exitRoomHandler = (id) => {
    dispatchRoom({ type: "EXIT", action: { id } });
  };

  const roomContext = {
    hasJoined: roomState.hasJoined,
    username: roomState.username,
    room: roomState.room,
    joinRoom: joinRoomHandler,
    exitRoom: exitRoomHandler,
  };

  return (
    <RoomContext.Provider value={roomContext}>
      {props.children}
    </RoomContext.Provider>
  );
};

export default RoomProvider;
