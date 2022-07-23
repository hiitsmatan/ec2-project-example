const express = require('express');
const purchasesBl = require('../modules/purchasesBL')
const router = express.Router();

router.get('/', async (req, res) => { 
    let data = await purchasesBl.getAllPurchases()
    return res.json(data)
})

router.get('/:id', async (req, res) => {
    let data = await purchasesBl.getPurchaseById(req.params.id)
    return res.json(data)
})

router.post('/', async (req, res) => {
    let data = await purchasesBl.addPurchase(req.body)
    return res.json(data)
})

router.put('/:id', async (req, res) => {
    let data = await purchasesBl.updatePurchase(req.params.id, req.body)
    return res.json(data)
})

router.delete('/:id', async (req, res) => {
    let data = await purchasesBl.deletePurchase(req.params.id)
    return res.json(data)
})

module.exports = router