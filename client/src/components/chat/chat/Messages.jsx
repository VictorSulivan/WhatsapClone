import { Box, styled } from "@mui/material";
import Footer from "./Footer";
import { useContext, useState, useEffect } from "react";
import { AccountContext } from "../../../context/AccountProvider";
import { getMessages } from "../../../service/api";
import Message from "./Message";

const Wrapper = styled(Box)`
    background-image:url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'});
    background-size:50%;
    `;

const Component = styled(Box)`
    height:81vh;
    overflow-y: scroll;
`;

const Container = styled(Box)`
    padding: 1px 80px
`;

const Messages = ({ person, conversation, socket }) => {
    const [value, setValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [file, setFile] = useState();
    const { account } = useContext(AccountContext);

    useEffect(() => {
        socket?.on('receive_message', (data) => {
            if (data.conversationId === conversation._id) {
                setMessages(prev => [...prev, data]);
            }
        });

        return () => {
            socket?.off('receive_message');
        };
    }, [socket, conversation._id]);

    useEffect(() => {
        const getMessageDetails = async () => {
            let data = await getMessages(conversation._id);
            setMessages(data);
        }
        conversation._id && getMessageDetails();
    }, [person._id, conversation._id]);

    const sendText = async (e) => {
        const code = e.keyCode || e.which;

        if (code === 13) {
            let message = {
                senderId: account.sub,
                receiverId: person.sub,
                conversationId: conversation._id,
                type: 'text',
                text: value
            };
            
            try {
                socket?.emit('new_message', message);
                setValue('');
            } catch (error) {
                console.error("Erreur lors de l'envoi du message:", error);
            }
        }
    }

    return (
        <Wrapper>
            <Component>
                {
                    messages && messages.map(message => (
                        <Container key={message._id}>
                            <Message message={message} />
                        </Container>
                    ))
                }
            </Component>
            <Footer sendText={sendText} setValue={setValue} value={value} file={file} setFile={setFile} />
        </Wrapper>
    );
}

export default Messages;