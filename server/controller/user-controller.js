import User from "../model/User.js";

export const addUser = async (request, response) => {
    try {
        // Vérification des champs requis
        if (!request.body.sub || !request.body.name || !request.body.picture) {
            return response.status(400).json({
                error: 'Missing required fields',
                required: ['sub', 'name', 'picture']
            });
        }

        let exist = await User.findOne({ sub: request.body.sub });

        if (exist) {
            return response.status(200).json({ msg: 'user already exist' });
        }

        const newUser = new User(request.body);
        await newUser.save();
        return response.status(200).json(newUser);
    } catch (error) {
        console.error('Error in addUser:', error);
        return response.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
}

export const getUsers = async (request, response) => {
    try {
        const users = await User.find({});
        return response.status(200).json(users);
    } catch (error) {
        console.error('Error in getUsers:', error);
        return response.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
}