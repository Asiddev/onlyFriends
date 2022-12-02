import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  AlertTitle,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import axios from "axios";
import "../../../styles/animations.scss";
import Copyright from "../../Copyright";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../configAPI/firebase.js";

function LeftLoginSection(props) {
  const theme = createTheme();
  const navigate = useNavigate();
  const [error, setError] = React.useState("");

  const validator = async (event) => {
    setError("");
    event.preventDefault();
    const newData = new FormData(event.currentTarget);

    const newDataObj = {
      email: newData.get("email"),
      password: newData.get("password"),
    };

    try{
      await signInWithEmailAndPassword(auth, newDataObj.email, newDataObj.password)
    } catch (err) {
      console.log(err);
    }

    axios
      .post("/api/users/login", newDataObj)
      .then((data) => {
        console.log(data.data.user);
        props.setCurrentUser(data.data.user);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        props.setCookie(data.token);
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data);
      });
  };
  return (
    <div className="left-half">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              className="bounce2"
              src="https://i.imgur.com/Bgur1Fk.png"
              alt="OnlyFriends logo"
              style={{ width: "15rem", paddingBottom: "1rem" }}
            />

            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              onSubmit={validator}
              noValidate
              sx={{ mt: 1 }}
            >
              {error && (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {error}
                </Alert>
              )}{" "}
              <br />
              <TextField
                className="white-inputs"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                className="white-inputs"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <br />
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default LeftLoginSection;
