const userModel = require('../model/user.model');

const createUserTable = async (req, res) => {
    try {
        await userModel.createUserTable();
        res.json({ message: 'Users table created or already Exist' });
    } catch (error) {
        console.error('Error creating users table : ', error);
        res.status(500).json({ error: 'internal server error' })
    }
};

const registerUser = async (req, res) => {
    try {
        const userId = await userModel.createUser(req.body);
        res.json({ userId })
    } catch (error) {
        console.error('Error creating users : ', error);
        res.status(500).json({ error: 'internal server error' })
    }
};

const getUserByUsername = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await userModel.getUserByUsername(username);
        if (!user) {
            res.status(404).json({ error: 'User not found' })
        }
        else {
            res.json(user);
        }
    } catch (error) {
        console.error('Error getting users : ', error);
        res.status(500).json({ error: 'internal server error' })
    }
};

const loginUser = async (req,res) => {
    const { username, password } = req.body;
    try {
        const token = await userModel.authenticateUser(username, password)
        if (!token) {
            res.status(401).json({ error: "Invalid user or password" })
        } else {
            res.json({ token })
        }
    } catch (error) {
        console.error('Error authenticating users : ', error);
        res.status(500).json({ error: 'internal server error' })
    }
};

module.exports = {
    createUserTable,
    registerUser,
    getUserByUsername,
    loginUser
};