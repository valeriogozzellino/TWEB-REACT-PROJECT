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



export default function TopAppBar(props) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const links = props.links;
  const pages = props.pages;
  const getLoginPage = () => {
     window.location.href = '/logIn';
  }
  const getSignUpPage = () => {
   window.location.href = '/signup';
  }
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ width:'100%'}}>
      <AppBar position="static" style={{backgroundColor:'#2a4d69', height:'90px'}}>
        <Toolbar>
          <div id='container-bar'>
            <div id='text-page'>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleDrawerOpen} // Aggiungi l'evento onClick per aprire il DrawerVault
            >
              <MenuIcon />
            </IconButton>
            {links[0] && (
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Home
              </Typography>
              
            )}
            {links[1] && (
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Games
              </Typography>
            )}
            {links[2] && (
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Ranking
              </Typography>
            )}
            {links[3] && (
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Teams
              </Typography>
            )}
            {links[4] && (
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Competitions
              </Typography>
            )}
            {links[5] && (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Single Competitions
            </Typography>
            )}
            {links[6] && (
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Single Team
              </Typography>
            )}
              {links[7] && (
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Player
              </Typography>
            )}
              
            </div>
            <div id='logoTopBar'>
              <img src={IconLogo} alt='logo' style={{width:'100px', height:'90px'}}/>
            </div>
            <div id='bottom-page'>

            {links[8] && <Button color="inherit" variant='outlined'  sx={{marginRight:'5px'}} onClick={getLoginPage}>Login</Button>}
            {links[9] && <Button color="inherit" variant='outlined' onClick={getSignUpPage}>Sign Up</Button>}
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <DrawerVault open={drawerOpen} onClose={handleDrawerClose} pages={pages} /> {/* Passa lo stato del Drawer al componente DrawerVault */}
    </Box>
  );
}
