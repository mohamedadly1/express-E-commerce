import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'name is required'],
        trim: true,
        required: true,
        minLength: [2, 'too short subcategory name']
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    category:{
        type: mongoose.Types.ObjectId,
        ref:'category'
    }
}, { timestamps: true })


export const subCategoryModel = mongoose.model('subcategory', schema)



