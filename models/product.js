const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({

    productName: {
        type: String,
        required: true
    },
    productImage: [{
        type: String,
        required: true
    }],
    brandName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    size: [{
        type: Number,
        required: true
    }],
    no_of_items: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    review: [{
        customerName: {
            type: String,
            required: true
        },
        customerRating: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        discription: {
            type: String,
            required: true
        },

    }],
    breedType: {
        type: String,
        required: true
    },
    vegNonVeg: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Product', productSchema);