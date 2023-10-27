import styled from "styled-components";
import useFormHandle from "../hooks/useFormHandle";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getAllSate, setMessageEmpty } from "../Feature/AuthSlice";
import { RegisterUser } from "../Feature/AuthApiSlice";
import { useEffect } from "react";
const Register = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { input, setInput, handleInput } = useFormHandle({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, error } = useSelector(getAllSate);
  console.log(message);
  const handleSubmit = (e) => {
    e.preventDefault();
    handleValidation();
    dispatch(
      RegisterUser({
        username: input.username,
        email: input.email,
        password: input.password,
      })
    );
    navigate("/login");
    setInput({ username: "", email: "", password: "", confirmPassword: "" });
  };
  const handleValidation = () => {
    const { password, confirmPassword, username, email } = input;
    if (password !== confirmPassword) {
      toast.error("password & confirm password not match!", {
        position: "bottom-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (!emailRegex.test(email)) {
      toast.error("Email not perfect!", {
        position: "bottom-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters", {
        position: "bottom-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (password.length <= 5) {
      toast.error("Password should be equal or greater than 5 characters", {
        position: "bottom-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return false;
    }
    return true;
  };
  useEffect(() => {
    toast.success(message, {
      position: "bottom-center",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    toast.error(error, {
      position: "bottom-center",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    dispatch(setMessageEmpty());
  }, [message, error, dispatch]);
  return (
    <FormContainer>
      <div className="brand">
        <img src="../../public/chatapp.png" alt="" />
        <h1>
          Chat <span>App</span>
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          value={input.username}
          type="text"
          placeholder="user name"
          onChange={handleInput}
        />
        <input
          name="email"
          value={input.email}
          type="email"
          placeholder="Email"
          onChange={handleInput}
        />
        <input
          name="password"
          value={input.password}
          type="password"
          placeholder="Password"
          onChange={handleInput}
        />
        <input
          name="confirmPassword"
          value={input.confirmPassword}
          type="password"
          onChange={handleInput}
          placeholder="Confirm Password"
        />
        <button type="submit">Submit</button>
        <span>
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
      </form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: white;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h1 {
      margin: 2rem 0;
      color: orange;
      text-transform: uppercase;
      span {
        color: gray;
      }
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background-color: white;
    border-radius: 2rem;
    padding: 3rem 4rem;
    box-shadow: 0 0 10px #f7d6ab;
    input {
      background-color: transparent;
      border-radius: 0.2rem;
      padding: 1rem;
      border: 0.13rem solid orange;
      color: gray;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.13rem solid orangered;
        outline: none;
      }
    }
    button {
      background-color: orange;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: orangered;
      }
    }
    span {
      color: gray;
      text-transform: capitalize;
      a {
        color: orange;
        font-weight: bold;
      }
    }
  }
`;

export default Register;
