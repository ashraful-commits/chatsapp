import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import ChatInput from "./ChatInput";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { CreateMessage, deleteMsg } from "../Feature/MessageApi";

import loader from "../../public/Animation - 1698092162136.gif";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";

import { ColorRing } from "react-loader-spinner";
import { Box } from "@mui/material";

const ChatContainer = ({
  currentChat,
  currentUser,
  socket,
  chatId,
  messages,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const chatContainerRef = useRef(null);
  const [msgMenu, setMsgMenu] = useState(false);
  const [typeIng, setTypeIng] = useState(false);

  // Use a state variable to keep track of messages
  const [currentMessages, setCurrentMessages] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on("getMessage", (data) => {
        console.log(data.to);
        setCurrentMessages((prevMessages) => [
          ...prevMessages,
          { text: data?.text, senderId: data?.senderId },
        ]);
      });
      return () => {
        socket.off("getMessage");
      };
    }
  }, [socket]);

  const handleSendMessage = (msg) => {
    // Emit the message to the server
    socket?.emit("sendMessage", {
      text: msg,
      chatId: chatId,
      senderId: currentUser?._id,
      from: currentUser?._id,
      to: currentChat._id,
    });
    dispatch(
      CreateMessage({ message: msg, chatId, senderId: currentUser?._id })
    );
  };

  useEffect(() => {
    socket?.on("isTypeingEmit", (data) => {
      setTypeIng(data.typeIng);
    });

    // Clean up the event listener when unmounting
    return () => {
      socket.off("isTypeingEmit");
    };
  }, [socket, setTypeIng]);

  useEffect(() => {
    // Scroll to the bottom of the chat container
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "end",
      });
    }
  }, [currentMessages]);

  const handleDeleteMsg = (id) => {
    // Dispatch a delete action
    dispatch(deleteMsg(id));
  };

  useEffect(() => {
    // Update the state when messages change
    setCurrentMessages(messages ? messages : []);
  }, [messages]);

  function formatDate(dateString) {
    const date = moment(dateString);
    const formattedDate = date.format("YYYY h:mm A");
    return formattedDate;
  }
  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <div className="img">
              {currentChat?.avatarImage ? (
                <Link>
                  <img
                    src={`data:image/svg+xml;base64,${currentChat?.avatarImage}`}
                    alt="avatar"
                  />
                </Link>
              ) : (
                <Link to="/avatar">
                  <img src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg" />
                </Link>
              )}
            </div>
          </div>
          <div className="username">
            <h3>{currentChat?.username}</h3>
          </div>
        </div>
      </div>
      <div className="chat-messages">
        {isLoading ? (
          <Box>
            <ColorRing
              visible={true}
              height="50"
              width="50"
              ariaLabel="blocks-loading"
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          </Box>
        ) : currentMessages?.length > 0 ? (
          currentMessages?.map((item, index) => {
            return (
              <div
                className={`message ${
                  item?.senderId?._id === currentUser?._id ||
                  item?.senderId === currentUser?._id
                    ? "sender"
                    : "recieved"
                }`}
                key={index}
              >
                <div className="content">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                    }}
                  >
                    <p style={{ fontSize: "10px", color: "#616161" }}>
                      {formatDate(item.createdAt)}
                    </p>
                    <p style={{ fontSize: "14px" }}>{item?.text}</p>
                  </Box>
                  <div className="menu">
                    <button onClick={() => setMsgMenu(!msgMenu)}>
                      <BsThreeDotsVertical />
                    </button>
                    <div className="menu-item">
                      {msgMenu && (
                        <ul>
                          <li>Edit</li>
                          <li onClick={() => handleDeleteMsg(item?._id)}>
                            Delete
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p style={{ textAlign: "center", color: "white" }}>No chat found!</p>
        )}
        <div ref={chatContainerRef} style={{ width: "40px", height: "40px" }}>
          {typeIng ? (
            <img style={{ width: "30px" }} src={loader} alt="loader" />
          ) : (
            <div style={{ height: "30px" }}></div>
          )}
        </div>
      </div>
      <ChatInput
        handleSendMessage={handleSendMessage}
        socket={socket}
        currentChat={currentChat}
        currentUser={currentUser}
      />
    </Container>
  );
};
const Container = styled.div`
  display: grid;
  gap: 0.1rem;
  overflow: hidden;
  grid-template-rows: 70px auto 60px;
  background-color: #080e39;
  z-index: 0;

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        .img {
          img {
            height: 2rem;
          }
        }
      }
      .username {
        h3 {
          color: #ffffff;
          font-size: 14px;
          text-transform: capitalize;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 5rem;
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 1rem;
    overflow: auto;

    z-index: 0;

    .message {
      display: flex;
      align-content: center;
      .content {
        max-width: 40%;
        padding: 0.6rem;

        color: #d1d1d1;
        border-radius: 1rem;

        p {
          overflow-wrap: break-word;
        }
      }
    }
    .sender {
      justify-content: flex-end;
      .content {
        background-color: #fc5353;
        color: white;
        border-bottom-right-radius: 0;
        display: flex;
        gap: 10px;
        box-shadow: -2px -2px 2px white;
        &:hover {
          .menu {
            opacity: 1;
          }
        }
        .menu {
          position: relative;
          opacity: 0;
          .menu-item {
            position: absolute;
            background-color: #fff;
            padding: 5px;
            right: 0;
            box-shadow: 0 0 10px #d8d8d8;
            border-radius: 10px;
            ul {
              display: flex;
              flex-direction: column;
              gap: 5px;
              padding: 5px;
              li {
                color: gray;
                list-style: none;
                cursor: pointer;
              }
            }
          }
          button {
            border: none;
            background-color: transparent;
            svg {
              font-size: 18px;
              color: white;
            }
          }
        }
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #ffffff;
        color: #000000;
        border-top-left-radius: 0;
        display: flex;
        gap: 10px;
        box-shadow: -4px -4px 5px orangered;
        &:hover {
          .menu {
            opacity: 1;
          }
        }
        .menu {
          position: relative;
          opacity: 0;
          .menu-item {
            position: absolute;
            background-color: #fff;
            padding: 5px;
            box-shadow: 0 0 10px #d8d8d8;
            border-radius: 10px;
            ul {
              display: flex;
              flex-direction: column;
              gap: 5px;
              padding: 5px;
              li {
                color: gray;
                list-style: none;
                cursor: pointer;
              }
            }
          }
          button {
            border: none;
            background-color: transparent;
            svg {
              font-size: 18px;
              color: white;
            }
          }
        }
      }
    }
  }
  @media (max-width: 767px) {
    .chat-messages {
      padding: 1rem 1rem;
      display: flex;
      flex-direction: column;
      text-align: center;
      gap: 1rem;
      overflow: auto;
    }
  }
`;
export default ChatContainer;
