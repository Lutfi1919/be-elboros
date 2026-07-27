const Validator = require("fastest-validator");
const v = new Validator();
const { User } = require("../models")
const { response } = require('../helpers/response.formatter');
const { Op } = require('sequelize');
const passwordHash = require('password-hash');

module.exports = {
    signup: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            const schema = {
                name: { type: "string", min: 3 },
                email: { type: "string", min: 10 },
                password: { type: "string", min: 3 },
            }

            const data = {
                name: name,
                email: email,
                password: passwordHash.generate(password),
            }

            const validate = v.validate(data, schema);
            if (validate.length > 0) {
                return res.status(400).json(response(400, "validasi error", validate));
            }

            const user = await User.create({
                name: data.name,
                email: data.email,
                password: data.password,
                saldo: 0
            })

            return res.status(201).json(response(201, 'created', user));
        } catch (error) {
            return res.status(500).json(response(500, "server error!", error.message));
        }
    }
}