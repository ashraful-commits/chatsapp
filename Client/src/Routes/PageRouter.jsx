import { createBrowserRouter } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

const PageRouter = createBrowserRouter([...PrivateRoute, ...PublicRoute]);

export default PageRouter;
