import styled from "styled-components";
import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogoutUser } from "../Feature/AuthApiSlice";
const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = async (e) => {
    e.preventDefault();
    localStorage.clear();
    dispatch(LogoutUser());

    navigate("/login");
  };
  return (
    <Container>
      <button onClick={handleClick}>
        <BiPowerOff size={18} />
      </button>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.1rem;
  border-radius: 100%;
  background-color: #ff4800;
  border: none;
  width: 30px;
  height: 30px;
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: white;
    width: 100%;
    height: 100%;

    svg {
      color: #ebe7ff;
    }
  }
`;
export default Logout;
