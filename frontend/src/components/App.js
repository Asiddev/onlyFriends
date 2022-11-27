import "./App.scss";
import LoginPage from "./home/login/Login";
import Register from "./home/register/Register";
import Dashboard from "./dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState } from "react";


function App() {
  const [cookies, setCookie] = useCookies(null);
  const [user, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );

  console.log(user);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path={"/login"}
            element={
              user ? (
                <Dashboard user={user} setCurrentUser={setCurrentUser} />
              ) : (
                <LoginPage
                  setCookie={setCookie}
                  setCurrentUser={setCurrentUser}
                />
              )
            }
          />
          <Route
            path="/"
            element={
              cookies["access-token"] ? (
                <Dashboard user={user} setCurrentUser={setCurrentUser} />
              ) : (
                <Register />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
