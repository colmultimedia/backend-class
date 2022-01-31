import mongoose from 'mongoose'

const Order = new mongoose.Schema({

    date: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: false
    },
    items: {
        type: Array,
        required: false
    },
    shippingAddress: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false
    }
})


export default mongoose.model('Order', Order)