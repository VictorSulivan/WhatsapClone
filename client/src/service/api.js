import axios from "axios"; 

const url = process.env.REACT_APP_URL || 'http://localhost:8000';

export const addUser = async(data)=>{
    try {
        console.log('Sending user data:', data);
        const response = await axios.post(`${url}/add`, data);
        console.log('Server response:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error while addUser API:", error.response?.data || error.message);
        throw error;
    }
}

export const getUsers = async () => {
    try {    
        const response = await axios.get(`${url}/users`);
        return response.data || [];
    } catch (error) {
        console.log("Error while calling getUsers API: ", error.message);
        return [];
    }
}

export const setConversation = async (data) => {
    try {
        await axios.post(`${url}/conversation/add`, data);
    } catch (error) {
        console.log('Error while calling setConversation API ', error);
    }
}

export const getConversation = async (data) => {
    try {
        let response = await axios.post(`${url}/conversation/get`, data);
        return response.data;
    } catch (error) {
        console.log('Error while calling getConversation API ', error);
    }
}

export const newMessages = async (data) => {
    try {
        return await axios.post(`${url}/message/add`, data);
    } catch (error) {
        console.log('Error while calling newMessages API ', error);
    }
}

export const getMessages = async (id) => {
    try {
        let response= await axios.get(`${url}/message/get/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getMessages API ', error);
    }
}
export const uploadFile = async (data) => {
    try {
        return await axios.post(`${url}/file/upload`, data);
    } catch (error) {
        console.log('Error while calling newConversations API ', error);
    }
}