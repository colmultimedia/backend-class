export const PORT =  process.argv[2] || 8080
export const wrongMsgRoute = {"error":"ruta equivocada"}
export const msgs = {
    error: "Something went wrong ====>>>",
    products: {
        read: "You don't have created yet any products",
        find: "The product that you're looking for find by id doesn't exist in database.",
        update: "The product that you're trying to update doesn't exist in database",
        delete: "The product that you're looking for delete doesn't exist in database."
    }
}