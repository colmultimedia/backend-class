import {readProduct, findProduct, saveProduct, updateProduct, deleteProduct } from "../service/product.service.js";
import { msgs } from "../config/constants.js";


class ProductController {

    async read(req, res) {
        try {
            const query = await readProduct()
            if(!query){
                res.status(400).send(msgs.products.read)
            }else {
                res.status(200).send(query)
            }
        }catch(err)
    {
        console.error(`${msgs.error} ${err}`)
    }
}
async find(req, res) {
    try {
        const query = await findProduct(req.params.id)
        if(!query){
            res.status(400).send(msgs.products.find)
         }else{
             res.status(200).send(query)
         }
    }catch(err)
{
    console.error(`${msgs.error} ${err}`)
}
}
    async save(req, res) {
        const data = req.body
        res.json(await saveProduct(data))
    }
    async update(req, res) {
        try {
            const newData = req.body
            const query = await updateProduct(req.params.id, newData)
            if(!query){
                res.status(400).send(msgs.products.update)
             }else{
                 res.status(200).send(query)
             }
         }
         catch(err)
            {
                console.error(`${msgs.error} ${err}`)
            }
    }
    async delete(req, res) {
        try{
            const query = await deleteProduct(req.params.id)
    
            if(!query){
               res.status(400).send(msgs.products.delete)
            }else{
                res.status(200).send(query)
            }
        }
        catch(err)
        {
            console.error(`${msgs.error} ${err}`)
        }
       
    }
}

export default ProductController