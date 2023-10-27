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
  /* overflow: hidden; */
  grid-template-columns: 10% 90%;
  align-items: center;
  justify-content: space-around;
  background-color: #100066;
  padding: 0 4rem;

  position: relative;
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 2rem;
    position: relative;
    z-index: 999;
    .emoji {
      position: absolute;
      left: 0;
      z-index: 999999999999;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .EmojiPickerReact {
        position: absolute;
        bottom: 35px;
        background-color: #080420;
        border-color: orange;
        box-shadow: 0 0 30px orange;
        z-index: 99999999999;

        .epr-search-container {
          input {
            background-color: #080420;
            border: none;
          }
        }
        .epr-emoji-category-label {
          background-color: #080420;
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
    background-color: #c7c7c7;
    border-radius: 2rem;
    overflow: hidden;
    input {
      width: 90%;

      background-color: transparent;
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
      padding: 0.7rem 2rem;
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
    background-color: #c7c7c7;
    border-radius: 2rem;
    overflow: hidden;
    height: 40px;
    input {
      width: 90%;

      background-color: transparent;
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
      padding: 0.7rem 2rem;
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
`;
export default ChatInput;
