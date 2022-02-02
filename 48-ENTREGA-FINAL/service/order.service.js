import Order from '../model/order.model.js'
import Cart from '../model/cart.model.js'

export async function makeOrder (email) {
    try{
        const cart = await Cart.findOne({email: email})
        const newOrder = {
            email: cart.email,
            items: cart.items,
            fromCart: cart._id,
            shippingAddress: cart.shippingAddress,
            status: "Emited"
        }
        const order = new Order(newOrder)
        cart.items = []
        await Cart.updateOne({_id: cart._id}, cart)
        return await order.save()

    }catch(err){
        console.error(err)
    }
}