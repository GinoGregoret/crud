const express = require('express')
const cors = require('cors')
const Products = require('./model/Products')
const sequelize = require('./db')
const PORT = 3001
const app = express()
app.use(cors())
app.use(express.json())

sequelize.sync().then(()=>{
    console.log('db sincronizada')
})
app.post('/products', async(req,res)=>{
    try{
        const products = await Products.create(req.body)
        res.status(201).json(products)
    }catch(err){
        res.status(500).json({error: 'error'})
    }
})
app.get('/products', async(req,res)=>{
    const products = await Products.findAll()
    res.json(products)
})
app.get('/products/:id',async(req,res)=>{
    const products = await Products.findByPk(req.params.id)
    if(products){
        res.json(products)
    }else{
        res.status(404).json({error: 'error'})
    }
})
app.put('/products/:id', async(req,res)=>{
    const products = await Products.findByPk(req.params.id)
    if(products){
        await products.update(req.body)
        res.json(products)
    }else{
        res.status(404).json({error: 'error'})
    }
})
app.delete('/products/:id', async(req,res)=>{
    const products = await Products.findByPk(req.params.id)
    if(products){
        await products.delete()
        res.json({message: 'borrado'})
    }else{
        res.status(404).json({error: 'error'})
    }
})
app.listen(PORT, ()=>{
    console.log(`servidor corriendo en el localhost:${PORT}`)
})