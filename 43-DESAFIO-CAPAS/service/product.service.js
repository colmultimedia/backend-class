import { DB } from "../config/db.js"
import Product from "../model/product.model.js"

const db = new DB  


db.connectDB()

async function prodExist (id) {
    try{
        await Product.exists({_id: id}, (err, doc) => {

            if(err){
                console.log("product is not available in db")
                return false
            }
            else{
                console.log("product exist in database")
                return true
            }
        })

    }catch(err){
        console.error(err)
    }

}


export async function readProduct(){
    try{
        const query = await Product.find()
        if(query.length>0){
            return query
        }else {
            return false
        }
    }
    catch(err){
        console.error(err)
    }
}

export async function findProduct(id){
    try{
        const exist = prodExist(id)
        if(exist){
            return false
        }else{
            return Product.findById(id)
        }
    }
    catch(err){
        console.error(err)
    }
}


export async function saveProduct(data) {
    try{
        const newProd = new Product(data)
        return await newProd.save()
    }catch(err){
        console.error(err)
    }
}

export async function updateProduct(id, data) {
    try{
        const exist = prodExist(id)

        if(exist) {
            await Product.updateOne({_id: id}, data)
            return await Product.findById(id)
        }
     else {
        return false
    }
    
    }catch(err){
        console.error(err)
    }
}

export async function deleteProduct(id) {
    try{
        const exist = prodExist(id)

        if(exist) {
           return await Product.findOneAndDelete({_id: id})
        }
     else {
        return false
    }
}
    catch(err){
        console.error(err)
    }
}
