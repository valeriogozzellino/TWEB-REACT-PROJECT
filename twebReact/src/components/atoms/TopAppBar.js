import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DrawerVault from './DrawerVault'; // Assicurati di importare correttamente il componente DrawerVault

export default function TopAppBar(props) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const links = props.links;
  const pages = props.pages;
  console.log(pages+ " in TOPAPPBAR");
  const getLoginPage = () => {
    //indirizzamento diretto alla pagina utilizzadno la specifica all'interno della componente APP.js
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
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
              News
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
              Players
            </Typography>
          )}
          {links[5] && (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Competitions
            </Typography>
          )}
          {links[6] && <Button color="inherit" onClick={getLoginPage}>Login</Button>}
          {links[7] && <Button color="inherit" onClick={getSignUpPage}>SignUp</Button>}
        </Toolbar>
      </AppBar>
      <DrawerVault open={drawerOpen} onClose={handleDrawerClose} pages={pages} /> {/* Passa lo stato del Drawer al componente DrawerVault */}
    </Box>
  );
}
