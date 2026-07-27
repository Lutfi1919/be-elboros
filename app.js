const express = require('express');
const app = express()
const port = 3000
const db = require('./models')
const cors = require('cors');

db.sequelize.authenticate()
.then(() => console.log("Database (model) terkoneksi"))
.catch((error) => console.error(error))

const { checkToken } = require('./middlewares/auth')
const userRoutes = require('./routes/user.routes')
const transactionRoutes = require('./routes/transaction.routes')

app.use(cors());
app.use(express.json());
app.use('/', userRoutes);
app.use('/transaction', checkToken, transactionRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})