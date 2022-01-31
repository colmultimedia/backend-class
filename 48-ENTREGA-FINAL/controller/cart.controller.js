import {read, addCart, add, deleteCartItem} from '../service/cart.service.js'

class CartController {
 // for methods read, add, make and delete
    read (req, res) {
        res.status(200).json(read)
    }

    async add(req, res) {
        
        res.status(200).json(await add(req.params.id, req.user.email))
    }
    async addCart (req, res) {
        res.status(200).json(await addCart(req.body))
    }

    async make(req, res) {
        res.status(200).json(await make(req.params.id))
    }

    async deleteCart(req, res) {
        res.status(200).json(await deleteCartItem(req.params.id, req.user.email))
    }

}


export default CartController