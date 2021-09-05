import express from 'express'
import Carrito from '../classes/carrito.class.js'
import Producto from '../classes/producto.class.js'
import productos from './productos.route.js'

export const routerCarritos = express.Router()

export let carritos = {
    items: []
}

const removeItemFromArr = ( arr, item ) => {
    var i = arr.indexOf( item );
    i !== -1 && arr.splice( i, 1 );
};


routerCarritos.use(express.json());
routerCarritos.use(express.urlencoded({ extended: true }));

carritos.items.push(new Carrito(carritos.items.length+1, new Producto (productos.items.length+1, "Café", "molido origen quindio", 1420, "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/3_avatar-512.png", 4500, 35 )) )

routerCarritos.get("/listar", (req, res) => {
    try{
        if(carritos.items.length > 0){
            res.status(200).json(carritos)
        }else{
            res.status(404).json({"error": "No existen carritos disponibles"})
        }
    }catch(err) {
        res.status(404).json({err})
    }

})

const arregloProd = []
let iterador = 0

routerCarritos.get("/agregar/:id_producto", (req, res) => {
    try{
        let id_producto = parseInt(req.params.id_producto)
        let prodSelect = productos.items[id_producto-1]
        prodSelect.id = iterador+1
        iterador++
        
        carritos.items[0].productos.push(prodSelect)
        res.status(200).json(carritos.items[0])
    }catch(err){
        res.status(404).json(err)
    }
})


export default Carrito