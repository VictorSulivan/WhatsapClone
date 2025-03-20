import React, { useContext, useState } from "react";
import {Chat as MessageIcon } from '@mui/icons-material'
import { AccountContext } from "../../../context/AccountProvider";
import { Box,styled } from "@mui/material";
import HeaderMenu from "./HeaderMenu";
import InfoDrawer from "../../drawer/InfoDrawer";
import { emptyProfilePicture } from "../../../constants/data";

const Component=styled(Box)`
    height:44px;
    background:#ededed;
    padding:8px 16px;
    display:flex;
    align-items:center;
`;
const Wrapper=styled(Box)`
    margin-left:auto;
    &>*{
        margin-left:2px;
        Padding:8px;
        color:#000;
    };
    & :first-child{
        font-size:22px;
        margin-right:8px;
        margin-top:3px; 
    }
`;
const Image=styled('img')
    ({
        height:40, 
        width:40,
        borderRadius:'50%',
        objectFit: 'cover'
    })
;
const Header=()=>{

    const {account}=useContext(AccountContext);
    const [openDrawer, setOpenDrawer] = useState(false);

    const handleImageError = (e) => {
        console.error('Image failed to load:', account.picture);
        e.target.src = emptyProfilePicture;
    };
    
    const toggleDrawer=()=>{
        setOpenDrawer(true);
    }
    return(
        <>
            <Component>
                <Image 
                    src={account.picture} 
                    alt={'dp'} 
                    onClick={()=>toggleDrawer()}
                    onError={handleImageError}
                />
                <Wrapper>
                    <MessageIcon/>
                    <HeaderMenu setOpenDrawer={setOpenDrawer}/>
                </Wrapper>
            </Component>
            <InfoDrawer open={openDrawer} setOpen={setOpenDrawer}/>
        </>
    )
}

export default Header;