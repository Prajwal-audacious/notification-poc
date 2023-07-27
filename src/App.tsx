import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import AdminPage from "./pages/admin/AdminPage";
import Home from "./pages/home/Home";
import Notification from "./pages/notification/Notification";
import { ProctectedRoutes } from "./protectedRoutes";
import UserNotification from "./pages/notification/UserNotification";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProctectedRoutes />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/admin",
          element: <AdminPage />,
        },
        {
          path: "/notification",
          element: <Notification />,
        },
        {
          path: "/notification/:id",
          element: <UserNotification />,
        },
      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
