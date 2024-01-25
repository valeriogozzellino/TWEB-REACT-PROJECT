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
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsIcon from '@mui/icons-material/Sports';
import GroupsIcon from '@mui/icons-material/Groups';

export default function DrawerVault({
  open,
  onClose,
  chattingRooms,
  onChangeRoom,
}) {
  const roomLink = [
    { icon: <SportsSoccerIcon />, name: 'PlayersChat' },
    { icon: <GroupsIcon />, name: 'TeamsChat' },
    { icon: <SportsIcon />, name: 'GamesChat' },
  ];

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
        {chattingRooms.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => onChangeRoom('/' + roomLink[index].name)}
            >
              <ListItemIcon>{roomLink[index].icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
}
