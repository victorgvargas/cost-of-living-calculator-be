const { app, bcrypt, db } = require("..");

app.post('/register', (req, res) => {
    const { username, password, email } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) throw err; 
        if (results.length > 0) {
            return res.status(400).send('User already exists');
        }

        const hashedPassword = bcrypt.hash(password, 10);

        db.query('INSERT INTO users (user_name, user_password, user_email, ) VALUES (?, ?, ?)', [username, hashedPassword, email], (err) => {
            if (err) throw err;
            res.status(201).send('User registered');
        });
    });
});