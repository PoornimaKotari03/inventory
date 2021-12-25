const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    book_id:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    booktitle:{
        type: String,
        trim: true,
        required: true
    },
    price:{
        type: Number,
        trim: true,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    images:{
        type: Object,
        required: true
    },
    storename:{
        type: String,
        required: true
    }
}, {
    timestamps: true //important
})


module.exports = mongoose.model("Inventorys", productSchema)