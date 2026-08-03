const Validator = require("fastest-validator");
const v = new Validator();
const { User } = require("../models")
const { response } = require('../helpers/response.formatter');
const { Op } = require('sequelize');

module.exports = {
    updateSaldo: async (req, res) => {
        try {
            const user_id = req.user?.userId;
            const { saldo } = req.body;

            if (!user_id) {
                return res.status(401).json(response(401, "unauthorized", "please login and try again!"));
            }

            const schema = {
                saldo: { type: "number", positive: true, integer:true }
            } 
            
            const data = {
                user_id: Number(user_id),
                saldo: Number(saldo),
            }
            
            const validate = v.validate(data, schema);
            if (validate.length > 0) {
                return res.status(400).json(response(400, "validasi error!", validate))
            }

            const user = await User.findByPk(data.user_id, {
                attributes: {
                    exclude: ['password']
                }
            });
            if (!user) {
                return res.status(400).json(response(400, "user not found!"))
            }

            user.saldo = data.saldo;
            await user.save();

            return res.status(200).json(response(200, "saldo updated successfully!", user))
        } catch (error) {
           return res.status(500).json(response(500, 'server error!', error.message)); 
        }
    },
    showUser: async (req, res) => {
        try {
            const user_id = req.user?.userId;

            if (!user_id) {
                return res.status(400).json(response(400, "user not found!"))
            }

            return res.status(200).json(response(200, "user found!", user_id))
        } catch (error) {
            return res.status(500).json(response(500, 'server error!', error.message));
        }
    }
}