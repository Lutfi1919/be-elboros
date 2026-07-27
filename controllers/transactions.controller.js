const Validator = require('fastest-validator');
const v = new Validator();
const { User } = require('../models');
const { response } = require('../helpers/response.formatter');
const { Op } = require('sequelize');

module.exports = {
    createTransaction: async (req, res) => {
        try {
            const { user_id, judul, nominal, catatan } = req.body;

            const schema = {
                user_id: { type: "number", positive: true, integer: true },
                judul: { type: "string", min: 2 },
                nominal: { type: "number", positive: true, integer: true },
                tanggal
            }
        } catch (error) {
            return res.status(500).json(response(500, "server error!", error.message));
        }
    }
}