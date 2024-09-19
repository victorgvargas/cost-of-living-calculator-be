import { app, db, jwt, secretKey } from "..";

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
            return res.status(400).send('Invalid username or password');
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid username or password');
        }

        const token = jwt.sign({ id: user.user_id, username: user.user_name}, secretKey, { expiresIn: '1h' }); 
        res.send('Logged in');
    });
});