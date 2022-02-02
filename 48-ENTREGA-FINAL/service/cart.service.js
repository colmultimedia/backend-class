import { DB } from '../config/db.js'
import { msgs } from '../config/constants.js'
import Cart from '../model/cart.model.js'
import Product from '../model/product.model.js'

 // for methods read, add, make and delete

export async function read (email){
    try {
        const cart =  await Cart.findOne({email: email})
        if(cart.items.length == 0){
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
            const filterProduct = getCart.items.find(element => element._id == idProd)
        
            if(filterProduct == undefined){
                console.log("no existe el producto en el carrito")
                cart.items.push(product)
            }else{
                const indexProd = cart.items.map(function(e) {
                
                    return e._id.toString()
    
                }).indexOf(idProd)
                cart.items[indexProd].qty += 1
            }
            await Cart.updateOne({_id: idCart}, cart)
            const cartUpdated = await Cart.findById(idCart)
            return cartUpdated
         }
         catch(err)
            {
                console.error(msgs.error, err)
            }
}

export async function deleteCartItem (email) {
    const getCart = await Cart.findOne({email: email})
    getCart.items = []
   await Cart.updateOne({_id: getCart._id}, getCart)
   return await Cart.findOne({email: email})


}


