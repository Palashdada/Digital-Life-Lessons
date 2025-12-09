import { createBrowserRouter } from "react-router";
import HomeLayout from "./layouts/HomeLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
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
