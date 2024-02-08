import { Dialog,Box,Typography, List, ListItem,styled } from "@mui/material";
import { useContext } from "react";
import { qrCodeImage } from "../../constants/data";
import { AccountContext } from "../../constants/AccountProvider";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
const Components=styled(Box)`
    display:flex;
`;
const Container=styled(Box)`
    padding:56px 0 56px 56px;
`;
const Title=styled(Typography)`
    font-size:26px;
    color:#525252;
    font-weight: 300;
    font-family:inherit;
    margin-bottom:25px;
    `;

const StyledList=styled(List)`
    &>li{
        padding:0;
        margin-top:15px;
        font-size:18px;
        line-height:28px;
        color:#4a4a4a;
    }
`;
const QRCode=styled('img')({
    height:264,
    whidth:264,
    margin:'50px 0 0 50px'
})

const dialogStyle={
    height:'96%',
    marginTop:'12%',
    width:'60%',
    maxWidth:'100%',
    maxHeight:'100%',
    boxShadow:'none',
    overflow:'hidden' 
}
const LoginDialog=()=>{

    const {setAccount}=useContext(AccountContext);
    const onLoginSuccess=(res)=>{
        const decode = jwtDecode(res.credential);
        setAccount(decode);
    }
    const onLoginError=(res)=>{
        console.log(`Login failed: `,res)
    }
    return(
        <Dialog open={true} PaperProps={{sx:dialogStyle}} hideBackdrop={true}>
            <Components>
                <Container>
                    <Title>To use Whatsapp on your computer:</Title>
                    <StyledList>
                        <ListItem>1. Open Whatsapp on your phone</ListItem>
                        <ListItem>2. Tap Menu Settings and select Whatsapp Webf</ListItem>
                        <ListItem>3. Point  your phone to this screen to capture the code</ListItem>
                    </StyledList>
                </Container>
                <Box style={{ position:'relative'}}>
                    <QRCode src={qrCodeImage} alt='qr code'/>
                    <Box style={{ position:'absolute',top:'50%', transform:'translateX(25%)'}}>
                        <GoogleLogin
                        onSuccess={onLoginSuccess}
                        onError={onLoginError}
                        />
                    </Box>
                </Box>
            </Components>
        </Dialog>
    )
}

export default LoginDialog;