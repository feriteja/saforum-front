import React, { SyntheticEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import BubbleChat from "../../components/chat/BubbleChat";
import { ChatType } from "../../constant/type/DataType";
import { UserState } from "../../context/UserContext";

interface stateProps {
  room: string;
  target: string;
}

const socket = io(import.meta.env.VITE_APP_BASE_URL, {
  transports: ["websocket", "polling"],
});
const ChatPage = () => {
  const { user } = UserState();

  const { room, target } = useLocation().state as stateProps;
  const [messagesRecieved, setMessagesReceived] = useState<ChatType[]>([]);
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState({ isTyping: false, username: null });

  const sendMessage = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!message) return;
    const createdtime = Date.now();
    // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
    setMessage("");
    socket.emit("client_message", {
      username: user?.username,
      room,
      message,
      createdtime,
    });
  };

  console.log(typing);

  useEffect(() => {
    if (message) {
      socket.emit("isTyping", {
        isTyping: true,
        username: user?.username,
        room,
      });
    } else {
      socket.emit("isTyping", { isTyping: false, username: null, room });
    }
  }, [message]);

  useEffect(() => {
    socket.on("connect", () => console.log(socket.id));
    socket.on("connect_error", () => {
      setTimeout(() => socket.connect(), 5000);
    });

    socket.emit("join_room", { room });
    socket.on("last_messages", (data) => {
      setMessagesReceived(data);
    });
    socket.on("server_message", (data) => {
      setMessagesReceived((oldState) => {
        return [...oldState, data];
      });
    });

    socket.on("userTyping", (data) => setTyping(data));
    socket.on("disconnect", () => {});

    return () => {
      socket.off("connect");
      socket.off("userTyping");
      socket.off("server_message");
      socket.off("last_messages");
      socket.off("connect_error");
      socket.off("disconnect");
    };
  }, []);
  return (
    <div className="flex min-h-screen   bg-red-400 flex-col">
      <div className="flex items-center justify-center h-16 bg-primary shadow-md">
        <h1 className="text-center font-bold text-2xl ">{target}</h1>
      </div>
      <div className="flex flex-col flex-1  max-h-screen bg-secondary scrol shadow-xl overflow-scroll scrollbar ">
        <div className="flex-1">
          {messagesRecieved.map((data, idx) => (
            <BubbleChat key={`${data?.createdtime}` + idx} {...data} />
          ))}
        </div>
        {typing.isTyping && typing.username !== user?.username && (
          <p className="text-center">{typing.username} is Typing</p>
        )}
      </div>
      <div className="flex items-center px-4 h-16 bg-primary ">
        <form onSubmit={sendMessage} className="flex w-screen space-x-3">
          <input
            type="text"
            value={message}
            onChange={(txt) => setMessage(txt.target.value)}
            placeholder="message..."
            className="flex-1 py-2 px-2 rounded-md outline-1 outline outline-black"
          />
          <input
            type="submit"
            className="bg-button px-2 rounded-md text-btnText"
          />
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
