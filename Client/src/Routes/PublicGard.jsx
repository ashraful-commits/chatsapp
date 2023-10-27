import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getAllSate } from "../Feature/AuthSlice";

const PublicGard = () => {
  const { loggedInData } = useSelector(getAllSate);
  if (localStorage.getItem("LoggedInUser")) {
    return <Navigate to="/avatar" />;
  }
  return loggedInData ? <Navigate to="/avatar" /> : <Outlet />;
};

export default PublicGard;
