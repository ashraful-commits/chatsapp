import { Avatar, AvatarGroup, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { CreateChats } from "../Feature/ChatApiSlice";
import { FcVoicePresentation } from "react-icons/fc";

const AllChats = ({ contact, currentUser, onlineUser }) => {
  const dispatch = useDispatch();
  const handleAddChat = (chatUserId) => {
    dispatch(
      CreateChats({ senderId: currentUser._id, receiverId: chatUserId })
    );
  };
  return (
    <>
      <Container>
        <Box
          sx={{
            display: "flex",
            gap: "14px",
            width: "100%",
            overflow: "auto",
            padding: "10px 5px",
          }}
        >
          {contact?.map((contact, index) => {
            return (
              <button
                onClick={() => handleAddChat(contact?._id)}
                className="onlineButton"
                key={index}
              >
                <Avatar
                  sx={{ height: "30px", width: "30px" }}
                  alt={contact?.username}
                  src={`data:image/svg+xml;base64,${contact?.avatarImage}`}
                />

                {onlineUser.some(
                  (onlineU) => onlineU?.userId === contact?._id
                ) ? (
                  <span className="onlineDots"></span>
                ) : (
                  <span className="offlineDots"></span>
                )}
              </button>
            );
          })}
        </Box>
      </Container>
    </>
  );
};
const Container = styled.div`
  width: 100%;
  overflow-x: auto;
  display: flex;
  align-items: center;
  justify-content: start;
  height: 65px;
  padding: 0 10px;
  background-color: #0003634a;
  ::-webkit-scrollbar {
    width: 0px;
    height: 3px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #2200fc;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #4d0000;
  }

  ::-webkit-scrollbar-track {
    background-color: #ff3700;
  }

  /* For other browsers that support the scrollbar-width property (e.g., Firefox) */
  /* These properties are not widely supported */
  scrollbar-width: thin; /* Hide scrollbar for non-WebKit browsers */

  /* For IE and Edge (optional) */
  -ms-overflow-style: none;
  .onlineButton {
    border-radius: 100%;
    position: relative;
    border: 1px solid #ffffff;
    .onlineDots {
      font-size: 10px;
      position: absolute;
      top: -10%;
      left: -10%;
      background-color: #68f938;
      border-radius: 100%;
      width: 10px;
      height: 10px;
      animation: dotAnimation 1s ease-in-out infinite;
    }
    .offlineDots {
      font-size: 10px;
      position: absolute;
      top: -10%;
      left: -10%;
      background-color: #ff5e00;
      border-radius: 100%;
      width: 10px;
      height: 10px;
    }
  }

  @keyframes dotAnimation {
    0% {
      background-color: #45ff07;
      box-shadow: 0 0 10px #ff5e00;
    }
    50% {
      background-color: #31b705;
      box-shadow: 0 0 20px #ff5e00;
    }
    100% {
      background-color: #68f938;
      box-shadow: 0 0 30px #ff5e00;
    }
  }
`;
export default AllChats;
