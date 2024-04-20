import mongoose from "mongoose";


export const connectDB = async() => {
    try {
        const MONGODB_URL:string | undefined = process.env.MONGODB_URL;
        if(MONGODB_URL){
            const data = await mongoose.connect(MONGODB_URL);
            console.log(`Database Connection Established ${data.connection.host}`)
        }
    } catch (error) {
        console.log(error)
    }
}