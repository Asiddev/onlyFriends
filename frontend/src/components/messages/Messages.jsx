import * as React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  Link,
  Box,
  AppBar,
  Toolbar,
  Container,
  TextField,
} from "@mui/material";
import SignalWifiStatusbar4BarIcon from "@mui/icons-material/SignalWifiStatusbar4Bar";
import "./Messages.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../bottomnav/BottomNav";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © Nico Hernandez, Alex Sidor, Kevin Lee "}
      <Link color="inherit" href="https://github.com/Asiddev/onlyFriends">
        OnlyFriends
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Messages(props) {
  console.log(props);
  const [profileInterests, setProfileInterest] = useState([]);
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
    <>
      <Box>
        <AppBar>
          <Toolbar className="navbar-logo">
            <Box
              component="img"
              sx={{ width: 150 }}
              alt="OnlyFriends logo"
              src="https://i.imgur.com/Bgur1Fk.png"
            />
          </Toolbar>
        </AppBar>
      </Box>

      <Container maxWidth="md" className="relative2">
        <div className="shadow ">
          <Card sx={{ maxWidth: "100%" }} className="block padding">
            <Typography variant="body1" color="text.secondary">
              Status
            </Typography>
            <TextField
              style={{ width: "500px" }}
              placeholder="Whats on your mind?"
            ></TextField>
            <br />
            <br />
            <CardHeader
              className="top-container"
              avatar={<Avatar src={props.user.profile_picture}></Avatar>}
              action={<IconButton aria-label="settings"></IconButton>}
              title="Online"
              subheader={
                <SignalWifiStatusbar4BarIcon style={{ fill: "green" }} />
              }
            />

            <Typography
              variant="body2"
              color="text.secondary"
              className="center"
            ></Typography>
            <Container maxWidth="lg">
              <Box bgcolor="white" height="400px" mb={2} pt={2}>
                <Box bgcolor="white" mb={2} pt={2}>
                  <Box
                    bgcolor="light-grey"
                    marginBottom={1}
                    height="70px"
                    p={3}
                    boxShadow={1}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Jason
                    </Typography>
                  </Box>
                  <Box
                    bgcolor="light-grey"
                    marginBottom={1}
                    height="70px"
                    p={3}
                    boxShadow={1}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Jason
                    </Typography>
                  </Box>
                  <Box marginBottom={1} height="70px" p={3} boxShadow={1}>
                    <Typography variant="body2" color="text.secondary">
                      Jason
                    </Typography>
                  </Box>
                  <Box
                    bgcolor="light-grey"
                    marginBottom={1}
                    height="70px"
                    p={3}
                    boxShadow={1}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Jason
                    </Typography>
                  </Box>
                  <Box
                    bgcolor="light-grey"
                    marginBottom={1}
                    height="70px"
                    p={3}
                    boxShadow={1}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Jason
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Container>
            <CardContent className="center"></CardContent>
          </Card>
        </div>
        <div className="spacer">
          <Copyright />
        </div>
      </Container>
      <BottomNav value={props.value} setValue={props.setValue} />
    </>
  );
}
export default Messages;
