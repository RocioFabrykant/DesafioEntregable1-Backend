import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const productCollection = 'products';

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        required: true
    },
    owner: {
        type: String,
        default: 'admin'
    }

})
productSchema.plugin(mongoosePaginate);
export const productModel = mongoose.model(productCollection, productSchema);