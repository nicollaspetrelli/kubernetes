const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const mongooseConnection = require('./src/mongodb');

// Parsing body params
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// CORS whitelisting
let whitelist = (typeof process.env.CORS_ORIGIN === 'undefined')
    ? true
    : process.env.CORS_ORIGIN.split(',');
app.use(cors({
    origin: (origin, callback) => {
        if (whitelist === true || whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}));

// Session options
const sessionOptions = {
    name: 'app.sid',
    secret: process.env.COOKIE_SECRET,
    store: MongoStore.create({client: mongooseConnection.connection.getClient()}),
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
    cookie: {
        secure: false,
        sameSite: 'strict',
        httpOnly: true,
        maxAge: 3600000
    }
};
if (process.env.HTTPS) {
    app.set('trust proxy', 1);
    sessionOptions.cookie.secure = true;
    sessionOptions.cookie.sameSite = 'none';
}
app.use(session(sessionOptions));

const Users = mongoose.model('User', new mongoose.Schema({email: 'string'}));
const buildError = (message) => ({
    status: false,
    error: message
});
const handleError = (err) => buildError(err.message);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/users', (req, res) => {
    Users.find().exec((err, docs) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.send(docs);
    });
});

app.get('/user/:id', (req, res) => {
    Users.findById(req.params.id).exec((err, user) => {
        let response;
        if (err) {
            res.status(500);
            response = handleError(err);
        } else if (!user) {
            res.status(404);
            response = buildError('User not found');
        } else {
            response = user;
        }
        res.send(JSON.stringify(response));
    });
});

app.listen(port, () => {
    console.log(`Express server running at ${port}`)
});
