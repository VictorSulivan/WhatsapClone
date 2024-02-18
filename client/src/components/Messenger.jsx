import {AppBar, styled,Box} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import ChatDialog from './chat/ChatDialog';
import LoginDialog from "./account/LoginDialog";
import { useContext } from 'react';
import { AccountContext } from '../context/AccountProvider';
const Components=styled(Box)`
    height:100vh;
    background:#DCDCDC;
`;

const Header=styled(AppBar)`
    height:125px;
    background-color:#00A884;
    box-shadow:none;
`;

const LoginHeader=styled(AppBar)`
    height:13.75rem;
    background-color:#00bfa5;
    box-shadow:none;
`;
const Messenger =()=>{
    const {account}=useContext(AccountContext);
    return(
        <Components>
            {
                account ? <>
                <Header>
                    <Toolbar>
                    </Toolbar>
                </Header>
                <ChatDialog/>
            </>
                :
                <>
                    <LoginHeader>
                        <Toolbar>
                        </Toolbar>
                    </LoginHeader>
                    <LoginDialog/>
                </>
            }
        </Components>
        
    )
}

export default Messenger;