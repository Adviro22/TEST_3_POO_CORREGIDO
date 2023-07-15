import mongoose from "mongoose";

const mongodbURL = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/test3_poo';

(async() => {
    try{
        const db = await mongoose.connect(mongodbURL, {
        })
        console.log('Database is connected to:', db.connect.name)
    } catch(error){
        console.error(error);
    }
})();