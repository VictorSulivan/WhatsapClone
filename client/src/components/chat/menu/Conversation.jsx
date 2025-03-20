import {Box,Typography,styled} from "@mui/material"
import { useContext } from "react";
import { AccountContext } from "../../../context/AccountProvider";
import { setConversation } from "../../../service/api";
import { emptyProfilePicture } from "../../../constants/data";

const Component=styled(Box)`
    display:flex;
    height:45px;
    padding: 13px 0;
    cursor:pointer; 
`;

const Image=styled('img')({
    width:50,
    height:50,
    borderRadius:'50%',
    padding:'0 14px',
    objectFit:'cover'
});

const Conversation=({user})=>{
    const {setPerson, account}=useContext(AccountContext);

    const handleImageError = (e) => {
        console.error('Image failed to load:', user.picture);
        e.target.src = emptyProfilePicture;
    };

    const getUser= async ()=>{
        setPerson(user);
        await setConversation({senderId: account.sub, receiverId: user.sub})
    }

    return(
        <Component onClick={()=>getUser()}>
            <Box>
                <Image 
                    src={user.picture} 
                    alt="dp"
                    onError={handleImageError}
                />
            </Box>
            <Box>
                <Typography>{user.name}</Typography>
            </Box>
        </Component> 
    )
}

export default Conversation;