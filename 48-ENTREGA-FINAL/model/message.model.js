import mongoose from 'mongoose'

const Message = new mongoose.Schema({

    date: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: true
    },
    opinion: {
        type: String,
        required: true
    }
})


export default mongoose.model('Message', Message)