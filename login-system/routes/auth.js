const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

/* =========================
      SIGNUP API
========================= */

router.post("/signup", async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        // Save User
        await user.save();

        res.status(201).json({
            success: true,
            message: "Signup Successful"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
});


/* =========================
        LOGIN API
========================= */

router.post("/login", async (req, res) => {
    try {

        const { email, password } = req.body;

        // Check User
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }

        // Compare Password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            });
        }

        res.status(200).json({
            success: true,
            message: "Login Successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
});

module.exports = router;