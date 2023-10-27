import Layout from "../Components/Layout";
import Avater from "../Pages/Avater";
import Chat from "../Pages/Chat";
import PrivateGard from "./PrivateGard";

const PrivateRoute = [
  {
    element: <Layout />,
    children: [
      {
        element: <PrivateGard />,
        children: [
          {
            path: "/",
            element: <Chat />,
          },
          {
            path: "/avatar",
            element: <Avater />,
          },
        ],
      },
    ],
  },
];

export default PrivateRoute;
