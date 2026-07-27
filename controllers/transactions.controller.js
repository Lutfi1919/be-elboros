const Validator = require('fastest-validator');
const v = new Validator();
const { User, Transaction} = require('../models');
const { response } = require('../helpers/response.formatter');
const { Op, Transaction } = require('sequelize');

module.exports = {
    createTransaction: async (req, res) => {
        try {
            const { user_id, judul, nominal, catatan } = req.body;

            const schema = {
                user_id: { type: "number", positive: true, integer: true },
                judul: { type: "string", min: 2 },
                nominal: { type: "number", positive: true, integer: true },
                catatan: { type: "string" }
            }

            const data = {
                user_id: Number(user_id),
                judul: judul,
                nominal: Number(nominal),
                catatan: catatan
            }

            const validate = v.validate(data, schema);
            if (validate.length > 0) {
                return res.status(400).json(response(400, "validasi error!", validate));
            }

            const transaction = await Transaction.create(data);
            return res.status(201).json(response(201, "transaction created", transaction));
        } catch (error) {
            return res.status(500).json(response(500, "server error!", error.message));
        }
    }
}