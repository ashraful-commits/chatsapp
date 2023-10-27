import styled from "styled-components";
import useFormHandle from "../hooks/useFormHandle";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { getAllSate } from "../Feature/AuthSlice";

import { useEffect } from "react";
import { UserLogin } from "../Feature/AuthApiSlice";
import { setMessageEmpty } from "../Feature/MessageSlice";

const Login = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { input, setInput, handleInput } = useFormHandle({
    password: "",
    email: "",
  });
  const dispatch = useDispatch();

  const { loggedInData, message, error } = useSelector(getAllSate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!emailRegex.test(input.email)) {
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
        dispatch(setMessageEmpty());
      } else if (input.password.length <= 5) {
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
        dispatch(setMessageEmpty());
      } else {
        dispatch(UserLogin({ email: input.email, password: input.password }));
        setInput({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.error("Something went wrong!", error);
    }
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
  }, [dispatch, message, error, loggedInData]);
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

        <button type="submit">Submit</button>
        <span>
          Don&apos;t have an account? <Link to={"/register"}>Register</Link>
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
    box-shadow: 0 0 150px #fac395;
    border-radius: 2rem;
    padding: 3rem 4rem;
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
      color: white;
      text-transform: capitalize;
      a {
        color: orange;
        font-weight: bold;
      }
    }
  }
`;

export default Login;
