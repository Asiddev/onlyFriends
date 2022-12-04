import React from "react";
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
  ThemeProvider,
} from "@mui/material";
import Copyright from "../../Copyright";

function LeftRegisterSection(props) {
  const { theme, error, validator } = props;

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
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <TextField
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
          <br />
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default LeftRegisterSection;
