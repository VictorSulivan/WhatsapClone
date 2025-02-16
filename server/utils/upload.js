import multer from 'multer';
import {GridFsStorage} from "multer-gridfs-storage"
import dotenv from 'dotenv'


dotenv.config();
const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;

const storage = new GridFsStorage({
    url: `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.gwz6y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, 
    options:{useUnifiedTopology:true, useNewUrlParser:true},
    file:(request,file)=>{
        const match = ["image/png", "image/jpg"];
        if(match.indexOf(file.mimeType) === -1){
            return `${Date.now()}-file-${file.originalname}`;
        }

        return {
            bucketName:"photos",
            file: `${Date.now()}-file-${file.originalname}`
        }
    }
})

export default multer({storage}); 