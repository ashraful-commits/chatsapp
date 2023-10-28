import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getAllSate } from "../Feature/AuthSlice";
import { useNavigate } from "react-router-dom";

import Contact from "../Components/Contact";
import Welcome from "../Components/Welcome";
import ChatContainer from "../Components/ChatContainer";

import { io } from "socket.io-client";
import { getAllSpacificUser } from "../Feature/MessageApi";
import { getAllMessageState } from "../Feature/MessageSlice";

import { getChatUser } from "../Feature/ChatApiSlice";
import { gtAllChatsState } from "../Feature/ChatSlice";

const Chat = () => {
  const { contact } = useSelector(getAllSate);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState({});
  const [currentChat, setCurrentChat] = useState(undefined);
  // const ENDPOINT = "http://localhost:3030";
  const ENDPOINT = "https://chatapps-v5tm.onrender.com";
  const userData = JSON.parse(localStorage.getItem("LoggedInUser"));
  const [socket, setSocket] = useState(null);
  const [onlineUser, setOnlineUser] = useState(null);
  const { messages, isLoading } = useSelector(getAllMessageState);

  const { chatId } = useSelector(gtAllChatsState);

  useEffect(() => {
    if (chatId?._id) {
      dispatch(getAllSpacificUser({ chatId: chatId?._id }));
    }
  }, [chatId?._id, dispatch]);
  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem("LoggedInUser")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("LoggedInUser")));
      }
    };
    fetchData();
  }, [navigate]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
    dispatch(
      getChatUser({ senderId: currentUser?._id, receiverId: chat?._id })
    );
  };

  useEffect(() => {
    const socket = io(ENDPOINT);
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, [setSocket]);
  useEffect(() => {
    if (socket) {
      socket.emit("addUser", userData?._id);
      socket?.on("onlineUser", (data) => {
        setOnlineUser(data);
      });
    }
  }, [socket]);

  return (
    <Container>
      <div className="container">
        <Contact
          contact={contact?.filter((item) => item._id !== currentUser._id)}
          currentUser={currentUser}
          ChangeChat={handleChatChange}
          socket={socket}
          onlineUser={onlineUser ? onlineUser : []}
          isLoading={isLoading}
          chatId={chatId}
        />
        {currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer
            chatId={chatId?._id}
            socket={socket}
            currentChat={currentChat}
            currentUser={currentUser}
            messages={messages ? messages : []}
          />
        )}
      </div>
    </Container>
  );
};
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: white;
  z-index: 0;

  .container {
    height: 100%;
    width: 100vw;
    background-color: white;
    display: grid;
    grid-template-columns: 20% 80%;
    z-index: 0;
    border-radius: 50px;
    box-shadow: 0 0 10px #ffd0d0 inset;
  }

  /* Medium devices (laptops) */
  @media screen and (max-width: 768px) {
    .container {
      grid-template-columns: 100%;
      grid-template-rows: 7% 93%;
    }
  }
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    .container {
      grid-template-columns: 35% 65%;
    }
  }
`;
export default Chat;
