import message from "../model/Messages.js";
import conversation from '../model/Conversation.js';


export const newMessage = async (request, response) => {
    const newMessage = new message(request.body);
    try {
        await newMessage.save();
        await conversation.findByIdAndUpdate(request.body.conversationId, { message: request.body.text });
        response.status(200).json("Message has been sent successfully");
    } catch (error) {
        response.status(500).json(error.message);
    }

}

export const getMessages = async (request, response) => {
    try {
        const messages = await message.find({conversationId:request.params.id});
        return response.status(200).json(messages)
    } catch (error) {
        return response.status(500).json(error.message)

    }
}

