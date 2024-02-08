import React, { useState, useEffect, useMemo, useRef } from 'react';
import Box from '@mui/material/Box';
import TopAppBar from '../components/TopAppBar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../style/global.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { connectToRoom, disconnectSocket, sockets } from '../services/socket';
import Drawer from '../components/DrawerVault';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import ArrowBack from '../components/atoms/ArrowBack';

/**
 * ChatWindow Component:
 *
 * Provides a real-time chat interface where users can send and receive messages.
 * It supports multiple chat rooms and displays messages based on the selected room.
 * Users can switch between different chat rooms using a drawer menu.
 *
 * Behavior:
 * - On load, connects to the socket server and joins the chat room based on the URL parameter.
 * - Fetches and displays the chat history for the selected room.
 * - Users can send new messages, and they will be broadcast to other users in real-time.
 * - Supports navigation between different chat rooms.
 *
 * @returns {JSX.Element} The JSX for the ChatWindow page.
 */

export default function ChatWindow() {
  const { user } = useAuth(); //user details from AuthContext
  const links = [true, true, true];
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const messagesEndRef = useRef(null);
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
  const navigate = useNavigate();
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
      event.preventDefault();
      window.scrollTo({ bottom: 0, behavior: 'smooth' });
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    let selectedSocket;

    switch (currentRoom) {
      case '/PlayersChat':
        selectedSocket = sockets.playerSock;
        setView(0);
        break;
      case '/TeamsChat':
        selectedSocket = sockets.teamSock;
        setView(1);
        break;
      default:
        selectedSocket = sockets.gameSock;
        setView(2);
        break;
    }

    connectToRoom(currentRoom, selectedSocket);
    selectedSocket.emit('joined', currentRoom, user.firstName, user.userId);

    const chatMessageHandler = (room, newMessage) => {
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
    };

    const chatMessageHandlerJoined = (room, firstName, userId) => {
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
    };

    // Aggiungi i listener per i messaggi e le notifiche di join
    selectedSocket.on('chat_message', chatMessageHandler);
    selectedSocket.on('joined', chatMessageHandlerJoined);
    //socket disconnected when compponents are unmounted
    return () => {
      selectedSocket.off('chat_message');
      selectedSocket.off('joined');
      disconnectSocket(selectedSocket);
    };
  }, [currentRoom, navigate, user]);

  //scroll to the bottom of the chat when the messages are updated
  useEffect(() => {
    scrollToBottom();
  }, [messagesPlayers, messagesTeams, messagesGames]);

  /**
   * Scrolls to the bottom of the chat to show the most recent messages.
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
        setMessagesPlayers([...messagesPlayers, message]);
        sockets.playerSock.emit('send_message', currentRoom, message);
      } else if (currentRoom === '/TeamsChat') {
        setMessagesTeams([...messagesTeams, message]);
        sockets.teamSock.emit('send_message', currentRoom, message);
      } else {
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
    <div id="chat-box">
      <div className="container-background-color" style={{ height: '100vh' }}>
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
            overflowY: 'scroll',
            minHeight: 350,
            marginTop: 2,
            marginLeft: 10,
            borderRadius: '10px',
            backgroundColor: '#08325792',
            maxHeight: '50vh',
          }}
        >
          {currentView[view]}
          <div ref={messagesEndRef} />
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
      {/* <Footer /> */}
    </div>
  );
}
