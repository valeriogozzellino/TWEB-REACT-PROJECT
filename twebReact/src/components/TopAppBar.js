import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import '../style/AppBar.css';
import IconLogo from '../Images/logo.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useEffect } from 'react';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

export default function TopAppBar(props) {
  const links = props.links;
  const { checkCredentials, user, getUser } = useAuth();
  const navigate = useNavigate();

  const rerouteHome = () => {
    window.location.href = '/';
  };

  useEffect(() => {
    console.log('INIZIALIZZO LO USER');
    getUser();
  }, []);

  const redirectToPage = (page) => () => {
    if (page === 'Home') {
      navigate('/');
    } else {
      navigate(`/${page.toLowerCase()}`);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <AppBar
        position="static"
        style={{ backgroundColor: '#04233f', color: 'aliceblue' }}
      >
        <Toolbar>
          <div id="container-bar">
            <div id="text-page">
              <div id="logoTopBar">
                <img
                  src={IconLogo}
                  alt="logo"
                  style={{ width: '100px', height: '90px' }}
                  onClick={rerouteHome}
                />
                <h1
                  style={{
                    fontFamily: 'fantasy',
                    fontPalette: 'dark',
                    fontSize: '30px',
                    margin: '0px',
                  }}
                >
                  Footgoal
                </h1>
              </div>

              <div id="links-topbar">
                {links[0] && (
                  <Button
                    size="small"
                    sx={{
                      color: 'white',
                      ':hover': {
                        borderBottomColor: 'white',
                        borderBottomWidth: 1,
                        borderBottomStyle: 'solid',
                      },
                    }}
                    onClick={redirectToPage('Games')}
                  >
                    <Typography
                      variant="p"
                      component="div"
                      sx={{ flexGrow: 1, marginRight: '5px' }}
                    >
                      <b>Games</b>
                    </Typography>
                  </Button>
                )}
                {links[1] && (
                  <Button
                    size="small"
                    sx={{
                      color: 'white',
                      ':hover': {
                        borderBottomColor: 'white',
                        borderBottomWidth: 1,
                        borderBottomStyle: 'solid',
                      },
                    }}
                    onClick={redirectToPage('Teams')}
                  >
                    <Typography
                      variant="p"
                      component="div"
                      sx={{ flexGrow: 1, marginRight: '5px' }}
                    >
                      <b>Teams</b>
                    </Typography>
                  </Button>
                )}
                {links[2] && (
                  <Button
                    size="small"
                    sx={{
                      color: 'white',
                      ':hover': {
                        borderBottomColor: 'white',
                        borderBottomWidth: 1,
                        borderBottomStyle: 'solid',
                      },
                    }}
                    onClick={redirectToPage('Competitions')}
                  >
                    <Typography
                      variant="p"
                      component="div"
                      sx={{ flexGrow: 1, marginRight: '5px' }}
                    >
                      <b>Competitions</b>
                    </Typography>
                  </Button>
                )}
              </div>
            </div>

            <div id="bottom-page">
              {checkCredentials ? (
                <div className="user-bar">
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <em>
                      <b>Welcome</b>
                    </em>{' '}
                    {user.firstName} {user.lastName}
                  </Typography>
                  <PersonOutlineOutlinedIcon />
                </div>
              ) : (
                <div className="user-bar">
                  <Button
                    color="inherit"
                    size="small"
                    variant="outlined"
                    style={{ marginRight: '8px' }}
                    onClick={redirectToPage('Login')}
                  >
                    Login
                  </Button>
                  <Button
                    size="large"
                    color="primary"
                    variant="contained"
                    onClick={redirectToPage('SignUp')}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
