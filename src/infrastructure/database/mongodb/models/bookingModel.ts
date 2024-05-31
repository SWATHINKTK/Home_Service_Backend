import mongoose, { Document, Model, Schema, model } from "mongoose";
import { IBooking } from "../../../../domain/booking";

const bookingSchema = new Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'users'
    },
    workerId:{
        type:mongoose.Types.ObjectId,
        ref:'workers'
    },
    serviceId:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'services'
    },
    serviceMinimumAmount:{
        type:Number,
        required:true
    },
    serviceHourlyCharge:{
        type:Number,
        required:true
    },
    buildingName:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    startTime:{
        type:String,
        required:true
    },
    endTime:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    location:{
        latitude:{
            type:Number,
            required:true
        },
        longitude:{
            type:Number,
            required:true
        }
    },
    advancePaymentStatus:{
        type:String,
        enum:['Pending', 'Completed'],
        default:'Pending'
    },
    advancePaymentAmount:{
        type:Number,
        required:true
    },
    totalAmount:{
        type:Number,
        required:true
    },
    workStatus: {
        type: String,
        enum: ['Pending', 'Accepted', 'InProgress','Started', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    paymentStatus:{
        type:String,
        enum:['Pending', 'Completed'],
        default:'Pending'
    },
    additionalCharges:[{
        description:{
            type:String
        },
        qty:{
            type:Number
        },
        amount:{
            type:Number
        }
    }],
    otp:{
        type:String
    },
    otpTime:{
        type:Date
    }
},{timestamps:true});

export const bookingModel: Model<IBooking & Document> = model<IBooking & Document>('booking', bookingSchema);