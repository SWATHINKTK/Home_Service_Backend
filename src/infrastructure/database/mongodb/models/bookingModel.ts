import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        require:true
    },
    serviceId:{
        type:mongoose.Types.ObjectId,
        require:true
    }
})