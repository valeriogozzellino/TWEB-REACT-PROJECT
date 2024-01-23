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
    const socket = io("http://localhost:3001"); //connect to socket.io server
    const { checkCredentials, user } = useAuth();  //user details from AuthContext
    const links = [false, true, false, true, true, false, false, false, true, true];
    const pages = ['Home','Competitions', 'Games' ];
    const [open, setOpen] = useState(false);
    const [view, setView] = useState(0);
    const [userLogged, setUserLogged] = useState(checkCredentials); //only logged user can send messages
    const navigate = useNavigate();
    //const handleLoguser = () => setUserLogged(true);
    //stato per ogni room
    const [messagesPlayers, setMessagesPlayers] = useState([]);
    const [messagesTeams, setMessagesTeams] = useState([]);
    const [messagesCompetitions, setMessagesCompetitions] = useState([]);
    const [room, setRoom] = useState("");
    const [roomJoined, setRoomJoined] = useState(false);
    const [newMessage, setNewMessage] = useState({
        text: "",
        sender: "",
        time: "",
    });

    
    

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { chatType } = useParams();
    
    console.log(chatType);


    const handleChangeTab = (e) => {
        const id = e.target.id;
        switch (id) {
            case 'tabOne':
                setView(0);
                break;
            case 'tabTwo':
                setView(1);
                break;
            default:
                break;
        }
    }
  

    const handleSendMessage = () => {
        if (newMessage.trim() !== "") {
            const message = { text: newMessage.text, sender: userLogged, time: new Date().toISOString() };
            if (room === "PlayersDiscussion") {
                setMessagesPlayers([...messagesPlayers, message]);
            } else if(room === "TeamsDiscussion"){
                setMessagesTeams([...messagesTeams, message]);
            } else {
                setMessagesCompetitions([...messagesCompetitions, message]);
            }
            socket.emit("send_message", message);
            setNewMessage("");
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

        return () => {
            socket.off("chat message");
        };
    }, []);

    const joinRoom = (room) => {
        setRoomJoined(true);
        socket.emit("create or join conversation", room, user.firstName, user.userId); // Aggiungi il tuo nome utente
    };

    const leaveRoom = (room) => {
        socket.emit("leave room", room, user.firstName, user.userId); // Aggiungi il tuo nome utente
    };

    return (
  <>
    {!userLogged ? (
      <div>
        <h1>Log in to join the chat</h1>
        <Button variant="contained" sx={{ marginLeft: 1 }} onClick={() => navigate('/logIn')}>Log in</Button>
        <Button variant="contained" sx={{ marginLeft: 1 }} onClick={() => navigate('/signup')}>Sign up</Button>    
      </div>
    ) : (
      !roomJoined ? (
        <div>
          <Box>
            <h1>Join in the Player Chat</h1>
            <button onClick={() => joinRoom("PlayersDiscussion")}>Join Room</button>
          </Box> 
          <Box>
            <h1>Join in the Teams Chat</h1>
            <button onClick={() => joinRoom("TeamsDiscussion")}>Join Room</button>
          </Box> 
          <Box>
            <h1>Join in the Competitions Chat</h1>
            <button onClick={() => joinRoom("CompetitionsDiscusion")}>Join Room</button>
          </Box> 
        </div>
      ) : (
        <div id="chat-box">
          <div className="container-background-color" style={{minHeight: '120vh'}} >
            <TopAppBar links={links} pages={pages} />
            <h1>Chat {room}</h1>
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
                onChange={(e) => setNewMessage({ ...newMessage, text: e.target.value })}
              />
              <Button variant="contained" sx={{ marginLeft: 1 }} onClick={handleSendMessage}>Send message</Button>
            </Box>
          </div>
          <Footer />
        </div>
      )
    )}
  </>
);

}