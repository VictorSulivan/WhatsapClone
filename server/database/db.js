import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;

const Connection = async () => {
    const URL=`mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.gwz6y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    try {
        await mongoose.connect(URL, { useUnifiedTopology: true });
        console.log('Database connect successfully');
    } catch (error) {
        console.log('Database connect not successfully ', error.message);
    }
}

export default Connection;