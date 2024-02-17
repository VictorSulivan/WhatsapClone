import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;
const Connection = async () => {
    const URL=`mongodb://${USERNAME}:${PASSWORD}@ac-lc1tmha-shard-00-00.m5ssllm.mongodb.net:27017,ac-lc1tmha-shard-00-01.m5ssllm.mongodb.net:27017,ac-lc1tmha-shard-00-02.m5ssllm.mongodb.net:27017/?ssl=true&replicaSet=atlas-3lgp0k-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL, { useUnifiedTopology: true });
        console.log('Database connect successfully');
    } catch (error) {
        console.log('Database connect not successfully ', error.message);
    }
}

export default Connection;