import "./App.scss";
import LoginPage from "./home/login/Login";
import Register from "./home/register/Register";
import Dashboard from "./dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  let user = {
    id: 1,
    name: "alex",
    active: true,
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={user.active ? <Dashboard user={user} /> : <Register />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
