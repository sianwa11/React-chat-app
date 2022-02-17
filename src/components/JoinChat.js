import React, { useContext, useEffect, useState } from "react";

import RoomContext from "../context/room-context";

const JoinChat = (props) => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const roomCtx = useContext(RoomContext);

  const { hasJoined } = roomCtx;

  useEffect(() => {
    if (!hasJoined) return;

    console.log(hasJoined);
    props.onUserJoined(hasJoined);
  }, [hasJoined, props]);

  const addNameHandler = (e) => {
    setUsername(e.target.value);
  };

  const addRoomHandler = (e) => {
    setRoom(e.target.value);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();

    if (room.trim() !== "" && username.trim() !== "") {
      // pass the two to RoomProvider
      roomCtx.joinRoom(username, room);
      setUsername("");
      setRoom("");
    }
  };
  return (
    <>
      <form onSubmit={submitFormHandler}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={addNameHandler}
        />
        <input
          type="text"
          name="room"
          placeholder="Room"
          value={room}
          onChange={addRoomHandler}
        />
        <button type="submit">Join Room</button>
      </form>
    </>
  );
};

export default JoinChat;
