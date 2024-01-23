import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import TopAppBar from "../components/atoms/TopAppBar";
import Footer from "../components/atoms/Footer";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../style/global.css'
import { useParams } from 'react-router-dom';
import { useAuth } from '../components/atoms/AuthContext';
import io from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';



export default function ChatWindow() {
  const { checkCredentials, user } = useAuth();  //user details from AuthContext
  const links = [false, true, true, true, true, false, false, false];
    const [open, setOpen] = useState(false);
    const [view, setView] = useState(0);
    const [userLogged, setUserLogged] = useState(checkCredentials); //only logged user can send messages
    const navigate = useNavigate();
    //const handleLoguser = () => setUserLogged(true);
  //stato per ogni room
    const { chatRoom } = useParams();
    const [messagesPlayers, setMessagesPlayers] = useState([]);
    const [messagesTeams, setMessagesTeams] = useState([]);
    const [messagesCompetitions, setMessagesCompetitions] = useState([]);
    const [room, setRoom] = useState(chatRoom);
    const [roomJoined, setRoomJoined] = useState();
    const [socket, setSocket] = useState(io(`http://localhost:3001/socket.io/${chatRoom}`));
    const [newMessage, setNewMessage] = useState({
        text: "",
        sender: "",
        time: "",
      });
      
    
      
  

  // const joinRoom = (room) => {
  //   setRoomJoined(true);
  //   setRoom(room);
    
  // };

  // const leaveRoom = (room) => {
  //   setRoomJoined(false);
  //   setRoom("");
  //   socket.emit("leave room", room, user.firstName, user.userId);
  // };

  const handleSendMessage = () => {
    if (newMessage.text !== "") {
      const message = { text: newMessage.text, sender: newMessage.sender, time: newMessage.time };
      if (room === "PlayersDiscussion") {
        setMessagesPlayers([...messagesPlayers, message]);
      } else if (room === "TeamsDiscussion") {
        setMessagesTeams([...messagesTeams, message]);
      } else {
        setMessagesCompetitions([...messagesCompetitions, message]);
      }
      socket.emit("send_message", message);
      setNewMessage({ text: "", sender: "", time: "" });
    }
  };

  useEffect(() => {
    socket.on("chat message", (room, newMessage, name) => {
      if (room === "PlayersDiscussion") {
        setMessagesPlayers([...messagesPlayers, { sender: name, text: newMessage }]);
      } else if (room === "TeamsDiscussion") {
        setMessagesTeams([...messagesTeams, { sender: name, text: newMessage }]);
      } else {
        setMessagesCompetitions([...messagesCompetitions, { sender: name, text: newMessage }]);
      }
    });

    socket.on('connect', function () {
      console.log('Connessione al server riuscita');
      socket.emit('create or join', room, user.firstName, user.userId);
    });


    return () => {
      socket.disconnect();
    };
  }, []);






    return (
  <>
    {!userLogged ? (
      <div>
        <h1>Log in to join the chat</h1>
        <Button variant="contained" sx={{ marginLeft: 1 }} onClick={() => navigate('/logIn')}>Log in</Button>
        <Button variant="contained" sx={{ marginLeft: 1 }} onClick={() => navigate('/signup')}>Sign up</Button>    
      </div>
    ) : (
        <div id="chat-box">
          <div className="container-background-color" style={{minHeight: '120vh'}} >
            <TopAppBar links={links} />
            <h1>Chat {room} </h1>
            <Box sx={{ width: '100%', bgcolor: 'background.paper', overflow: 'auto', minHeight: 350, marginTop: 2, backgroundColor: 'inherit' }}>
              <List>
                {messagesCompetitions.map((msg, index) => (
                  <ListItem key={index} sx={{ display: 'flex', justifyContent: userLogged === true ? 'flex-end' : 'flex-start' }}>
                    <p>user</p>
                    <ListItemText
                      primary={msg.text}
                      secondary={msg.time}
                      sx={{ backgroundColor: msg.sender === 'user' ? '#cfe8fc' : '#f0f0f0', borderRadius: '10px', padding: '10px', maxWidth: '50%' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
            <Box component="form" sx={{ display: 'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginBottom:30 , color:'white'}}>
              <TextField
                sx={{ width: '60%', marginBottom:2}}
                label="Scrivi un messaggio"
                variant="outlined"
                value={newMessage.text}
                onChange={(e) => setNewMessage({ ...newMessage, text: e.target.value, sender: user.firstName+" "+user.lastName, time: new Date().toISOString() })}
              />
              <Button variant="contained" sx={{ marginLeft: 1 }} onClick={handleSendMessage}>Send message</Button>
            </Box>
          </div>
          <Footer />
        </div>
    )}
  </>
);

}