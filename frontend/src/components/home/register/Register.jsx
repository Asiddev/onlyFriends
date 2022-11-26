import * as React from 'react';
import "./Register.scss";
import { Alert, AlertTitle, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, createTheme, ThemeProvider } from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © Nico Hernandez, Alex Sidor, Kevin Lee '}
      <Link color="inherit" href="https://github.com/Asiddev/onlyFriends">
        OnlyFriends
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

function Register() {

  const [error, setError] = React.useState("");

  const validator = (event) => {
    setError("");
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Check email is valid format or blank
    if (!isValidEmail(data.get('email')) || !data.get('email')) {
      setError("Invalid email");
      return;
    } else if (!data.get('password')) {
      setError("Invalid password");
    }
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  return (
    <div className='container'>

      <div className='left-half'>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >

              <img src="https://i.imgur.com/Bgur1Fk.png" alt="OnlyFriends logo" style={{ width: "15rem", paddingBottom: "1rem" }} />

              <Typography component="h1" variant="h5">
                Register
              </Typography>
              <Box component="form" onSubmit={validator} noValidate sx={{ mt: 1 }}>

                {error &&
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {error}
                  </Alert>
                } <br />

                <TextField
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
                  Register
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>
      </div>

      <div className='right-half'>
        <div className='container-right-half'>
          <p>
            <span className='light-blue'>Only</span><span className='dark-blue'>Friends</span> allows people with similar interests or hobbies to get together.
          </p> <br />
          <p>
            Once you've created a profile, you will be part of a vast community of people looking to find others that love to spend time off the same way you do!
          </p>
        </div>
      </div>

    </div>
  );
}

export default Register;
