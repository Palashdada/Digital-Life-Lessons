import { createBrowserRouter } from "react-router";
import HomeLayout from "./assets/layouts/HomeLayout";
import Home from "./assets/pages/Home";
import Login from "./assets/pages/Login";
import Register from "./assets/pages/Register";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);
export default router;
