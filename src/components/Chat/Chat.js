import React, { useCallback, useContext, useEffect, useState } from "react";
import SocketContext from "../../context/socket-context";

import styles from "./Chat.module.scss";

const Chat = (props) => {
  const [message, setMessage] = useState("");
  const [texts, setTexts] = useState([]);
  const socket = useContext(SocketContext);

  const broadCastMessage = useCallback((message) => {
    // shows who joined the chat
    console.log(message);
  }, []);

  const disconnectUser = useCallback((message) => {
    console.log(message);
  }, []);

  const emitTextMessage = useCallback((text) => {
    setTexts((prevState) => [...prevState, text]);
  }, []);

  const sendChat = (chatSent) => {
    socket.emit("chat", chatSent);
  };

  useEffect(() => {
    // display welcome message
    // show when another user joined
    socket.on("message", broadCastMessage);

    // show the text messages
    socket.on("text", emitTextMessage);

    // when user leaves chatroom
    socket.on("left", disconnectUser);
  }, [socket, broadCastMessage, disconnectUser, emitTextMessage]);
  // console.log(props.userDetails);

  const messageHandler = (e) => {
    setMessage(e.target.value);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();

    if (message.trim() !== "") {
      sendChat(message);
      setMessage("");
    }
  };

  let render = "";
  // TODO: continue here
  let chatClass = ``;

  if (texts.length > 0) {
    render = "";
    render = texts.map((el, index) => (
      <div key={index}>
        {el.text}:{el.username}
      </div>
    ));
  }

  return (
    <>
      <div className={styles.chartArea}>
        <main className={styles.main}>{render}</main>

        <form className={styles.form} onSubmit={submitFormHandler}>
          <input
            className={styles.form__input}
            placeholder="say something nice"
            onChange={messageHandler}
            value={message}
          />

          <button className={styles.form__submit} type="submit">
            SEND
          </button>
        </form>
      </div>
    </>
  );
};

export default Chat;
