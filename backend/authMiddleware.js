const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.sendStatus(401);

    }
    const token = authHeader.split(' ')[1];

    jwt.verify(token, 'passwordKey', (err, data) => {
        if (err) {
            console.error('JWT verification error:', err);
            return res.sendStatus(403); // Forbidden
        }
        console.log('data', data);
        req.userID = data; // Optionally set user data in request
        next();
    });
}