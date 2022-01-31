import { msgs } from "../config/constants.js";

class OrderController {

    async read(req, res) {
        try {
            res.status(200).json({msg: "hello testing order controller"})
            }
        catch(err)
    {
        console.error(msgs.error, err)
    }
}

}

export default OrderController