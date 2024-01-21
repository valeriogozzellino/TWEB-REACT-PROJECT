import React from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { useAuth } from '../components/atoms/AuthContext';
import { useParams } from 'react-router-dom';
import TopAppBar from "../components/atoms/TopAppBar";
import Footer from "../components/atoms/Footer";
import '../style/global.css'


export default function ChatWindow() {
    const links = [false, false, false, true, false, false, false, false, true, true];
    const pages = ['Home','Competitions', 'Games' ];
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { chatType } = useParams();
    console.log(chatType);
    const { checkCredentials } = useAuth();  //user details from AuthContext
    return (
        <div  className="container-background-color" id="chat-box">
        <TopAppBar links={links} pages={pages} />
        <Backdrop open={open} />
        <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            sx={{ position: "absolute", bottom: 16, right: 16 }}
            icon={<ChatBubbleIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
        >
            <SpeedDialAction
            key={"Public"}
            icon={<ChatBubbleIcon />}
            tooltipTitle={"Public"}
            tooltipOpen
            onClick={handleClose}
            />
            <SpeedDialAction
            key={"Private"}
            icon={<ChatBubbleIcon />}
            tooltipTitle={"Private"}
            tooltipOpen
            onClick={handleClose}
            />
            </SpeedDial>
            <Footer/>
        </div>
    );
}