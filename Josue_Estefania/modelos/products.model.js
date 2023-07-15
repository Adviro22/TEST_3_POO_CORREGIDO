import {Schema, model} from "mongoose";

const porductSchema = Schema({
    description:{
        type: String,
        required: true
    },
    precio:{
        type: Number,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    saldo:{
        type: Number,
        required: true
    }

}, {
    versionKey: false,
    timestamps: true
});

export default model('Product', porductSchema);