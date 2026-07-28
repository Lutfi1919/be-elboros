const Validator = require('fastest-validator');
const v = new Validator();
const { User, Transaction} = require('../models');
const { response } = require('../helpers/response.formatter');

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

            const user = await User.findByPk(data.user_id);
            if (!user) {
                return res.status(404).json(response(404, "user not found", null));
            }

            const transaction = await Transaction.create(data);
            return res.status(201).json(response(201, "transaction created", transaction));
        } catch (error) {
            return res.status(500).json(response(500, "server error!", error.message));
        }
    },
    updateTransaction: async () => {
        try {
            const { id } = req.params;
            const { judul, nominal, catatan } = req.body;

            const schema = {
                judul: { type: "string", min: 2 },
                nominal: { type: "number", positive: true, integer: true },
                catatan: { type: "string" }
            }

            const data = {
                judul: judul,
                nominal: Number(nominal),
                catatan: catatan
            }

            const validate = v.validate(data, schema);
            if (validate.length > 0) {
                return res.status(400).json(response(400, "validasi error!", validate));
            }

            const transaction = await Transaction.findByPk(id);
            if (!transaction) {
                return res.status(400).json(response(400, "transaction not found!"))
            }

            transaction.judul = data.judul;
            transaction.nominal = data.nominal;
            transaction.catatan = data.catatan;
            await transaction.save();

            return res.status(200).json(response(200, "transaction updated successfully!", transaction));
        } catch (error) {
            return res.statu(500).json(response(500, "server error!", error.message))
        }
    },
    deleteTransaction: async (req, res) => {
        try {
            const { id } = req.params;

            const transaction = await Transaction.findByPk(id);
            if (!transaction) {
                return res.status(400).json(response(400, "transaction not found!"))
            }
            
            await transaction.destroy();
            return res.status(200).json(response(200, "transaction deleted!"));

        } catch (error) {
            return res.status(500).json(response(500, "server error!", error.message))
        }
    },
}