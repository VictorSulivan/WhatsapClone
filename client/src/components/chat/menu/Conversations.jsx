import { useEffect, useState, useContext } from "react";

import { getUsers } from "../../../service/api";
import { Box,  Divider,  styled } from "@mui/material";
import Conversation from "./Conversation";
import { AccountContext } from "../../../context/AccountProvider";

const Component=styled(Box)`
    height:81vh;
    overflow: overlay;
`;

const StyleDivider=styled(Divider)`
    margin: 0 0 0 70px; 
    background-color:  #e9edef;   
    opacity: 0.6;
`;

const Conversations=({text})=>{

    const [users, setUsers] = useState([]);
    const {account}=useContext(AccountContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUsers();
                if (Array.isArray(response)) {
                    const filteredData = response.filter(user => 
                        user.name.toLowerCase().includes(text.toLowerCase())
                    );
                    setUsers(filteredData);
                } else {
                    setUsers([]);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
                setUsers([]);
            }
        };
        fetchData();
    }, [text]); 

    return(
       <Component>
        {
            // eslint-disable-next-line array-callback-return
            users.map((user) => {
                if(user.sub !== account.sub){
                    return(
                        <div key={user.sub}>
                            <Conversation user={user}/>
                            <StyleDivider/>
                        </div>
                    )
                }
                return null;
            })
        }
       </Component>
    )
}

export default Conversations;