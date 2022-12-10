const express = require('express');
const cors = require('cors');

const productsCtrl = require('./controllers/productsCtrl')
const purchasesCtrl = require('./controllers/purchasesCtrl')

const port = 3005;

require ('./configs/database')

const app = express()
app.use(express.json())
app.use(cors())

app.use('/products', productsCtrl)
app.use('/purchases', purchasesCtrl)

app.listen(port, () => {
    console.log(`listening on ${port}`)
})