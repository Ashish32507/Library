import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HeroSection from "./Component/HeroSection.jsx";
import Login from "./Component/Login.jsx";
import Register from "./Component/Register.jsx";
import { Provider } from "react-redux";
import store from "./Redux/Store.js";
import Profile from "./Component/Profile.jsx";
import Book from "./Component/Book.jsx";
import ViewBook from "./Component/ViewBook.jsx";
import IssueBook from "./Component/IssueBook.jsx";
import AddBook from "./Component/Admin/AddBook.jsx";
import AllIssuesBooks from "./Component/User/AllIssuesBooks.jsx";
import AdminDashboard from "./Component/Admin/AdminDashBoard.jsx";
import AdminAllBooks from "./Component/Admin/AdminAllBooks.jsx";
import ShowAllUser from "./Component/Admin/ShowAllUser.jsx";
import AllIssueBook from "./Component/Admin/AllIssueBook.jsx";
import ReturnBook from "./Component/Admin/ReturnBook.jsx";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Layout with HeroSection and main content
  },
  {
    path: "",
    element: <HeroSection />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/allbooks",
    element: <Book />,
  },
  {
    path: "/viewbookbyid/:id",
    element: <ViewBook />,
  },
  {
    path: "/alliussesbooks",
    element: <AllIssuesBooks />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
    children: [
      {
        path: "/admin/issuebook",
        element: <IssueBook />,
      },
      {
        path: "/admin/addbook",
        element: <AddBook />,
      },
      {
        path: "/admin/",
        element: <AdminAllBooks />,
      },
      {
        path: "/admin/allbooks",
        element: <AdminAllBooks />,
      },
      {
        path: "/admin/alluser",
        element: <ShowAllUser />,
      },
      {
        path: "/admin/allissuebook",
        element: <AllIssueBook />,
      },
      {
        path: "/admin/returnbook",
        element: <ReturnBook />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>
);
