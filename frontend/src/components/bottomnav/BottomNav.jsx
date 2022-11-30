import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MessageIcon from "@mui/icons-material/Message";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "@mui/material";

function BottomNav(props) {
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
          value={"/login"}
          to={"/login"}
          href="/login"
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
          component={Link}
          to={"/messages"}
          href="/messages"
          value={"/messages"}
          label={"Messages"}
          icon={<MessageIcon />}
        />

        <BottomNavigationAction label="Logout" icon={<LogoutIcon />} />
      </BottomNavigation>
    </Paper>
  );
}

export default BottomNav;
