import { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import styled from "styled-components";
import logo from "../../public/chatapp.png";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Logout from "./Logout";
import AllChats from "./AllChats";
import { useDispatch, useSelector } from "react-redux";
import { gtAllChatsState } from "../Feature/ChatSlice";
import { getSingleChats } from "../Feature/ChatApiSlice";
import { Link } from "react-router-dom";
const Contact = ({
  contact,
  currentUser,
  ChangeChat,
  currentChat,
  socket,
  onlineUser,
  chatId,
}) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setcurrentUserImage] = useState(undefined);
  const [unSeenMsg, setUnSeenMsg] = useState([]);
  const [currentSelected, setCurrentSelectd] = useState(undefined);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { chats } = useSelector(gtAllChatsState);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser?.username);
      setcurrentUserImage(currentUser?.avatarImage);
    }
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelectd(index);
    ChangeChat(contact);
    setUnSeenMsg([]);
  };
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (socket) {
      socket.on("getNotification", (data) => {
        const isOpen =
          chatId?.members?.some((id) => id === data?.senderId?._id) || false;
        console.log(isOpen);
        if (isOpen) {
          setUnSeenMsg([]);
        } else {
          setUnSeenMsg((prev) => [...prev, data]);
        }
      });
      return () => {
        socket.off("getNotification");
      };
    }
  }, [socket, chatId]);
  useEffect(() => {
    dispatch(
      getSingleChats({
        senderId: currentUser?._id,
        receiverId: currentChat?._id,
      })
    );
  }, [dispatch, currentUser?._id, currentChat?._id]);
  useEffect(() => {
    dispatch(getSingleChats({ senderId: currentUser?._id }));
  }, [dispatch, currentUser?._id]);

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <Drawer open={open} onClose={() => toggleDrawer(false)}>
            <Box
              sx={{
                width: "300px",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignContent: "center",
                position: "relative",
                bgcolor: "rgb(255, 213, 215)",
              }}
            >
              <Box
                sx={{
                  overflow: "auto",
                }}
              >
                <Box sx={{ padding: "0px" }}>
                  <Typography
                    sx={{
                      borderBottom: "1px solid gray",
                      padding: "5px 10px",
                      margin: "10px 0",
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#5e5e5e",
                    }}
                  >
                    Contacts
                  </Typography>

                  <AllChats
                    currentUser={currentUser}
                    onlineUser={onlineUser}
                    contact={contact?.filter((element) => {
                      return !chats?.some((chat) =>
                        chat.members.some((item) => item === element._id)
                      );
                    })}
                  />
                </Box>
                <Box sx={{ padding: "0 10px", height: "100vh" }}>
                  <Typography
                    sx={{
                      borderBottom: "1px solid gray",
                      padding: "5px 0",
                      margin: "10px 0",
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#525252",
                    }}
                  >
                    Chats
                  </Typography>
                  <List sx={{ overflow: "auto", height: "100vh" }}>
                    {contact?.filter((element) => {
                      return chats?.some((chat) =>
                        chat.members.some((item) => item === element._id)
                      );
                    }).length > 0 ? (
                      contact
                        ?.filter((element) => {
                          return chats?.some((chat) =>
                            chat.members.some((item) => item === element._id)
                          );
                        })
                        .map((item, index) => {
                          return (
                            <ListItem
                              sx={{
                                padding: "10px 5px",
                                display: "flex",
                                width: "100%",
                                position: "relative",
                              }}
                              className={`contact ${
                                index === currentSelected ? "selected" : ""
                              }`}
                              key={index}
                              onClick={() => changeCurrentChat(index, item)}
                              disablePadding
                            >
                              <ListItemButton sx={{ gap: "10px" }}>
                                <ListItemIcon>
                                  {item?.avatarImage ? (
                                    <img
                                      style={{ width: "30px" }}
                                      src={`data:image/svg+xml;base64,${item?.avatarImage}`}
                                      alt="avatar"
                                    />
                                  ) : (
                                    <img
                                      style={{ width: "30px" }}
                                      src={`https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg`}
                                      alt="avatar"
                                    />
                                  )}
                                </ListItemIcon>
                                <ListItemText
                                  sx={{ color: "#5f5f5f" }}
                                  primary={item.username}
                                />
                                <Box
                                  sx={{
                                    position: "relative",
                                    right: 0,
                                    zIndex: 9999,
                                    top: 0,
                                  }}
                                >
                                  {unSeenMsg?.length > 0 &&
                                    unSeenMsg.filter(
                                      (item) => item.isRead === false
                                    ) &&
                                    unSeenMsg?.some(
                                      (notification) =>
                                        notification?.senderId?._id ===
                                        item?._id
                                    ) && (
                                      <span
                                        style={{
                                          fontSize: "10px",
                                          position: "absolute",
                                          top: -4,
                                          right: 30,
                                          backgroundColor: "#f50000",
                                          borderRadius: "100%",
                                          width: "20px",
                                          height: "20px",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          color: "white",
                                        }}
                                      >
                                        {unSeenMsg.length
                                          ? unSeenMsg.length
                                          : 0}
                                      </span>
                                    )}

                                  {onlineUser.some(
                                    (onlineU) => onlineU?.userId === item?._id
                                  ) ? (
                                    <span
                                      style={{
                                        backgroundColor: "#00ff3c",
                                        width: "10px",
                                        height: "10px",
                                        position: "absolute",
                                        borderRadius: "100%",
                                        top: 0,
                                        left: 0,
                                      }}
                                    >
                                      {/* <FcVoicePresentation fontSize={32} /> */}
                                    </span>
                                  ) : (
                                    <span
                                      style={{
                                        backgroundColor: "#ff1e00",
                                        width: "10px",
                                        height: "10px",
                                        position: "absolute",
                                        borderRadius: "100%",
                                        top: 0,
                                        left: 0,
                                      }}
                                    ></span>
                                  )}
                                </Box>
                              </ListItemButton>
                            </ListItem>
                          );
                        })
                    ) : (
                      <Typography>No chats</Typography>
                    )}
                  </List>
                </Box>
              </Box>
              <Box className="currentUser">
                <Box
                  className="avatar"
                  sx={{
                    display: "flex",
                    margin: "10px 5px",
                    padding: "5px 5px",
                    gap: "10px",
                    justifyContent: "space-between",
                    borderTop: "1px solid gray",
                  }}
                >
                  <Box className="img" sx={{ width: "30px" }}>
                    <img
                      src={`data:image/svg+xml;base64,${currentUser?.avatarImage}`}
                      alt="avatar"
                    />
                  </Box>
                  <Box className="username">
                    <Typography
                      sx={{ textTransform: "capitalize" }}
                      variant="h6"
                    >
                      {currentUser?.username}
                    </Typography>
                  </Box>
                  <Logout />
                </Box>
              </Box>
            </Box>
          </Drawer>
          <div className="brand">
            <Link style={{ textDecoration: "none" }} to="/">
              <img src={logo} alt="logo" />
            </Link>
            <Link style={{ textDecoration: "none" }} to="/">
              <h3>
                Chat<span>App</span>
              </h3>
            </Link>
            <div className="mobile">
              <button onClick={() => toggleDrawer(true)}>
                <AiOutlineMenu size={18} />
              </button>
            </div>
          </div>
          <div className="contacts">
            <Typography
              sx={{
                color: "#6c6c6c",
                textAlign: "start",
                fontSize: "18px",
                fontWeight: "bold",
                width: "100%",
                padding: "10px 0",
              }}
            >
              Contacts
            </Typography>
            <Box
              sx={{
                width: "100%",
                overflowX: "auto",
              }}
            >
              <AllChats
                currentUser={currentUser}
                onlineUser={onlineUser}
                contact={contact?.filter((element) => {
                  return !chats?.some((chat) =>
                    chat.members.some((item) => item === element._id)
                  );
                })}
              />
            </Box>
            <Typography
              sx={{
                color: "#6c6c6c",
                textAlign: "start",
                fontSize: "18px",
                fontWeight: "bold",
                // borderBottom: "2px solid #00087f",
                width: "100%",
                padding: "10px 0",
              }}
            >
              Chats
            </Typography>
            {contact?.filter((element) => {
              return chats?.some((chat) =>
                chat.members.some((item) => item === element._id)
              );
            }).length > 0 ? (
              contact
                ?.filter((element) => {
                  return chats?.some((chat) =>
                    chat.members.some((item) => item === element._id)
                  );
                })
                .map((item, index) => {
                  return (
                    <div
                      className={`contact ${
                        index === currentSelected ? "selected" : ""
                      }`}
                      key={index}
                      onClick={() => changeCurrentChat(index, item)}
                    >
                      <div className="avatar">
                        <div className="img">
                          {item?.avatarImage ? (
                            <img
                              src={`data:image/svg+xml;base64,${item?.avatarImage}`}
                              alt="avatar"
                            />
                          ) : (
                            <img
                              style={{ borderRadius: "100%" }}
                              src={`https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg`}
                              alt="avatar"
                            />
                          )}
                        </div>
                        <div className="username">
                          <h3>{item?.username}</h3>
                        </div>
                      </div>

                      {unSeenMsg?.length > 0 &&
                        unSeenMsg.filter((item) => item.isRead === false) &&
                        unSeenMsg?.some(
                          (notification) =>
                            notification?.senderId?._id === item?._id
                        ) && (
                          <span
                            style={{
                              fontSize: "10px",
                              position: "absolute",
                              top: 20,
                              right: 30,
                              backgroundColor: "#f52d00",
                              borderRadius: "100%",
                              width: "20px",
                              height: "20px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "white",
                            }}
                          >
                            {unSeenMsg.length ? unSeenMsg.length : 0}
                          </span>
                        )}

                      {onlineUser.some(
                        (onlineU) => onlineU?.userId === item?._id
                      ) ? (
                        <span className="onlineDots">
                          {/* <FcVoicePresentation fontSize={32} /> */}
                        </span>
                      ) : (
                        <span className="offlineDots"></span>
                      )}
                    </div>
                  );
                })
            ) : (
              <Typography sx={{ color: "white", fontSize: "12px" }}>
                No chats
              </Typography>
            )}
          </div>
          <Box className="currentUser">
            <Box
              className="avatar"
              sx={{
                display: "flex",
                width: "100%",
                margin: "10px 5px",
                padding: "10px 5px",
                gap: "10px",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  gap: "10px",
                }}
              >
                <Box className="img" sx={{ width: "30px" }}>
                  {currentUser?.avatarImage ? (
                    <img
                      src={`data:image/svg+xml;base64,${currentUserImage}`}
                      alt="avatar"
                    />
                  ) : (
                    <img
                      style={{ borderRadius: "100%" }}
                      src={`https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg`}
                      alt="avatar"
                    />
                  )}
                </Box>
                <Box className="username">
                  <Typography
                    color={"white"}
                    sx={{ textTransform: "capitalize" }}
                  >
                    {currentUserName}
                  </Typography>
                </Box>
              </Box>
              <Logout />
            </Box>
          </Box>

          <div className="blur"></div>
          <div className="blur1"></div>
        </Container>
      )}
    </>
  );
};
const Container = styled.div`
  display: grid;
  grid-template-rows: 60px 1fr 60px;
  overflow: hidden;
  background-color: #c9ffd1;
  z-index: 0;
  position: relative;
  ::-webkit-scrollbar {
    width: 1px;
    height: 3px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #e8e8e8;
    border-radius: 0px;
  }

  ::-webkit-scrollbar-track {
    background-color: #ffdcc0;
  }
  .blur {
    position: absolute;

    width: 300px;
    height: 300px;
    border-radius: 100%;
    background-color: #b9ffad;
    filter: blur(2px);
    z-index: 1;
    left: 55%;
    top: 10%;
  }
  .blur1 {
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 100%;
    background-color: #bcffa8;
    filter: blur(5px);
    z-index: 1;
    right: 55%;
    bottom: 10%;
  }
  -ms-overflow-style: none;
  gap: 15px;
  position: relative;
  .brand {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    border-bottom: 1px solid #ffb8ab;
    padding: 0 1rem;
    z-index: 99999;
    position: relative;
    img {
      height: 2rem;
    }
    h3 {
      text-transform: uppercase;
      color: #494949;
      span {
        color: orange;
      }
    }
    .mobile {
      display: none;
      color: white;
      width: 35px;
      height: 35px;

      top: 10px;
      left: 10px;
      z-index: 9999;

      button {
        width: 100%;
        height: 100%;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.5s ease;
        background-color: #ffffff;
        border-radius: 100%;
        color: #ff9595;
        &:hover {
          background-color: orangered;
          color: white;
        }
        svg {
          font-size: 24px;
        }
      }
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 0 20px;
    gap: 0.8rem;
    overflow: auto;
    z-index: 99;
    &::webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      min-height: 4rem;
      width: 95%;
      padding: 0.4rem;
      gap: 1rem;
      align-items: center;
      justify-content: space-between;
      display: flex;
      transition: 0.5s ease-in-out;

      cursor: pointer;
      position: relative;
      .avatar {
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.8rem;
        img {
          height: 2.5rem;
        }
        .username {
          h3 {
            color: #000000;
            font-size: 14px;
            text-transform: capitalize;
            font-weight: bold;
            width: 140px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
      .onlineDots {
        font-size: 10px;
        position: absolute;
        top: 40%;
        right: 5%;
        background-color: #68f938;
        border-radius: 100%;
        width: 10px;
        height: 10px;
        animation: dotAnimation 1s ease-in-out alternate infinite;
      }
      .offlineDots {
        font-size: 10px;
        position: absolute;
        top: 40%;
        right: 5%;
        background-color: #ff5e00;
        border-radius: 100%;
        width: 10px;
        height: 10px;
      }
      @keyframes dotAnimation {
        0% {
          background-color: #40ff00;
          box-shadow: 0 0 10px #ff5e00;
        }
        50% {
          background-color: #34d100;
          box-shadow: 0 0 20px #ff5e00;
        }
        100% {
          background-color: #208000;
          box-shadow: 0 0 30px #ff5e00;
        }
      }
    }
    .selected {
      border-bottom: 1px solid #c9c9c9;
    }
  }
  .currentUser {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 2rem;
    z-index: 999;
    border-top: 1px solid #ffdbdb;
    .avatar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.5rem;
      .img {
        img {
          height: 4rem;
          max-inline-size: 100%;
        }
      }
      .username {
        p {
          color: #383838;
          font-weight: bold;
        }
      }
    }
  }

  @keyframes dotAnimation {
    0% {
      background-color: #31b705;
    }
    100% {
      background-color: #68f938; /* Set the end state color or any other desired value */
    }
  }
  @media screen and (max-width: 768px) {
    grid-template-rows: 1fr;

    .currentUser {
      display: none;
    }
    .contacts {
      display: none;
    }
    .brand {
      .mobile {
        display: block;
      }
    }
  }
`;
export default Contact;
