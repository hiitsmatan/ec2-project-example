const express = require('express');
const productsBl = require('../modules/productsBL')
const router = express.Router();

router.get('/', async (req, res) => { 
    let data = await productsBl.getAllProducts()
    return res.json(data)
})

router.get('/:id', async (req, res) => {
    let data = await productsBl.getProductById(req.params.id)
    return res.json(data)
})

router.post('/', async (req, res) => {
    let data = await productsBl.addProduct(req.body)
    return res.json(data)
})

router.put('/:id', async (req, res) => {
    let data = await productsBl.updateProduct(req.params.id, req.body)
    return res.json(data)
})

router.delete('/:id', async (req, res) => {
    let data = await productsBl.deleteProduct(req.params.id)
    return res.json(data)
})

module.exports = router