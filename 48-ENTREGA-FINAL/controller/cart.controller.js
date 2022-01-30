import {read, addCart, add} from '../service/cart.service.js'

class CartController {
 // for methods read, add, make and delete
    read (req, res) {
        res.status(200).json(read)
    }

    add(req, res) {
        const {id} = req.body
        
        res.status(200).json(add)
    }
    async addCart (req, res) {
        res.status(200).json(await addCart(req.body))
    }

    async add(req, res) {
        res.status(200).json(await add(req.params.id))
    }

}


export default CartController