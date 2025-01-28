import { nanoid } from "@reduxjs/toolkit";
import Chat from "common/components/chat/Chat";
import ChatForm from "common/components/chat/ChatForm";
import SigninChatForm from "common/components/chat/SigninChatForm";
import { useCallback, useEffect, useRef, useState } from "react";

// import "dotenv/config"; //! NOT NEEDS IN REACT!!! Otherwise will not works.
// in .env:
// SECRET_API_KEY=my_secret_key      # Wil NOT be available in React
// REACT_APP_PUBLIC_API_URL=http://api.example.com # will be available in React
// in final build:
// console.log(process.env.REACT_APP_PUBLIC_API_URL); // will works
// console.log(process.env.SECRET_API_KEY); // undefined
import { io } from "socket.io-client";

//% Connection to backend (to web-socket server)
// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.REACT_APP_BASE_URL; // address of web-socket server
const socket = io.connect(URL);

// or
// const socket = io(URL);
// socket.connect();
//%/ Connection to backend (to web-socket server)

export default function ChatPage() {
  const [nickName, setNickName] = useState("");
  const [messages, setMessages] = useState([]); // array of messages (this user and other users)

  //% Hang event listener of events "chat-message" (messages from other users)
  //# Opt1 - use return for remove listener
  // useEffect(() => {
  //   const handleChatMessage = message => {
  //     setMessages(prevState => {
  //       const newMessage = {
  //         id: nanoid(),
  //         type: "user",
  //         message,
  //       };

  //       return [newMessage, ...prevState];
  //     });
  //   };

  //   socket.on("chat-message", handleChatMessage);

  //   // Remove listener
  //   return () => {
  //     socket.off("chat-message", handleChatMessage);
  //   };
  // }, []);

  //# Opt2 - use useRef for add only one listener (return can be added or not)
  const isListenerSet = useRef(false);
  useEffect(() => {
    if (!isListenerSet.current) {
      const handleChatMessage = message => {
        setMessages(prevState => {
          const newMessage = {
            id: nanoid(),
            type: "user",
            message,
          };
          return [newMessage, ...prevState];
        });
      };

      socket.on("chat-message", handleChatMessage);

      isListenerSet.current = true;

      // return () => {
      //   socket.off("chat-message", handleChatMessage);
      //   isListenerSet.current = false;
      // };
    }
  }, []);
  //%/ Hang event listener of events "chat-message" (messages from other users)

  const addNickname = useCallback(name => {
    setNickName(name);
  }, []);

  const addMessage = useCallback(({ message }) => {
    setMessages(prevState => {
      const newMessage = {
        id: nanoid(),
        type: "your",
        message,
      };
      return [newMessage, ...prevState];
    });

    // Frontend sending message to backend:
    socket.emit("chat-message", message);

    // Frontend receiving messages from backend
  }, []);

  return (
    <>
      <h2>Chat Page</h2>
      {!nickName && <SigninChatForm onSubmit={addNickname} />}
      {nickName && <ChatForm onSubmit={addMessage} />}
      {nickName && <Chat messages={messages} />}
    </>
  );
}
