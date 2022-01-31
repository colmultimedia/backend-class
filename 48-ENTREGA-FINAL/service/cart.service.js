import { DB } from '../config/db.js'
import { msgs } from '../config/constants.js'
import Cart from '../model/cart.model.js'
import Product from '../model/product.model.js'

 // for methods read, add, make and delete

export async function read (){
    try {
        const cart =  await Cart.find()
        console.log(cart)
        if(cart == {}){
            return {"msg": "No hay productos disponibles"}
        } else{
            return cart
        }

    }
    catch (err){
        console.error(err)
    }
}

export async function addCart (email){
    try{
        const cart = {
            "email": email,
            "order": 1,
            "items": [],
            "shippingAdress": "",
        }
        const addCart = new Cart(cart)
        return await addCart.save()
        

    }catch(err) {
        console.error(err)
    }
}

export async function add (idProd, email){
        try {
            const getCart = await Cart.findOne({email: email})
            const idCart = getCart._id
            let product = await Product.findById(idProd)
            let cart = await Cart.findById(idCart)
            cart.items.push(product)
            await Cart.updateOne({_id: idCart}, cart)
            const cartUpdated = await Cart.findById(idCart)
            return cartUpdated
         }
         catch(err)
            {
                console.error(msgs.error, err)
            }
}

export async function deleteCartItem (idProd, email) {
    const getCart = await Cart.findOne({email: email})
    console.log(getCart)


}


