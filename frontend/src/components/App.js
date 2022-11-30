import "./App.scss";
import LoginPage from "./home/login/Login";
import Register from "./home/register/Register";
import Dashboard from "./dashboard/Dashboard";
import Messages from "./messages/Messages";
import Browse from "./browse/Browse";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

function App() {
  const [cookies, setCookie] = useCookies(null);
  const pathname = window.location.pathname;
  const [value, setValue] = useState(pathname);
  const [user, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );

  console.log(pathname);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/messages"
            element={<Messages user={user} value={value} setValue={setValue} />}
          />
          <Route
            path="/login"
            element={
              user ? (
                <Browse
                  user={user}
                  setCurrentUser={setCurrentUser}
                  value={value}
                  setValue={setValue}
                />
              ) : (
                <LoginPage
                  setCookie={setCookie}
                  setCurrentUser={setCurrentUser}
                  value={value}
                  setValue={setValue}
                />
              )
            }
          />
          <Route
            path="/"
            element={
              cookies["access-token"] ? (
                <Browse
                  user={user}
                  setCurrentUser={setCurrentUser}
                  value={value}
                  setValue={setValue}
                />
              ) : (
                <Register />
              )
            }
          />
          <Route
            path="/profile"
            element={
              <Dashboard
                user={user}
                setCurrentUser={setCurrentUser}
                value={value}
                setValue={setValue}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
