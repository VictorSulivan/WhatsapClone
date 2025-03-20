import { Box, Typography, styled } from "@mui/material"
import { formatDate } from "../../../utils/common-utils";
import { useContext } from "react";
import { AccountContext } from "../../../context/AccountProvider";

const Own = styled(Box)`
    background:#dcf8c6;
    max-width:60%;
    margin-left:auto;
    padding:5px;
    width:fit-content;
    display:flex;
    border-radius:10px;
    word-break:break-word;
`;

const Wrapper = styled(Box)`
    background:#FFFFFF;
    max-width:60%;
    padding:5px;
    width:fit-content;
    display:flex;
    border-radius:10px;
    word-break:break-word;
`;

const Text = styled(Typography)`
    font-size:14px;
    padding:0 25px 0 5px
`;

const Time = styled(Typography)`
    font-size:10px;
    color:#919191;
    margin-top: 6px;
    word-break:keep-all;
    margin-top:auto;
`;

const FileContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
`;

const FileImage = styled('img')`
    max-width: 200px;
    max-height: 200px;
    border-radius: 5px;
`;

const FileLink = styled('a')`
    color: #128C7E;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

const Message = ({ message }) => {
    const { account } = useContext(AccountContext);
    
    const getFormattedTime = () => {
        if (!message.createdAt) return '';
        try {
            return formatDate(message.createdAt);
        } catch (error) {
            console.error('Erreur de formatage de la date:', error);
            return '';
        }
    };

    const renderContent = () => {
        if (message.type === 'file') {
            const fileUrl = `http://localhost:8000${message.file.path}`;
            if (message.file?.contentType?.startsWith('image/')) {
                return (
                    <FileContainer>
                        <FileImage src={fileUrl} alt={message.file.name} />
                        <FileLink href={fileUrl} target="_blank" rel="noopener noreferrer">
                            {message.file.name}
                        </FileLink>
                    </FileContainer>
                );
            } else {
                return (
                    <FileContainer>
                        <FileLink href={fileUrl} target="_blank" rel="noopener noreferrer">
                            📎 {message.file.name}
                        </FileLink>
                    </FileContainer>
                );
            }
        }
        return <Text>{message.text}</Text>;
    };

    return (
        <>
            {account.sub === message.senderId ? (
                <Own>
                    {renderContent()}
                    <Time>{getFormattedTime()}</Time>
                </Own>
            ) : (
                <Wrapper>
                    {renderContent()}
                    <Time>{getFormattedTime()}</Time>
                </Wrapper>
            )}
        </>
    );
}

export default Message;