import React from "react";
import { io } from "socket.io-client";

import SocketContext from "./socket-context";

const SocketProvider = (props) => {
  const SOCKET_URL = `${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`;
  const socket = io.connect(SOCKET_URL);
  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
