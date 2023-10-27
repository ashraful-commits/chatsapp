import { RouterProvider } from "react-router-dom";
import "./App.css";
import PageRouter from "./Routes/PageRouter";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUser, LoggedInUser } from "./Feature/AuthApiSlice";
import { getAllMessage } from "./Feature/MessageApi";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:3030";
function App() {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(null);

  const userData = JSON.parse(localStorage.getItem("LoggedInUser"));

  useEffect(() => {
    dispatch(GetAllUser());
    dispatch(getAllMessage());
  }, [dispatch]);
  useEffect(() => {
    if (localStorage.getItem("LoggedInUser")) {
      dispatch(LoggedInUser());
    }
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={PageRouter} />
    </>
  );
}

export default App;
