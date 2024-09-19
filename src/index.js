const express = require('express');
const mysql2 = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const crypto = require('crypto');

const secretKey = crypto.randomBytes(64).toString('hex');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60000 }
}));

const db = mysql2.createConnection({
    host: 'localhost:3308',
    user: 'root',
    password: 'admin',
    database: 'cost_of_living_calculator',
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = {app, db, bcrypt, jwt, secretKey};