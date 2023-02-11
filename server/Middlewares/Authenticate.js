var jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;

const authenticate = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token == null) return res.status(404).send("Not Authorized (No TOKEN)");
    jwt.verify(token, JWT_KEY, (err, data) => {
        if (err) return res.status(403).send("Not Authorized");
        req.data = data
        next()
    })
    next();
}

module.exports = authenticate