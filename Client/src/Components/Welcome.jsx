import React from "react";
import styled from "styled-components";

const Welcome = ({ currentUser }) => {
  return (
    <Container>
      <div className="blur"></div>
      <div className="blur1"></div>
      <div className="blur2"></div>
      <div className="blur3"></div>
      <div className="blur4"></div>
      <img
        src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/585d0331234507.564a1d239ac5e.gif"
        alt="robot"
      />
      <h1>
        welcome, <span>{currentUser?.username}</span>
      </h1>
      <h3>Please select a chat to start messaging</h3>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  background-color: #fff;
  position: relative;
  z-index: 0;
  padding: 10px;
  .blur {
    width: 300px;
    height: 20%;
    background-color: #ffe0d0;
    border-radius: 50px;
    position: absolute;
    top: 45%;
    left: 25%;
    filter: blur(2px);
    z-index: -1;
    border-bottom-right-radius: 0;
  }
  .blur1 {
    width: 15%;
    height: 5%;
    background-color: #ffebeb;
    border-radius: 30px;
    position: absolute;
    top: 15%;
    left: 25%;
    filter: blur(2px);
    z-index: -1;
  }
  .blur2 {
    width: 15%;
    height: 5%;
    background-color: #f0ffeb;
    border-radius: 30px;
    position: absolute;
    bottom: 15%;
    right: 25%;
    filter: blur(2px);
    z-index: -1;
  }
  .blur3 {
    width: 15%;
    height: 5%;
    background-color: #ffebeb;
    border-radius: 30px;
    position: absolute;
    bottom: 5%;
    left: 25%;
    filter: blur(2px);
    z-index: -1;
  }
  .blur4 {
    width: 15%;
    height: 5%;
    background-color: #efffeb;
    border-radius: 30px;
    position: absolute;
    top: 5%;
    right: 25%;
    filter: blur(2px);
    z-index: -1;
  }
  img {
    height: 2rem;
    margin: 1rem 0;
  }
  h1 {
    margin: 1rem 0;
    color: orange;
    text-transform: capitalize;
    font-size: 22px;
  }
  span {
    color: gray;
    text-transform: uppercase;
  }
  h3 {
    color: #fba8a8;
    font-size: 13px;
  }
  @media screen and (max-width: 768px) {
    .blur {
      top: 45%;
      left: 20%;
    }
  }
`;
export default Welcome;
