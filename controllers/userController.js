const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const userController = {
    // Register user
    async register(req, res) {
        try {
            const { username, email, password, fullName, gender, dateOfBirth, country } = req.body;

            // Check if user already exists
            const existingUser = await User.findOne({ username });
            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({ 
                    message: 'User already exists with this email' 
                });
            }
            if (existingUser) {
                return res.status(400).json({ 
                    message: 'User already exists with this username' 
                });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            const user = new User({
                username,
                email,
                password: hashedPassword,
                fullName,
                gender,
                dateOfBirth,
                country
            });

            await user.save();

            res.status(201).json({ 
                message: 'User registered successfully',
                userId: user._id 
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    // Login user
    async login(req, res) {
        try {
            const { username, password } = req.body;

            // Find user
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Verify password
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate JWT token
            const token = jwt.sign(
                { userId: user._id, username: user.username },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({ token });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    // Search users
    async searchUsers(req, res) {
        try {
            const { query } = req.query;
            if (!query) {
                return res.status(400).json({ message: 'Search query is required' });
            }

            const users = await User.find({
                $or: [
                    { username: { $regex: query, $options: 'i' } },
                    { email: { $regex: query, $options: 'i' } }
                ]
            }).select('-password');

            res.json(users);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    // Get user profile
    async getProfile(req, res) {
        try {
            const user = await User.findById(req.user.userId).select('-password');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    // Update user
    async updateUser(req, res) {
        try {
            const updates = req.body;
            delete updates.password; // Prevent password update through this endpoint

            const user = await User.findByIdAndUpdate(
                req.user.userId,
                { $set: updates },
                { new: true }
            ).select('-password');

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    // Delete user
    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.user.userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
};

module.exports = userController;