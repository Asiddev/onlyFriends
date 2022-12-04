import * as React from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../../configAPI/firebase.js";
import { doc, setDoc } from "firebase/firestore";
import "./Register.scss";
import "../../../styles/animations.scss";
import { createTheme } from "@mui/material";
import axios from "axios";
import RightRegisterSection from "./RightRegisterSection.jsx";
import LeftRegisterSection from "./LeftRegisterSection.jsx";

const theme = createTheme();

function Register() {
  const navigator = useNavigate();
  const [error, setError] = React.useState("");

  const validator = async (event) => {
    setError("");
    event.preventDefault();
    const newData = new FormData(event.currentTarget);
    // Check email is valid format or blank
    if (!isValidEmail(newData.get("email")) || !newData.get("email")) {
      setError("Invalid email");
      return;
    } else if (!newData.get("password")) {
      setError("Invalid password");
      return;
    }
    const newDataObj = {
      name: newData.get("name"),
      email: newData.get("email").toLowerCase(),
      password: newData.get("password"),
      password_confirmation: newData.get("password_confirmation"),
    };

    //Insert user info into firebase auth database
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        newDataObj.email,
        newDataObj.password
      );

      await updateProfile(res.user, {
        displayName: newDataObj.name,
      });
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName: res.user.displayName,
        email: res.user.email,
      });
    } catch (err) {
      console.log(err);
    }

    axios
      .post("/api/users", newDataObj)
      .then((data) => {
        navigator("/login");
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data);
      });
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  return (
    <div className="container">
      <LeftRegisterSection error={error} theme={theme} validator={validator} />
      <RightRegisterSection />
    </div>
  );
}

export default Register;
