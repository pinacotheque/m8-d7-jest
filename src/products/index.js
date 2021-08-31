import express from 'express'
import ProductModel from "./model.js"

const productsRouter = express.Router();

productsRouter.get('/', async (req, res) => {
    const products = await ProductModel.find({})
    res.status(200).send(products)
})

productsRouter.post('/', async (req, res) => {
    try {
        const product = new ProductModel(req.body)
        await product.save()

        res.status(201).send(product)
    } catch (error) {
        console.log(error)
        res.status(400).send()
    }


})

export default productsRouter