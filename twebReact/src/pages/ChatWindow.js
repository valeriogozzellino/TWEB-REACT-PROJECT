import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TopAppBar from '../components/atoms/TopAppBar';
import Footer from '../components/atoms/Footer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../style/global.css';
import { useParams } from 'react-router-dom';
import { useAuth } from '../components/atoms/AuthContext';
import { socket } from '../services/socket';
import { useNavigate } from 'react-router-dom';
import Drawer from '../components/atoms/DrawerVault';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
//IMPORTANTE :
//ancora da fare :
//fare un check se id Utente uguale a quello che lo riceve per non inseririlo nella lista dei messaggi ricevuti

export default function ChatWindow() {
  const { checkCredentials, user } = useAuth(); //user details from AuthContext
  const links = [false, true, true, true, true, false, false, false];
  const [userLogged, setUserLogged] = useState(checkCredentials); //only logged user can send messages
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const navigate = useNavigate();

  //cancellazione di queste variabili ???
  const { chatRoom } = useParams();
  console.log('chatRoom---> ', chatRoom);
  const [currentRoom, setCurrentRoom] = useState(chatRoom);
  const [messagesPlayers, setMessagesPlayers] = useState([]);
  const [messagesTeams, setMessagesTeams] = useState([]);
  const [messagesGames, setMessagesGames] = useState([]);

  const room = '/' + chatRoom;

  const socketServerUrl = 'http://localhost:3001';
  const [newMessage, setNewMessage] = useState({
    userId: '',
    text: '',
    sender: '',
    time: '',
  });

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const handleChangeRoom = (newRoom) => {
    setCurrentRoom(newRoom);
    setDrawerOpen(false);
  };

  useEffect(() => {
    console.log('currentRoom', currentRoom);

    socket.connect();
    //joined room
    socket.emit('joined', room, user.firstName, user.userId);

    //definition of the receiver of the message
    socket.on('chat_message', (room, newMessage) => {
      console.log('newMessage', newMessage);
      console.log('MESSAGGIO ARRIVATO');
      if (room === '/PlayersChat' && newMessage.userId !== user.userId) {
        setMessagesPlayers((currentMessages) => [
          ...currentMessages,
          newMessage,
        ]);
      } else if (room === '/TeamsChat' && newMessage.userId !== user.userId) {
        setMessagesTeams((currentMessages) => [...currentMessages, newMessage]);
      } else {
        if (newMessage.userId !== user.userId) {
          setMessagesGames((currentMessages) => [
            ...currentMessages,
            newMessage,
          ]);
        }
      }
    });

    //definition of notification of new user joined
    socket.on('joined', (room, firstName, userId) => {
      const joinMessage = {
        userId: 'userId',
        sender: 'System',
        text: `${firstName} joined ${room}`,
        time: new Date().toISOString(),
      };
      if (room === '/PlayersChat' && userId !== user.userId) {
        setMessagesPlayers((currentMessages) => [
          ...currentMessages,
          joinMessage,
        ]);
      } else if (room === '/TeamsChat' && userId !== user.userId) {
        setMessagesTeams((currentMessages) => [
          ...currentMessages,
          joinMessage,
        ]);
      } else {
        if (userId !== user.userId) {
          setMessagesGames((currentMessages) => [
            ...currentMessages,
            joinMessage,
          ]);
        }
      }
    });
    //socket disconnected when compponents are unmounted
    return () => socket.disconnect();
  }, [currentRoom, room, user.firstName, user.userId]);

  const handleSendMessage = () => {
    if (newMessage.text !== '') {
      const message = {
        userId: user.userId,
        text: newMessage.text,
        sender: newMessage.sender,
        time: newMessage.time,
      };
      if (room === '/PlayersChat') {
        console.log('message', room, message);
        setMessagesPlayers([...messagesPlayers, message]);
      } else if (room === '/TeamsChat') {
        console.log('message', message);
        setMessagesTeams([...messagesTeams, message]);
      } else {
        console.log('message', room, message);
        setMessagesGames([...messagesGames, message]);
      }
      socket.emit('send_message', room, message);
      setNewMessage({ userId: '', text: '', sender: '', time: '' });
    }
  };

  return (
    <>
      <div id="chat-box">
        <div
          className="container-background-color"
          style={{ minHeight: '120vh' }}
        >
          <TopAppBar links={links} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              margin: '15px',
              minHeight: '10vh',
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, marginBottom: 3 }}
              onClick={handleDrawerOpen} // Aggiungi l'evento onClick per aprire il DrawerVault
            >
              <MenuIcon />
            </IconButton>
            <h1>{currentRoom.replace('/', '')}</h1>
          </div>
          <Box
            sx={{
              width: '90%',
              overflow: 'auto',
              minHeight: 350,
              marginTop: 2,
              marginLeft: 10,
              borderRadius: '10px',
              backgroundColor: '#08325792',
              maxHeight: '70vh',
            }}
          >
            <List>
              {currentRoom === 'PlayersChat'
                ? messagesGames.map((msg, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems:
                          msg.userId === user.userId
                            ? 'flex-end'
                            : 'flex-start',
                        color: 'black',
                      }}
                    >
                      <p>{msg.sender}</p>
                      <ListItemText
                        primary={msg.text}
                        secondary={msg.time}
                        sx={{
                          backgroundColor:
                            msg.sender === 'user' ? '#cfe8fc' : '#f0f0f0',
                          borderRadius: '10px',
                          padding: '10px',
                          width: '40%',
                        }}
                      />
                    </ListItem>
                  ))
                : currentRoom === 'TeamsChat'
                ? messagesTeams.map((msg, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems:
                          msg.userId === user.userId
                            ? 'flex-end'
                            : 'flex-start',
                        color: 'black',
                      }}
                    >
                      <p>{msg.sender}</p>
                      <ListItemText
                        primary={msg.text}
                        secondary={msg.time}
                        sx={{
                          backgroundColor:
                            msg.sender === 'user' ? '#cfe8fc' : '#f0f0f0',
                          borderRadius: '10px',
                          padding: '10px',
                          maxWidth: '50%',
                        }}
                      />
                    </ListItem>
                  ))
                : messagesGames.map((msg, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        color: 'black',
                        alignItems:
                          msg.userId === user.userId
                            ? 'flex-end'
                            : 'flex-start',
                      }}
                    >
                      <p>{msg.sender}</p>
                      <ListItemText
                        primary={msg.text}
                        secondary={msg.time}
                        sx={{
                          backgroundColor:
                            msg.sender === 'user' ? '#cfe8fc' : '#f0f0f0',
                          borderRadius: '10px',
                          padding: '10px',
                          maxWidth: '50%',
                        }}
                      />
                    </ListItem>
                  ))}
            </List>
          </Box>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
              marginBottom: 30,
              color: 'white',
            }}
          >
            <TextField
              sx={{
                width: '60%',
                marginBottom: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white', // Colore del bordo del TextField
                  },
                  '&:hover fieldset': {
                    borderColor: 'white', // Colore del bordo del TextField durante l'hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white', // Colore del bordo del TextField quando è focalizzato
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white', // Colore del testo all'interno del TextField
                },
              }}
              label="Scrivi un messaggio"
              color="primary"
              variant="outlined"
              value={newMessage.text}
              onChange={(e) =>
                setNewMessage({
                  ...newMessage,
                  text: e.target.value,
                  sender: user.firstName + ' ' + user.lastName,
                  time: new Date().toISOString(),
                })
              }
            />
            <Button
              variant="contained"
              sx={{ marginLeft: 1 }}
              onClick={handleSendMessage}
            >
              Send message
            </Button>
          </Box>
        </div>
        <Drawer
          open={drawerOpen}
          onClose={handleDrawerClose}
          onChangeRoom={handleChangeRoom}
          chattingRooms={['PlayersChat', 'TeamsChat', 'GamesChat']}
        />
        <Footer />
      </div>
    </>
  );
}
