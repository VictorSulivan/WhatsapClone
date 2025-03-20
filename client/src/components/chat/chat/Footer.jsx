import { Box, InputBase, styled } from "@mui/material";
import { EmojiEmotionsOutlined, AttachFile, Mic } from "@mui/icons-material";
import { useState } from "react";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

const Container = styled(Box)`
    height: 55px; 
    background: #ededed;
    display: flex;
    width: 100%;
    align-items: center; 
    padding: 0 15px;
    & > * {
        margin: 5px;
        color: #919191;
    }
`;

const Search = styled(Box)`
    background-color: #FFFFFF;
    border-radius: 18px;
    width: calc(94% - 100px);
`;

const InputField = styled(InputBase)`
    width: 100%;
    padding: 20px;
    height: 20px;
    padding-left: 25px;
    font-size: 14px;
`;

const ClipIcon = styled(AttachFile)`
    transform: rotate(40deg)
`;

const EmojiPickerContainer = styled(Box)`
    position: absolute;
    bottom: 70px;
    left: 20px;
    z-index: 1000;
`;

const Footer = ({ sendText, setValue, value, file, setFile }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const onEmojiSelect = (emoji) => {
        setValue(prevValue => prevValue + emoji.native);
        setShowEmojiPicker(false);
    };

    const onFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setValue(selectedFile.name);
        }
    }

    return (
        <Container>
            <EmojiEmotionsOutlined 
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                style={{ cursor: 'pointer' }}
            />
            {showEmojiPicker && (
                <EmojiPickerContainer>
                    <Picker 
                        data={data} 
                        onEmojiSelect={onEmojiSelect}
                        theme="light"
                        previewPosition="none"
                        skinTonePosition="none"
                        searchPosition="none"
                        navPosition="none"
                    />
                </EmojiPickerContainer>
            )}
            <label htmlFor="fileInput">
                <ClipIcon />
            </label>
            <input 
                type="file" 
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => onFileChange(e)}
            />
            <Search>
                <InputField  
                    placeholder="type a message"
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => sendText(e)}
                    value={value}
                /> 
            </Search>
            <Mic />
        </Container>
    );
}

export default Footer;