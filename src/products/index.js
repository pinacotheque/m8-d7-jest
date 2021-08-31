import express from 'express'
import ProductModel from "./model.js"

const productsRouter = express.Router();

productsRouter.get('/', async (req, res) => {
    const products = await ProductModel.find({})
    res.status(200).send(products)
})

productsRouter.get('/:id', async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id)
        res.status(200).send(product)
    } catch (error) {
        res.status(404).send()
    }
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

productsRouter.put('/:id', async (req, res) => {
    try {
        const updateProduct = await ProductModel.findByIdAndUpdate(req.params.id, req.body)
        if (updateProduct) {
            res.status(200).send(updateProduct)
        } else {
            res.status(404).send("Product not found")
        }
    } catch (error) {
        console.log(error)
        res.status(400).send()
    }

})

productsRouter.put('/:id', async (req, res) => {
    try {
        const deleteProduct = await ProductModel.findByIdAndDelete(req.params.id)
        if (deleteProduct) {
            res.status(200).send()
        } else {
            res.status(404).send("Product not found")
        }
    } catch (error) {
        console.log(error)
        res.status(400).send()
    }

})



export default productsRouter