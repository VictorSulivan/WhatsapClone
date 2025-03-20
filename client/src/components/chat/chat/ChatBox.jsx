import { Box } from "@mui/material";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../../context/AccountProvider";
import { getConversation } from "../../../service/api";
import io from "socket.io-client";

const ChatBox = () => {
    const { person, account } = useContext(AccountContext);
    const [conversation, setConversation] = useState({});
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socket = io('http://localhost:8000');
        setSocket(socket);

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (conversation._id) {
            socket?.emit('join_room', conversation._id);
        }

        return () => {
            if (conversation._id) {
                socket?.emit('leave_room', conversation._id);
            }
        };
    }, [conversation._id, socket]);

    useEffect(() => {
        socket?.on('conversation_update', (updatedConversation) => {
            if (updatedConversation._id === conversation._id) {
                setConversation(updatedConversation);
            }
        });

        return () => {
            socket?.off('conversation_update');
        };
    }, [socket, conversation._id]);

    useEffect(() => {
        const getConversationDetails = async () => {
            let data = await getConversation({ senderId: account.sub, receiverId: person.sub });
            setConversation(data);
        }
        getConversationDetails();
    }, [person.sub, account.sub]);
     
    return (
        <Box style={{height: '75%'}}>
            <ChatHeader person={person} />
            <Messages person={person} conversation={conversation} socket={socket} />
        </Box>
    );
}

export default ChatBox;