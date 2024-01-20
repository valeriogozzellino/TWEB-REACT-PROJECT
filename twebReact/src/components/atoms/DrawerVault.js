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
import { useNavigate } from 'react-router-dom';

export default function DrawerVault({ open, onClose, pages }) {
  const page = pages;
  const navigate = useNavigate();

  const redirectToPage = (page) => () => {
    if (page === "Home") {
      navigate("/");
    } else {
      navigate(`/${page.toLowerCase()}`);
    }
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
      color="primary"
      variant="temporary"
      size="sm"
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
