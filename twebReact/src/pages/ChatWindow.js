import React, { useState } from "react";
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

export default function ChatWindow() {
    const links = [false, false, false, true, false, false, false, false, true, true];
    const pages = ['Home','Competitions', 'Games' ];
    const [open, setOpen] = useState(false);
    const [view, setView] = useState(0);
    const [userLogged, setUserLogged] = useState(true);
    const handleLoguser = () => setUserLogged(true);


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { chatType } = useParams();
    console.log(chatType);
    const { checkCredentials } = useAuth();  //user details from AuthContext

     const handleChangeTab = (e) => {
        const id = e.target.id;
        switch (id) {
            case 'tabOne':
                setView(0);
                //called funzioction
                break;
            case 'tabTwo':
                setView(1);
                break;
            default:
                break;
        }
    }

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = () => {
        if (newMessage.trim() !== "") {
            setMessages([...messages, newMessage]);
            setNewMessage("");
        }
    };

    return (
            <div id="chat-box">

            <div className="container-background-color" style={{minHeight: '120vh'}} >
            <TopAppBar links={links} pages={pages} />
            <Tabs value={view} onChange={handleChangeTab} aria-label="basic tabs example" centered>
                <Tab label="Public" id="tabOne" />
                <Tab label="Private" id="tabTwo" />
            </Tabs>
           <Box sx={{ width: '100%', bgcolor: 'background.paper', overflow: 'auto', minHeight: 350, marginTop: 2, backgroundColor: 'inherit' }}>
            <List>
                {messages.map((msg, index) => (
                    <ListItem key={index} sx={{ display: 'flex', justifyContent: userLogged === true ? 'flex-end' : 'flex-start' }}>
                        <p>user</p>
                        <ListItemText
                            primary={"msg.text"}
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
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button variant="contained" sx={{ marginLeft: 1 }} onClick={handleSendMessage}>Send message</Button>
            </Box>
                
            </div>
            <Footer />
            
        </div>
    );
}