import React, { useState, useContext, useEffect, useCallback } from "react";
import SocketContext from "../context/socket-context";

import Chat from "./Chat";

const JoinChat = (props) => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [userDetails, setUserDetails] = useState();

  const socket = useContext(SocketContext);

  const joinChat = (username, room) => {
    socket.emit("join", { username, room });
  };

  const handleWelcomeUser = useCallback((userDetails) => {
    setJoined(true);
    setUserDetails(userDetails);
  }, []);

  const handleDisconnect = () => {
    setJoined(false);
  };

  useEffect(() => {
    // joined chat
    socket.on("welcome", handleWelcomeUser);
  }, [socket, handleWelcomeUser]);

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const roomHandler = (e) => {
    setRoom(e.target.value);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();

    if (username.trim() !== "" && room.trim() !== "") {
      joinChat(username, room);
      setUsername("");
      setRoom("");
    }
  };

  return (
    <>
      {joined ? (
        <Chat userDetails={userDetails} onDisconnect={handleDisconnect} />
      ) : (
        <form onSubmit={submitFormHandler}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={usernameHandler}
            value={username}
          />
          <input
            type="text"
            name="room"
            placeholder="Room"
            onChange={roomHandler}
            value={room}
          />
          <button type="submit">Join Room</button>
        </form>
      )}
    </>
  );
};

export default JoinChat;
