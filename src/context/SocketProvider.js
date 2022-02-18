import React from "react";
import { io } from "socket.io-client";

import SocketContext from "./socket-context";
import { SOCKET_URL } from "../config/config";

const SocketProvider = (props) => {
  const socket = io.connect(SOCKET_URL);
  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
