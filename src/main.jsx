import React from "react";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AllArticles,
  CreateArticle,
  EditArticle,
  Login,
  NotFoundPage,
  Register,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/articles/page?/:pageNumber?",
        element: <AllArticles />,
      },
      {
        path: "/articles/edit/:slug",
        element: <EditArticle />,
      },
      {
        path: "/articles/create",
        element: <CreateArticle />,
      },
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
