import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getAllSate } from "../Feature/AuthSlice";

const PrivateGard = () => {
  const { loggedInData } = useSelector(getAllSate);

  if (localStorage.getItem("LoggedInUser")) {
    return <Outlet />;
  } else {
    return loggedInData ? <Outlet /> : <Navigate to="/login" />;
  }
};

export default PrivateGard;
