import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const Connection = async () => {
    const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.1pamu.mongodb.net/whatsapp?retryWrites=true&w=majority`;
    
    try {
        console.log('Attempting to connect to MongoDB...');
        console.log('Connection URL (without password):', URL.replace(PASSWORD, '****'));
        console.log('Username:', USERNAME);
        
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };

        await mongoose.connect(URL, options);
        console.log('Database connected successfully');
        
        // Test the connection
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Available collections:', collections.map(c => c.name));
        
    } catch (error) {
        console.error('Database connection error:', error.message);
        console.error('Error details:', error);
        console.error('Please check:');
        console.error('1. Your MongoDB Atlas credentials');
        console.error('2. Your IP address is whitelisted in MongoDB Atlas');
        console.error('3. Your network connection');
        console.error('4. The cluster name and database name are correct');
        console.error('5. The MongoDB Atlas cluster is active');
        process.exit(1);
    }
}

export default Connection;