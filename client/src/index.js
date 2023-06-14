import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store/index";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import { MainPage } from "./pages/MainPage";
import { MyPage } from "./pages/MyPage";
import { AccountPage } from "./pages/AccountPage";
import { InfoPage } from "./pages/InfoPage";
import { CreateTable } from "./components/CreateTable";
import { ListTables } from "./components/ListTables";
import { EditPage } from "./pages/EditPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage/>,
    children: [ {
      path: "/",
      element: <MainPage/>
    },
    {
      path: "/my",
      element: <MyPage/>,
      children: [{
        path: "/my",
        element: <ListTables/>
      },
      {
        path: "/my/add",
        element: <CreateTable/>
      },
      {
        path: "/my/edit/:id",
        element: <EditPage/>
      }]
    },
    {
      path: "/account",
      element: <AccountPage/>
    },
    {
      path: "/info/:id",
      element: <InfoPage/>
    }
  ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
