import { app } from "..";

app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.send('Logged out');
});