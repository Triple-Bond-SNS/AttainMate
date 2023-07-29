const cookieSession = require('cookie-session');
const express = require('express');
const passport = require('passport');
const passportSetup = require('./passport.js');
const cors = require('cors');
const app = express();
const authRoute = require('./routes/auth.js');
const mongoose = require('mongoose');

require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

const bodyParser = require('body-parser');

// Middleware to parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cookieSession(
    {
        name: "session",
        keys: ["aspi"],
        maxAge: 90 * 24 * 60 * 60 * 100
    }
))
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE",
    credentials: true
}))

app.use("/auth", authRoute);

const port = "8080"

mongoose.connect(
    MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

// Check if the connection is successful
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to MongoDB Atlas:', err.message);
});

app.listen(port, () => { console.log(`Server running on ${port}`); })