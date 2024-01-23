import * as React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import { useNavigate } from 'react-router-dom';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ForumIcon from '@mui/icons-material/Forum';
import ThreePIcon from '@mui/icons-material/ThreeP';
const actions = [
  { icon: <ForumIcon />, name: 'PlayersDiscussion'  },
  { icon: <ForumIcon />, name: 'TeamsDiscussion'  },
  { icon: <ForumIcon />, name: 'GamesDiscussion'  },
];

export default function ChatIcon() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const getChat = (name) => {
    const chatRoom = name;
    navigate(`/chat/${chatRoom}`);
  }
  return (
    <Box sx={{ height: '100%', transform: 'translateZ(0px)', flexGrow: 1 }}>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<ChatBubbleIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => getChat(action.name) }
          />
        ))}
      </SpeedDial>
    </Box>
  );
}