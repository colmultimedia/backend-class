const express = require('express')
const router = express.Router()

let productos = []

class Producto {
    constructor (title, price, thumbnail) {
        this.id = productos.length+1
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
    }
}

var removeItemFromArr = ( arr, item ) => {
    var i = arr.indexOf( item );
    i !== -1 && arr.splice( i, 1 );
};


productos.push(new Producto ("Banano", 200, "/test.jpg"))
productos.push(new Producto ("Zanahoria", 100, "/test2.jpg"))



router.get("/listar", (req, res) => {
    try{
        if(productos.length == 0){
            res.status(404).json({"error": "No hay productos guardados"})
        }else {
            res.status(200).json(productos)
        }
    }catch(err) {
        res.status(404).json({err})
    }

})


router.get("/listar/:id", (req, res) => {
    try{
        if (req.params.id <= (productos.length)) {
            res.status(200).json(productos[req.params.id-1])
        } else {
            res.status(404).json({"error": "Producto no encontrado"})
        }
    }catch(err) {
        res.status(404).json({err})
    }
})

router.post("/guardar", (req, res) => {
   
    let title = req.query.title
    let price = parseInt(req.query.price)
    let thumbnail = req.query.price
  
    try{
            productos.push(new Producto(title, price, thumbnail))
            res.status(200).json(productos[productos.length -1])
        
    }catch(err) {
        res.status(404).json(err)
    }
})


router.put("/update/:id", (req, res) => {
    let id = parseInt(req.params.id)
    productos[id-1] = {
        "id": parseInt(id),
        "title": req.query.title,
        "price": parseInt(req.query.price),
        "thumbnail": req.query.thumbnail
    }
    res.json(productos[id-1])
})

router.delete("/delete/:id", (req, res) => {

    let id = parseInt(req.params.id)

        res.json(productos[id-1])
        removeItemFromArr(productos, productos[id-1])

    console.log(productos)
   
})

module.exports = productosRoute;