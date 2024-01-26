import React, { useState, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import TopAppBar from '../components/TopAppBar';
import Footer from '../components/Footer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../style/global.css';
import { useParams } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { connectToRoom, disconnectSocket, sockets } from '../services/socket';
import Drawer from '../components/DrawerVault';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import ArrowBack from '../components/atoms/ArrowBack';
//IMPORTANTE :
//ancora da fare :
//fare un check se id Utente uguale a quello che lo riceve per non inseririlo nella lista dei messaggi ricevuti

export default function ChatWindow() {
  const { user } = useAuth(); //user details from AuthContext
  const links = [false, true, true, true, true, false, false, false];
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const [view, setView] = useState(0); //view of the chat window
  const { chatRoom } = useParams();
  const [currentRoom, setCurrentRoom] = useState('/' + chatRoom);
  const [messagesPlayers, setMessagesPlayers] = useState([]);
  const [messagesTeams, setMessagesTeams] = useState([]);
  const [messagesGames, setMessagesGames] = useState([]);

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

  // add an event listener for the "Enter" key
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // Prevent the default form submission behavior
      event.preventDefault();

      // Se il tasto premuto è "Invio", esegui la funzione handleSendMessage
      handleSendMessage();
    }
  };
  //connect to the socket and join the room
  useEffect(() => {
    console.log('currentRoom', currentRoom);
    let selectedSocket;
    if (currentRoom === '/PlayersChat') {
      selectedSocket = sockets.playerSock;
      setView(0);
      console.log('messageplayer', messagesPlayers);
    } else if (currentRoom === '/TeamsChat') {
      selectedSocket = sockets.teamSock;
      setView(1);
      console.log('messageteam', messagesTeams);
    } else {
      selectedSocket = sockets.gameSock;
      setView(2);
      console.log('messagegame', messagesGames);
    }

    connectToRoom(currentRoom, selectedSocket);
    selectedSocket.emit('joined', currentRoom, user.firstName, user.userId);

    //definition of the receiver of the message
    selectedSocket.on('chat_message', (room, newMessage) => {
      console.log('newMessage', newMessage);
      console.log('MESSAGGIO ARRIVATO');
      console.log('room messaggio in arrivo', room);

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
    selectedSocket.on('joined', (room, firstName, userId) => {
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
    return () => {
      selectedSocket.off('chat_message');
      selectedSocket.off('joined');
      disconnectSocket(selectedSocket);
    };
  }, [currentRoom, user.firstName, user.userId]);

  //send message to the server and update the view
  const handleSendMessage = () => {
    if (newMessage.text !== '') {
      const message = {
        userId: user.userId,
        text: newMessage.text,
        sender: newMessage.sender,
        time: newMessage.time,
      };
      if (currentRoom === '/PlayersChat') {
        console.log('message player', currentRoom, message);
        setMessagesPlayers([...messagesPlayers, message]);
        sockets.playerSock.emit('send_message', currentRoom, message);
      } else if (currentRoom === '/TeamsChat') {
        console.log('message team', message);
        setMessagesTeams([...messagesTeams, message]);
        sockets.teamSock.emit('send_message', currentRoom, message);
      } else {
        console.log('message game', currentRoom, message);
        setMessagesGames([...messagesGames, message]);
        sockets.gameSock.emit('send_message', currentRoom, message);
      }
      setNewMessage({ userId: '', text: '', sender: '', time: '' });
    }
  };

  //set the view of the chat using an array of components
  const currentView = useMemo(() => {
    return [
      <List key="players">
        {messagesPlayers.map((msg, index) => (
          <ListItem
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems:
                msg.userId === user.userId ? 'flex-end' : 'flex-start',
              color: 'black',
            }}
          >
            <p style={{ color: 'white' }}>{msg.sender}</p>
            <ListItemText
              primary={msg.text}
              secondary={msg.time}
              sx={{
                backgroundColor: msg.sender === 'user' ? '#cfe8fc' : '#f0f0f0',
                borderRadius: '10px',
                padding: '10px',
                width: '40%',
              }}
            />
          </ListItem>
        ))}
      </List>,
      <List key="teams">
        {messagesTeams.map((msg, index) => (
          <ListItem
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems:
                msg.userId === user.userId ? 'flex-end' : 'flex-start',
              color: 'black',
            }}
          >
            <p style={{ color: 'white' }}>{msg.sender}</p>
            <ListItemText
              primary={msg.text}
              secondary={msg.time}
              sx={{
                backgroundColor: msg.sender === 'user' ? '#cfe8fc' : '#f0f0f0',
                borderRadius: '10px',
                padding: '10px',
                width: '40%',
              }}
            />
          </ListItem>
        ))}
      </List>,
      <List key="games">
        {messagesGames.map((msg, index) => (
          <ListItem
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems:
                msg.userId === user.userId ? 'flex-end' : 'flex-start',
              color: 'black',
            }}
          >
            <p style={{ color: 'white' }}>{msg.sender}</p>
            <ListItemText
              primary={msg.text}
              secondary={msg.time}
              sx={{
                backgroundColor: msg.sender === 'user' ? '#cfe8fc' : '#f0f0f0',
                borderRadius: '10px',
                padding: '10px',
                width: '40%',
              }}
            />
          </ListItem>
        ))}
      </List>,
    ];
  }, [messagesPlayers, messagesTeams, messagesGames, user]);

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
              maxHeight: '60vh',
            }}
          >
            {/* set the view of the chat */}
            {currentView[view]}
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
              onKeyDown={handleKeyDown}
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
        <ArrowBack />
        <Footer />
      </div>
    </>
  );
}
