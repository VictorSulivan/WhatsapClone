import { useEffect, useState, useContext } from "react";

import { getUsers } from "../../../service/api";
import { Box,  Divider,  styled } from "@mui/material";
import Conversation from "./Conversation";
import { AccountContext } from "../../../constants/AccountProvider";

const Component=styled(Box)`
    height:81vh;
    overflow: overlay;
`;

const StyleDivider=styled(Divider)`
    margin: 0 0 0 70px; 
    background-color:  #e9edef;   
    opacity: 0.6;
`;

const Conversations=()=>{

    const [users, setUsers] = useState([]);
    const {account}=useContext(AccountContext);
    useEffect(() => {
        const fetchData = async () => {
            let response = await getUsers(); 
            setUsers(response);
        }
        fetchData();
    }, []);

    return(
       <Component>
        {
            users.map((user) => {
                if(user.sub !== account.sub){
                    return(
                        <>
                            <Conversation user={user}/>
                            <StyleDivider/>
                        </>
                    )
                }
                
            })
        }
       </Component>
    )
}

export default Conversations;