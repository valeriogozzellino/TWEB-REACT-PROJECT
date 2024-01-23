import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DrawerVault from './DrawerVault'; // Assicurati di importare correttamente il componente DrawerVault
import HomeIcon from '@mui/icons-material/Home';
import '../../style/AppBar.css';
import IconLogo from '../../Images/logo.png'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

export default function TopAppBar(props) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const links = props.links;
  const { checkCredentials, user } = useAuth();
  const navigate = useNavigate();
  const [itemClicked, setItemClicked] = React.useState(false);

  const getLoginPage = () => {
     navigate('/logIn');
  }
  const getSignUpPage = () => {
   navigate('/signup');
  }
  const getPreviousPage = () => {
    window.history.back();

  }
  const rerouteHome = () => {
    window.location.href = '/';
  }
 
   const redirectToPage = (page) => () => {
     if (page === "Home") {
      
      navigate("/");
    } else {
      navigate(`/${page.toLowerCase()}`);
    }
  };

  return (
    <Box sx={{ width:'100%'}}>
      <AppBar position="static" style={{backgroundColor:'#04233f', color:'aliceblue'}}>
        <Toolbar>
          <div id='container-bar'>
            <div id='text-page'>
              <div id='logoTopBar'>
                <img src={IconLogo} alt='logo' style={{ width: '100px', height: '90px' }} onClick={rerouteHome} />
                <h1 style={{fontFamily:'fantasy', fontPalette:'dark', fontSize :'30px', margin:'0px'}}>Footgoal</h1>
              </div>

              <div id='links-topbar'>
              {links[0] && (
                <Typography variant="p" component="div" sx={{ flexGrow: 1 }} onClick={redirectToPage}>
                  Home
                </Typography>
                
              )}
              {links[1] && (
                <Button size='small' sx={{color: 'white',
                                          ':hover': {
                                            borderBottomColor: 'white', 
                                            borderBottomWidth: 1,
                                            borderBottomStyle: 'solid'
                                          }}} onClick={redirectToPage('Games')}>
                <Typography variant="p"  component="div" sx={{ flexGrow: 1, marginRight:'5px' }} >
                  <b>Games</b>
                </Typography>
              </Button>
              )}
              {links[2] && (
                <Button size='small' sx={{color: 'white', ':hover': {
                                            borderBottomColor: 'white', 
                                            borderBottomWidth: 1,
                                            borderBottomStyle: 'solid'
                                          }}} onClick={redirectToPage('Ranking')}>
                <Typography variant="p" component="div" sx={{ flexGrow: 1 , marginRight:'5px'}} >
                  <b>Ranking</b>
                </Typography>
              </Button>
              )}
                {links[3] && (
                <Button size='small' sx={{color: 'white', ':hover': {
                                            borderBottomColor: 'white', 
                                            borderBottomWidth: 1,
                                            borderBottomStyle: 'solid'
                                          }}} onClick={redirectToPage('Teams')}>
                <Typography variant="p" component="div" sx={{ flexGrow: 1 , marginRight:'5px'}} >
                  <b>Teams</b>
                </Typography>
                </Button>
              )}
              {links[4] && (
                <Button size='small' sx={{ color: 'white', ':hover': {
                                            borderBottomColor: 'white', 
                                            borderBottomWidth: 1,
                                            borderBottomStyle: 'solid'
                                          }}} onClick={redirectToPage('Competitions')}>
                <Typography variant="p" component="div" sx={{ flexGrow: 1, marginRight:'5px'}} >
                 <b>Competitions</b>
                </Typography>
                </Button>
              )}
              {links[5] && (
              <Typography variant="p" component="div" sx={{ flexGrow: 1, marginRight:'5px'}}>
                <b>Single Competitions</b>
              </Typography>
              )}
              {links[6] && (
                <Typography variant="p" component="div" sx={{ flexGrow: 1, marginRight:'5px'}}>
                  <b>Single Team</b>
                </Typography>
              )}
                {links[7] && (
                <Typography variant="p" component="div" sx={{ flexGrow: 1, marginRight:'5px'}}>
                  <b>Player</b>
                </Typography>
              )}
                </div>
              </div>
              <Button color="inherit" variant='outlined' onClick={getPreviousPage}>Back</Button>

            <div id='bottom-page'>
              {checkCredentials ? (
                <div className='user-bar'>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Welcome {user.firstName} {user.lastName}
                  </Typography>
                  <PersonOutlineOutlinedIcon/>
                </div>
              ) : (
                <div className='user-bar'>
                  <Button color="inherit" size='small' variant='outlined' style={{marginRight:'8px'}} onClick={redirectToPage('Login')}>Login</Button>
                  <Button size='large' color="primary" variant='contained' onClick={redirectToPage('SignUp')}>Sign Up</Button>
                </div>
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
