import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BottomNav(props) {
  const navigate = useNavigate();
  const logOut = (event) => {
    event.preventDefault();
    axios.get("/api/users/logout").then(() => {
      localStorage.removeItem("user");
      props.setCurrentUser(null);
      navigate("/login");
    });
  };
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={props.value}
        onChange={(event, newValue) => {
          props.setValue(newValue);
        }}
      >
        <BottomNavigationAction
          component={Link}
          value={"/"}
          to={"/"}
          href="/"
          label={"Home"}
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to={"/profile"}
          href="/profile"
          value={"/profile"}
          label={"Profile"}
          icon={<AccountBoxIcon />}
        />

        <BottomNavigationAction
          to={"/matches"}
          href="/matches"
          value={"/matches"}
          label={"Matches"}
          component={Link}
          icon={<PeopleAltIcon />}
        />

        <BottomNavigationAction
          label="Logout"
          icon={<LogoutIcon />}
          onClick={logOut}
        />
      </BottomNavigation>
    </Paper>
  );
}

export default BottomNav;
