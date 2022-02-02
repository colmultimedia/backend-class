import { msgs } from "../config/constants.js";
import { makeOrder } from "../service/order.service.js"

class OrderController {

    async read(req, res) {
        try {
            res.status(200).json(await makeOrder(req.user.email))
            }
        catch(err)
    {
        console.error(msgs.error, err)
    }
}

}

export default OrderController