const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();


async function authentication(req, res, next) {
    try {
        const token = req.headers.authorization;
        if (token) {
            jsonwebtoken.verify(token, process.env.SECRET_KEY, async (err, decode) => {
                if (decode) {
                    req.userId = decode.userId; // Set userId in request object
                    next();
                } else {
                    return res.status(401).json({
                        status: false,
                        msg: 'Invalid token',
                    });
                }
            });
        } else {
            return res.status(401).json({
                status: false,
                msg: 'Token not provided',
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            msg: 'Internal Server Error',
        });
    }
}

module.exports = { authentication };
