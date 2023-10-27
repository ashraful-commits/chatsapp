import React from "react";
import styled from "styled-components";

const Welcome = ({ currentUser }) => {
  return (
    <Container>
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
  background-color: #030029;
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
  }
`;
export default Welcome;
