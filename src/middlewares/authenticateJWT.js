function authenticateJWT(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).send('Unauthorized');

    jwt.verify(token, 'your-secret', (err, user) => {
        if (err) return res.status(403).send('Invalid token');
        req.user = user;
        next();
    });
}

module.exports = authenticateJWT;