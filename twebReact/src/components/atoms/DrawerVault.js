import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

// pages is an array of strings of the pages you want to show in the drawer, 
// for example: ['Home', 'News', 'Ranking', 'Teams', 'Players', 'LogIn', 'SignUp']
//its very importanto to dont forget it
//non devo accedere a props. page perchè in questo modo è già destrutturato con le {}
export default function DrawerVault({ open, onClose, pages }) {
  const page = pages;
  console.log(pages + " in DRAWERVAULt");
  const redirectToPage = (page) => () => {
    window.location.href = `/${page.toLowerCase()}`;
  };
  //if you want to insert more page in drawervault you can add a new element in the array below
  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
          open={open}
            onClose={onClose}
    >
          <Toolbar />
          <Button onClick={onClose}>Close</Button>
      <Divider />
      <List>
        { page.map((text, index)  => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={redirectToPage(text)} >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
}
