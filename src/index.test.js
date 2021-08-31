import app from "./app.js"
import supertest from "supertest"
import mongoose from "mongoose"

import dotenv from "dotenv"
dotenv.config()

const request = supertest(app)


describe("Testing tests", () => {

    it("should test that true is true", () => {
        expect(true).toBe(true)
    })

})

describe("Testing endpoints", () => {

    beforeAll(done => {
        mongoose.connect(`${process.env.ATLAS_URL}/test`, () => {
            console.log("Connected to Atlas!")
            done()
        })
    })

    it("should test that the /test endpoint is returning 200 and a success message", async () => {
        const response = await request.get("/test")

        expect(response.status).toBe(200)
        expect(response.body.message).toBe("Test success!")
    })

    it("should test that the /products endpoint is returning a list of products", async () => {

        const response = await request.get("/products")

        expect(response.status).toBe(200)
        expect(response.body.length).toBeDefined()
    })

    const validProduct = {
        name: "iPhone",
        price: 900
    }

    it("should test that the /products endpoint is letting POST a new product", async () => {
        const response = await request.post("/products").send(validProduct)

        expect(response.status).toBe(201)
        expect(response.body.name).toBe(validProduct.name)
    })

    // GET SINGLE

    it("should test that the /products endpoint is returning one product with the correct id", async () => {
        const response = await request.post("/products").send(validProduct)

        expect(response.status).toBe(201)
        expect(response.body.name).toBe(validProduct.name)

        const _id = response.body._id

        const getResponse = await request.get(`/products/${_id}`)
        expect(getResponse.body.name).toBe(validProduct.name)

    })

    // UPDATE

    it("should test that the /products/:id endpoint is updating one product with the correct id", async () => {
        const response = await request.put("/products/:id").send(validProduct)

        expect(response.status).toBe(201)
        expect(response.body.name).toBe(validProduct.name)

        const _id = response.body._id

        const getResponse = await request.put(`/products/${_id}`).send(req.body)
        expect(getResponse.body.name).toBe(req.body)

    })

    //DELETE 

    it("should test that the /products/:id endpoint is deleting one product with correct id", async () => {
        const response = await request.delete("/products/:id").send(validProduct)
        expect(response.status).toBe(204)

    })

    afterAll(done => {
        mongoose.connection.dropDatabase().then(() => {
            mongoose.connection.close()
            done()
        })
    })

})