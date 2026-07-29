const jwt = require('jsonwebtoken')
const { response } = require('../helpers/response.formatter')
const { auth_secret } = require('../config/base.config')

module.exports = {
    checkToken: async (req, res, next) => {
        const authHeader = req.header("Authorization");
        if (!authHeader) {
            return res.status(401).json(response(401, "unauthorized", "please login and try again!"));
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json(response(401, "unauthorized", "invalid token format!"));
        }

        try {
            const check = jwt.verify(token, auth_secret);
            req.user = check;
            next();
        } catch (error) {
            return res.status(401).json(response(401, "unauthorized", "please login and try again!"))
        }
    }
}