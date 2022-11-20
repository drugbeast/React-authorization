import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./routes/Layout";
import Login from "./routes/Login";
import About from "./routes/About";
import Notes from "./routes/Notes";
import NewNote from "./routes/NewNote";
import EditNote from "./routes/EditNote";
import WatchNote from "./routes/WatchNote";
import NotFound from "./routes/NotFound";
import Register from "./routes/Register";
import UserContextProvider from "./components/userContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/about",
          index: true,
          element: <About />,
        },
        {
          path: "/notes",
          index: true,
          element: <Notes />,
        },
        {
          path: "/notes/new",
          index: true,
          element: <NewNote />,
        },
        {
          path: "/notes/:id/edit",
          index: true,
          element: <EditNote />,
        },
        {
          path: "/notes/:id",
          index: true,
          element: <WatchNote />,
        },
        {
          path: "*",
          index: true,
          element: <NotFound />,
        }
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;
