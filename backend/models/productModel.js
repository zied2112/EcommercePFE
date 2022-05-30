const mongoose= require("mongoose")
const { required } = require("nodemon/lib/config")
const productSchema = mongoose.Schema({
    name: {
        type: String, 
        required: [true, "Please Enter Product Name"],
        trim:true 
    },
     description: {
        type: String,
        required: [true, "Please Enter Product Description"]
    },
    price: {
        type: Number,
        required: [true, "Please Enter Product Price"],
        maxLength:[8, "Price cannot exceed 8 characters"]
    },
    ratings: {
        type: Number, 
        default: 0 
    },
    images: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],

    category: {
        type:  mongoose.Schema.Types.ObjectId, ref: 'Category', 
        required: [true, "Please Enter Product Category"],
    },
    Stock: {
        type: Number,
        required: [true, "Please Enter Product Stock"],
        maxLength: [4, "stock cannot exceed 4 characters"],
        default:0
    },
    numOfReviews: {
        type: Number, 
        default: 0
    },
    reviews: [{

         user: {
        type: mongoose.Schema.ObjectId, 
        ref: "User",
        required :true 
    },
        name: {
            type: String,
            required: true, 
        },
        rating: {
            type: Number,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        }
    }],

    user: {
        type: mongoose.Schema.ObjectId, 
        ref: "User",
        required :true 
    },
    createdAT: {
        type: Date, 
        default:Date.now
    }

})
module.exports = mongoose.model("Product",productSchema)