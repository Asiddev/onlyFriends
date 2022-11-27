import * as React from "react";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import "../../../styles/animations.scss";
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

const theme = createTheme();

function Register() {
  const navigator = useNavigate();
  const [error, setError] = React.useState("");

  const validator = (event) => {
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
      email: newData.get("email"),
      password: newData.get("password"),
      password_confirmation: newData.get("password_confirmation"),
    };

    axios
      .post("/api/users", newDataObj)
      .then((data) => {
        console.log("success!");
        return navigator("/login");
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
                src="https://i.imgur.com/Bgur1Fk.png"
                alt="OnlyFriends logo"
                style={{ width: "15rem", paddingBottom: "1rem" }}
                className="bounce2"
              />

              <Typography component="h1" variant="h5" className="theme-font">
                Register
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
                )}
                <br />
                <TextField
                  className="white-inputs"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  autoFocus
                />
                <TextField
                  className="white-inputs"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
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
                />
                <TextField
                  className="white-inputs"
                  margin="normal"
                  required
                  fullWidth
                  name="password_confirmation"
                  label="Password Confirmation"
                  type="password"
                  id="password_confirmation"
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
                  Register
                </Button>

                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/login" variant="body2">
                      {"Already have an account?"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>
      </div>

      <div className="right-half">
        <img
          className="picture-size"
          src="https://i.imgur.com/8T2x8sm.png"
          alt=""
        />
        <br />
        <br />
        <p>
          <span className="light-blue">Only</span>
          <span className="dark-blue">Friends</span> allows people with similar
          interests or hobbies to get together.
        </p>
        <br />
        <p>
          Once you've created a profile, you will be part of a vast community of
          people looking to find others that love to spend time off the same way
          you do!
        </p>
      </div>
    </div>
  );
}

export default Register;
