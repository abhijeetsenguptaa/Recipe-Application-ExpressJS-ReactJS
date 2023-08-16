const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model');
const { body, validationResult } = require('express-validator');

async function registeringUser(req, res) {
    try {
        const { firstName, lastName, email, password, age, gender, role } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !password || !age || !gender) {
            res.status(400).json({
                status: 'false',
                error: 'Please provide all required fields.',
            });
        }

        // Check if the user already exists with the same email
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({
                status: 'false',
                error: 'User with this email already exists.',
            });
        }
        await body('email').isEmail().normalizeEmail().run(req);
        await body('password').isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/).run(req);
        const errors = validationResult(req);

        // Checking  for validation errors
        if (!errors.isEmpty()) {
            return res.status(400).send({
                status: false,
                msg: 'Invalid email or password format'
            });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create the new user
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            age,
            gender,
            role
        });

        // Return the created user information
        res.status(201).json({
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            age: newUser.age,
            gender: newUser.gender,
            role: newUser.role
        });
    } catch (error) {
        console.log(error);
        // Send an error response if something goes wrong
        res.status(500).json({
            status: false,
            msg: 'Internal Server Error'
        });
    }
}
async function loggingUser(req, res) {
    try {
        const { email, password } = req.body;

        const checkUser = await User.findOne({ where: { email } });
        if (!checkUser) {
            return res.status(404).json({
                status: false,
                msg: 'User not found'
            })
        }
        // Compare the provided password with the hashed password in the database
        const isPasswordMatch = await bcrypt.compare(password, checkUser.password);
        if (!isPasswordMatch) {
            res.status(401).json({
                status: 'false',
                error: 'Invalid credentials.',
            });
        }

        // Generate a JWT token for authentication
        const token = jwt.sign({ userId: checkUser.id }, process.env.SECRET_KEY, {
            expiresIn: '1h', // Token expires in 1 hour
        });

        // Return the user information along with the JWT token
        res.status(200).json({
            id: checkUser.id,
            firstName: checkUser.firstName,
            lastName: checkUser.lastName,
            email: checkUser.email,
            age: checkUser.age,
            gender: checkUser.gender,
            role: checkUser.role,
            token,
        });
    } catch (error) {
        console.log(error);
        // Send an error response if something goes wrong
        res.status(500).json({
            status: false,
            msg: 'Internal Server Error'
        });
    }
}
async function resetPassword(req, res) {
    try {
        const { email, password } = req.body;

        const isUser = await User.findOne({ where: { email } });
        if (!isUser) {
            return res.status(404).json({
                'status': false,
                msg: 'User-Email is not valid'
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);
        isUser.password = hashPassword;
        await isUser.save()
        res.status(200).json({
            status: true,
            msg: 'Password- Reset Successful'
        })

    } catch (error) {
        console.log(error);
        // Send an error response if something goes wrong
        res.status(500).json({
            status: false,
            msg: 'Internal Server Error'
        });
    }
}
async function editingUser(req, res) {
    try {
        const id = req.params.id;

        // Find the user by ID
        const user = await User.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({
                status: false,
                msg: 'User not found',
            });
        }

        // Extract the fields you want to update from req.body
        const { firstName, lastName, age, gender, role } = req.body;

        // Update user properties if the fields are provided
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (age) user.age = age;
        if (gender) user.gender = gender;
        if (role) user.role = role;

        // Save the changes
        await user.save();

        // Return the updated user information
        res.status(200).json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            age: user.age,
            gender: user.gender,
            role: user.role
        });
    } catch (error) {
        console.log(error);
        // Send an error response if something goes wrong
        res.status(500).json({
            status: false,
            msg: 'Internal Server Error'
        });
    }
}
async function deletingUser(req, res) {
    try {
        const id = req.params.id;

        // Find the user by ID
        const user = await User.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({
                status: false,
                msg: 'User not found',
            });
        }

        // Delete the user
        await user.destroy();

        res.status(200).json({
            status: true,
            msg: 'User deleted successfully',
        });
    } catch (error) {
        console.log(error);
        // Send an error response if something goes wrong
        res.status(500).json({
            status: false,
            msg: 'Internal Server Error'
        });
    }
}
async function fetchingUser(req, res) {
    try {
        const { id } = req.query;

        if (id) {
            // Fetch a single user by ID
            const user = await User.findOne({ where: { id } });
            if (!user) {
                return res.status(404).json({
                    status: false,
                    msg: 'User not found',
                });
            }
            // Return the found user
            res.status(200).json({
                status: true,
                data: user
            });
        } else {
            // Fetch all users or apply filters if needed
            const users = await User.findAll({ attributes: { exclude: ['password'] } });

            // Return the list of users
            res.status(200).json({
                status: true,
                data: users,
            });
        }
    } catch (error) {
        console.log(error);
        // Send an error response if something goes wrong
        res.status(500).json({
            status: false,
            msg: 'Internal Server Error'
        });
    }
}




module.exports = { registeringUser, loggingUser, resetPassword, editingUser, deletingUser, fetchingUser };