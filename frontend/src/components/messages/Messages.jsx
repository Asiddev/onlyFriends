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
  CssBaseline,
} from "@mui/material";
import SignalWifiStatusbar4BarIcon from "@mui/icons-material/SignalWifiStatusbar4Bar";
import "./Messages.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../topnav/TopNav";
import BottomNav from "../bottomnav/BottomNav";
import Copyright from "../Copyright";

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
      <div className="OLD CODE TO BE REPLACED">
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
      </div>


      {/* NEW CODE BELOW - replace entire return block above */}
      {/* everything on this page is in this main Box, think of it as a fragment */}
      <Box sx={{
        pb: 10,
        // border: "3px solid red"
      }}>
        <CssBaseline />
        <TopNav />

        {/* THIS IS THE MAIN BODY - BETWEEN THE TOP NAV AND BOTTOM NAV */}
        <Container maxWidth="md"
          sx={{
            // border: "3px dashed blue"
          }}>
          <Box
            sx={{
              borderRadius: "1.75rem",
              backgroundColor: "#E4F8FF",
              // border: "3px solid red",
              padding: "2rem"
            }}
          >
            <Typography
              variant='h4'
              color="#008CCF"
              align='center'
              marginBottom="2rem"
            >
              Messages
            </Typography>

            <Typography variant='h5'>
              stuff - this blue card should replace the white card above
            </Typography>
          </Box>
        </Container>

        <br />
        <Copyright />
        <BottomNav value={props.value} setValue={props.setValue} />
      </Box>
    </>
  );
}
export default Messages;
