const router = require('express').Router();
const passport = require('passport');
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const CLIENT_URL = "http://localhost:5173";

router.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "successful",
            user: req.user,
        })
    }
})
router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure"
    })
})
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(CLIENT_URL);
})
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get("/google/callback", passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed"
}))

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));
router.get("/github/callback", passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed"
}))

// Signup route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).json({ message: 'Username or email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user document
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login route
router.post('/loginViaMail', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(400).json({ msg: "User does not exist. " });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials. " });
        }

        // If login is successful, return the user data
        res.status(200).json({ success: true, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router