// import React from "react";
// import 'bootstrap'
// import TopAppBar from "../components/atoms/TopAppBar";

// function LogIn() {

//     const links = [false, true, true, true, true, true, true];
//     const pages = ['Home', 'News', 'Ranking', 'Teams', 'Player'];
//     class User {
//         constructor(name, surname, email, password) {
//             this.name = name;
//             this.surname = surname;
//             this.email = email;
//             this.password = password;
//         }
//     }
//     const user = new User();

//     function getUser() {
//         user.name = document.getElementById("name").value;
//         user.surname = document.getElementById("surname").value;
//         user.email = document.getElementById("email").value;
//         user.password = document.getElementById("password").value;
//         console.log(user);
//     }
    
//     return (
//         <div>
//             <TopAppBar links={links} pages={pages} />
//         <div id="containerHeader">
//             <div className="headerDiv" id="headerDiv">
//                 {/*<img src="/images/logo.jpeg" alt="application logo" id="logo">*/}
//             </div>
//             <div><h3>insert your data to log in your account</h3></div>
//         </div>
//         <form id="form">
//             <div className="form-row">
//                 <div className="form-group col-md-6">
//                     <label htmlFor="name">Name</label>
//                     <input type="text" className="form-control" id="name" name="name"/>
//                 </div>
//                 <div className="form-group col-md-6">
//                     <label htmlFor="surname">Surname</label>
//                     <input type="text" className="form-control" id="surname" name="surname"/>
//                 </div>
//             </div>
//             <div className="form-row">
//                 <div className="form-group col-md-6">
//                     <label htmlFor="email">Email</label>
//                     <input type="email" className="form-control" id="email" name="email"/>
//                 </div>
//                 <div className="form-group col-md-6">
//                     <label for="password">Password</label>
//                     <input type="password" className="form-control" id="password" name="password"/>
//                 </div>
//             </div>
//             <button type="button" className="btn btn-primary" onClick={getUser}>Sign in</button>    
//         </form>
//     </div>
// );
// }
// export default LogIn;
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LogIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
              Sign In
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
  );
}