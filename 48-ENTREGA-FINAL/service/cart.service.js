import { DB } from '../config/db.js'
import Cart from '../model/cart.model.js'

 // for methods read, add, make and delete

export async function read (id){
    try {
       return await Cart.find()

    }
    catch (err){
        console.error(err)
    }
}

export async function add (id, prod){
    try{
        const data = req.body
        const newOrder = new Cart(data)
        return await newOrder.save()

    }catch(err) {
        console.error(err)
    }
}


