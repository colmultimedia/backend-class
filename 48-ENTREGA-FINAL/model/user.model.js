import mongoose from "mongoose"
import bcrypt from 'bcrypt'

const User = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: false
    },
    lastname:{
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    telephone: {
        type: Number,
        required: false
    }
})

//Metodos Schema
User.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

User.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}


export default mongoose.model('User', User)
