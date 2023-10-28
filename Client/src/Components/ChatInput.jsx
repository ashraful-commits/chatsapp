import React, { useEffect, useState } from "react";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import styled from "styled-components";

const ChatInput = ({ handleSendMessage, socket, currentChat, currentUser }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");
  const [typeIng, setTypeIng] = useState(false);

  const handleEmojiPickerHidShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = (emoji, event) => {
    setMsg((prevMsg) => prevMsg + emoji.emoji);
  };
  const sendChat = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMessage(msg);
      setMsg("");
      setShowEmojiPicker(false);
    }
  };
  const handleKeydown = (e) => {
    // if (e.key === "Enter" && e.type === "keydown") {
    setTypeIng(true);
    socket?.emit("isTypeIng", {
      typeIng: true,
      to: currentChat?._id,
      from: currentUser?._id,
    });
    // }
  };
  const handleKeyUp = (e) => {
    // if (e.key === "Enter" && e.type === "keyup") {
    setTypeIng(false);
    socket?.emit("isTypeIng", {
      typeIng: false,
      to: currentChat?._id,
      from: currentUser?._id,
    });
    // }
  };

  return (
    <Container>
      <div className="circle-blur"></div>
      <div className="circle-blur2"></div>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHidShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={sendChat}>
        <input
          value={msg}
          onInput={handleKeydown}
          onBlur={handleKeyUp}
          onChange={(e) => setMsg(e.target.value)}
          type="text"
          placeholder="Type your message..."
        />
        <button>
          <IoMdSend size={23} />
        </button>
      </form>
    </Container>
  );
};
const Container = styled.div`
  display: grid;
  height: 100%;
  min-height: 60px;
  grid-template-columns: 10% 90%;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: 0 4rem;
  position: relative;
  .circle-blur {
    width: 60px;
    height: 60px;
    border-radius: 100%;
    background-color: #effde7;
    opacity: 0.9;
    border-radius: 30px;
    position: absolute;
    top: 0%;
    right: 5%;
    filter: blur(15px);
    z-index: 0;
  }
  .circle-blur2 {
    width: 60px;
    height: 60px;
    border-radius: 100%;
    background-color: #effded;
    opacity: 0.9;
    border-radius: 30px;
    position: absolute;
    top: 0%;
    left: 5%;
    filter: blur(15px);
    z-index: 0;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: #ffdada;
    gap: 2rem;
    position: relative;
    z-index: 99999;
    .emoji {
      position: absolute;
      left: 0;
      z-index: 999999999999;
      svg {
        font-size: 1.5rem;
        color: #ff5500;
        cursor: pointer;
      }
      .EmojiPickerReact {
        position: absolute;
        bottom: 35px;
        background-color: #ffffff;

        box-shadow: 0 0 30px #ffcece;
        z-index: 99999999999;

        .epr-search-container {
          input {
            background-color: #ffffff;
            border: none;
          }
        }
        .epr-emoji-category-label {
          background-color: #ffffff;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 2rem;
    background-color: #ffffff;
    border-radius: 2rem;
    overflow: hidden;
    z-index: 99999;
    input {
      width: 90%;
      background-color: transparent;
      color: #000000;
      border: none;
      padding-left: 1rem;
      font-size: 12px;
      &::selection {
        background-color: #ffffff;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: orangered;
      border: none;
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
  @media (max-width: 767px) {
    padding: 0px 5px;
  }
  .input-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 2rem;
    border-radius: 2rem;
    overflow: hidden;
    height: 40px;
    input {
      width: 90%;
      color: #000000;
      border: none;
      padding-left: 1rem;
      font-size: 12px;
      &::selection {
        background-color: #9186f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      border-radius: 2rem;
      height: 100%;
      width: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: orangered;
      border: none;
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;
export default ChatInput;
