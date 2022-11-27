import "./App.scss";
import LoginPage from "./home/login/Login";
import Register from "./home/register/Register";
import Dashboard from "./dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

function App() {
  const [cookies, setCookie] = useCookies(null);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage setCookie={setCookie} />} />
          <Route
            path="/"
            element={cookies["access-token"] ? <Dashboard /> : <Register />}
          />
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
