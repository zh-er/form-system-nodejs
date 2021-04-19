const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config/config");
const {User} = require("./models/User.model");

const getUser = async (req, res) => {
    try {
        const user = req.user;
        if (user) {
            return res.json({
                user: {
                    role: user.role,
                    username: user.username,
                    email: user.email
                }
            })
        }
        return res.status(403).json({
            message: 'User not found!'
        })
    } catch (err) {
        return res.status(403).json({
            message: 'Failed to get user information'
        })
    }
}

const loginUser = async (req, res) => {
    try {
        console.log(req.body);
        const {email, password} = req.body;

        const user = await User.findOne({
            where: {email}
        })

        if (user === null) {
            return res.status(403).json({
                message: 'User not found!'
            })
        }

        const validated = await user.validatePassword(password)

        if (!validated) {
            return res.status(403).json({
                message: 'Login failed!'
            })
        }

        const body = {
            username: user.username,
            email: user.email,
            role: user.role
        };

        console.log(body);

        const token = jwt.sign({user: body}, JWT_SECRET);

        return res.json({
            token,
            user: body
        })

    } catch (err) {
        console.error(err);
        return res.status(403)
            .json({
                message: err
            })
    }
}

const createUser = async (req, res) => {
    try {
        const {email, password, username} = req.body;
        const user = await User.create({
            email,
            password,
            username,
        })
        const body = {
            username: user.username,
            email: user.email,
            role: user.role
        };
        const token = jwt.sign({user: body}, JWT_SECRET);
        return res.json({
            token,
            user: body
        })
    } catch (err) {
        console.error(err);
        res.status(400).json({
            message: 'Failed to create user'
        })
    }
}

module.exports = {
    createUser,
    getUser,
    loginUser,
}
