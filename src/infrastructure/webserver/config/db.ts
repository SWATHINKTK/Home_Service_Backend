import mongoose from "mongoose";
import { DBConnectionError } from "../../../usecases/handler/databaseConnectionError";
import { error } from "winston";


export const connectDB = async() => {
    try {
        const MONGODB_URL:string | undefined = process.env.MONGODB_URL;
        if(MONGODB_URL){
            const data = await mongoose.connect(MONGODB_URL);
            console.log(`Database Connection Established ${data.connection.host}`)
        }else{
            throw error
        }
        
    } catch (error) {
        console.log('Database Connection EstablishmentError',error);
        throw new DBConnectionError();
    }
}