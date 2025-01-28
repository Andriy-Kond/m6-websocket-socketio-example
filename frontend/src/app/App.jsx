import { Route, Routes } from "react-router-dom";
import { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectUserToken } from "./selectors";
import { HomePage, SharedLayout } from "common/pages";
import PrivateRoute from "common/components/navigation/PvivateRoute";
import PublicRoute from "common/components/navigation/PublicRoute";

import { setIsLoggedIn } from "features/auth/authSlice";
import { useGetUserByTokenQuery } from "features/users/usersSlice";
import ChatPage from "common/pages/ChatPage";

// import "dotenv/config"; //! NOT NEEDS IN REACT!!! Otherwise will not works.
// in .env:
// SECRET_API_KEY=my_secret_key      # Wil NOT be available in React
// REACT_APP_PUBLIC_API_URL=http://api.example.com # will be available in React
// in final build:
// console.log(process.env.REACT_APP_PUBLIC_API_URL); // will works
// console.log(process.env.SECRET_API_KEY); // undefined
import { io } from "socket.io-client";

//% Connection to backend (to web-socket server)
// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.REACT_APP_BASE_URL; // address of web-socket server

const socket = io.connect(URL);
// or
// const socket = io(URL);
// socket.connect();

//%/ Connection to backend (to web-socket server)

const ContactsPage = lazy(() => import("common/pages/ContactsPage"));
const RegisterPage = lazy(() => import("common/pages/RegisterPage"));
const LoginPage = lazy(() => import("common/pages/LoginPage"));
const NotFoundPage = lazy(() => import("common/pages/NotFoundPage"));

export default function App() {
  const dispatch = useDispatch();
  const authUserToken = useSelector(selectUserToken);

  const { isSuccess, isFetching } = useGetUserByTokenQuery(undefined, {
    skip: !authUserToken, // Пропускає запит, якщо токен відсутній
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setIsLoggedIn(true));
    } else {
      dispatch(setIsLoggedIn(false));
    }
  }, [dispatch, isSuccess]);

  return (
    <>
      {/* Перевірка !isFetching && - щоб при залогіненому користувачі не мигала спочатку сторінка Login і потім Contacts */}
      {!isFetching && (
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<HomePage />} />

            <Route element={<PrivateRoute redirectTo="/login" />}>
              <Route path="/contacts" element={<ContactsPage />} />
            </Route>

            <Route element={<PublicRoute redirectTo="/contacts" />}>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/chat" element={<ChatPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      )}
    </>
  );
}
