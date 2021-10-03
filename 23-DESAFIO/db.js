var admin = require("firebase-admin");
var serviceAccount = require("./keys/dbkey.json");


class Firebase {
    
    connectDB(){
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          databaseURL: "https://typo-ecommerce.firebaseio.com"
        });
    }

    async createMessage(obj) {
        const db = admin.firestore() 
        const query= db.collection("mensajes")

        try{
            const doc = query.doc()
            await doc.create(obj)
        }catch(err)
        {
            console.error(err)
        }
    }
   
    // async showMsg() {
    //     console.log(await this.readMessage())
    // }

    async readMessage() {
        const db = admin.firestore() 
        const query= db.collection("mensajes")
        try{
            const querySnapshot = await query.orderBy("date", "asc").get()
            let docs= querySnapshot.docs;

            const response = docs.map((doc) => ({
                 id:doc.id,
                 date: doc.data().date,
                 email: doc.data().email,
                 opinion: doc.data().opinion
            }))
            return response

        } catch(err)
        {
            console.error(err)
        }
    }
}

module.exports = {Firebase}